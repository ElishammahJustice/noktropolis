import { ref } from 'vue'
import api from '../services/api'
import TokenService from '../services/token.service'

const user = ref(null)
const loading = ref(false)
const error = ref(null)

// Function to determine user role and abilities from the backend response
const parseUserRole = (userData) => {
  if (!userData) return { role: null, abilities: [] };

  const role = userData.role?.slug || '';
  const abilities = [];

  // Map role to abilities
  if (role === 'admin') {
    abilities.push('access_admin_dashboard');
  } else if (role === 'vendor') {
    abilities.push('access_vendor_dashboard');
  } else {
    abilities.push('access_user_dashboard');
  }

  return { role, abilities };
};

const fetchUser = async () => {
  try {
    const response = await api.get('/user/info')
    const userData = response.data?.data || response.data;

    // Parse user role and abilities
    const { role, abilities } = parseUserRole(userData);
    user.value = { ...userData, role, abilities };
  } catch (err) {
    console.error('Failed to fetch user:', err)
    user.value = null
  }
}

// Modified to accept router as a parameter
const redirectToDashboard = (router) => {
  if (!user.value?.role) {
    console.error('No user role found');
    router.push('/'); // fallback
    return;
  }

  const role = user.value.role;

  if (typeof role === 'string') {
    // Handle case where role is a simple string
    if (role === 'admin') {
      router.push('/admin/dashboard');
    } else if (role === 'vendor') {
      router.push('/vendor/dashboard');
    } else {
      router.push('/dashboard');
    }
  } else if (role && typeof role === 'object') {
    // Handle case where role is an object with slug
    const roleSlug = role.slug;
    if (roleSlug === 'admin') {
      router.push('/admin/dashboard');
    } else if (roleSlug === 'vendor') {
      router.push('/vendor/dashboard');
    } else {
      router.push('/dashboard');
    }
  } else {
    console.error('Invalid role format:', role);
    router.push('/'); // fallback
  }
}

// Modified to accept router as a parameter
const login = async (credentials, router) => {
  loading.value = true
  error.value = null

  try {
    const response = await api.post('/login', credentials)

    // Extract token and user data from response
    const token = response.data?.token || response.data?.data?.token
    const userData = response.data?.user || response.data?.data?.user

    if (!token || !userData) {
      throw new Error('Invalid login response: ' + JSON.stringify(response.data))
    }

    // Store token
    TokenService.setToken(token)

    // Parse user role and abilities
    const { role, abilities } = parseUserRole(userData);
    user.value = { ...userData, role, abilities };

    // Debug output
    console.log('Login successful:', {
      userData,
      role: user.value.role,
      abilities: user.value.abilities
    });

    // Redirect if router is provided
    if (router) {
      redirectToDashboard(router)
    }

    return response
  } catch (err) {
    console.error('Auth login failed:', err.response || err)
    error.value = err?.response?.data?.message || err?.message || 'Login failed.'
    throw err
  } finally {
    loading.value = false
  }
}

const register = async (form) => {
  loading.value = true
  error.value = null

  try {
    // Just register — no login
    const response = await api.post('/register', form)
    return response
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Registration failed.'
    throw err
  } finally {
    loading.value = false
  }
}

// Modified to accept router as a parameter
const registerAndLogin = async (form, router) => {
  loading.value = true
  error.value = null

  try {
    const response = await api.post('/register', form)

    const token = response.data?.token ?? response.data?.data?.token
    if (!token) throw new Error('Invalid response from server.')

    TokenService.setToken(token)
    await fetchUser()

    // Only redirect if router is provided
    if (router) {
      redirectToDashboard(router)
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Registration failed.'
    throw err
  } finally {
    loading.value = false
  }
}

// Modified to accept router as a parameter
const logout = async (router) => {
  try {
    await api.post('/logout')
  } catch  {
    // silently ignore
  } finally {
    TokenService.removeToken()
    user.value = null

    // Only redirect if router is provided
    if (router) {
      router.push('/login')
    }
  }
}

export function useAuth() {
  return {
    user,
    loading,
    error,
    fetchUser,
    login,
    register,
    registerAndLogin,
    logout,
    redirectToDashboard
  }
}
