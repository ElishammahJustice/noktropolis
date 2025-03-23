// src/services/auth.service.js
import { ref, computed } from 'vue'
import TokenService from './token.service'
import api from './api'

// Create reactive state
const user = ref(null)
const loading = ref(false)
const error = ref(null)

// Export composable function to use the auth service
export function useAuth() {
  // Initialize auth on first use
  if (!user.value && TokenService.isAuthenticated()) {
    loadUserInfo()
  }

  // Check if user is authenticated
  const isAuthenticated = computed(() => !!user.value)

  // Check if user is an admin
  const isAdmin = computed(() => {
    return user.value && user.value.role?.slug === 'admin'
  })

  // Get current user
  const currentUser = computed(() => user.value)





  // Login method
  async function login(credentials) {
    loading.value = true
    error.value = null

    try {
      // Ensure email and password are not empty
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required')
      }

      const response = await api.post('login', credentials)

      console.log("RESPONSE DATA : ", response.data);
      // Check if we have user and token in the response
      if (response.data.token && response.data.user) {
        const { token, user } = response.data

        // Save token
        TokenService.setToken(token)
        TokenService.setUser(user.name)

        return response
      } else {
        throw new Error('Invalid response format from server')
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message)
      error.value = err.response?.data?.message || err.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Register method
  async function register(userData) {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('register', userData)
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Logout method
  async function logout() {
    user.value = null
    try {
      const response = await api.get('logout')
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Logout failed'
      throw err
    } finally {
      loading.value = false
      TokenService.removeToken()
    }
  }

  // Load user info from server
  async function loadUserInfo() {
    loading.value = true
    error.value = null

    try {
      if (TokenService.isAuthenticated()) {
        const response = await api.get('me')

        // Check if we have valid user data
        if (response.data.user) {
          user.value = response.data.user
        } else {
          throw new Error('Invalid user data')
        }
      }
    } catch (err) {
      console.error('Failed to load user info:', err)
      error.value = 'Failed to load user info'
      TokenService.removeToken()
    } finally {
      loading.value = false
    }
  }

  // Update user profile
  async function updateProfile(profileData) {
    loading.value = true
    error.value = null

    try {
      const response = await api.put('update-profile', profileData)
      user.value = response.data.user || response.data
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Profile update failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    currentUser,
    login,
    register,
    logout,
    loadUserInfo,
    updateProfile
  }
}

// Create a global instance for non-composition API usage
const globalAuthService = {
  isAuthenticated: () => !!user.value,
  isAdmin: () => user.value && user.value.role?.slug === 'admin',
  getCurrentUser: () => user.value,
  getLoading: () => loading.value,
  getError: () => error.value,
  login: async (credentials) => {
    const { login } = useAuth()
    return login(credentials)
  },
  register: async (userData) => {
    const { register } = useAuth()
    return register(userData)
  },
  logout: () => {
    const { logout } = useAuth()
    logout()
  },
  loadUserInfo: async () => {
    const { loadUserInfo } = useAuth()
    return loadUserInfo()
  },
  updateProfile: async (profileData) => {
    const { updateProfile } = useAuth()
    return updateProfile(profileData)
  }
}

export default globalAuthService
