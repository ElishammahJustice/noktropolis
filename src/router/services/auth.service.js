import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
import TokenService from '../services/token.service'

const user = ref(null)
const loading = ref(false)
const error = ref(null)

const router = useRouter()

const fetchUser = async () => {
  try {
    const response = await api.get('/user')
    user.value = response.data?.data || response.data
  } catch (err) {
    console.error('Failed to fetch user:', err)
    user.value = null
  }
}

const redirectToDashboard = () => {
  const userAbilities = user.value?.abilities || []

  if (userAbilities.includes('access_admin_dashboard')) {
    router.push('/admin/dashboard')
  } else if (userAbilities.includes('access_vendor_dashboard')) {
    router.push('/vendor/dashboard')
  } else if (userAbilities.includes('access_user_dashboard')) {
    router.push('/dashboard')
  } else {
    router.push('/') // fallback
  }
}

const login = async (credentials) => {
  loading.value = true
  error.value = null

  try {
    const response = await api.post('/login', credentials)

    const token = response.data?.token ?? response.data?.data?.token
    if (!token) throw new Error('Invalid response from server.')

    TokenService.saveToken(token)

    await fetchUser()

    redirectToDashboard()

  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Login failed.'
    throw err
  } finally {
    loading.value = false
  }
}

const register = async (form) => {
  loading.value = true
  error.value = null

  try {
    const response = await api.post('/register', form)

    const token = response.data?.token ?? response.data?.data?.token
    if (!token) throw new Error('Invalid response from server.')

    TokenService.saveToken(token)

    await fetchUser()

    redirectToDashboard()

  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Registration failed.'
    throw err
  } finally {
    loading.value = false
  }
}

const logout = async () => {
  try {
    await api.post('/logout')
  } catch  {
    // silently ignore
  } finally {
    TokenService.removeToken()
    user.value = null
    router.push('/login')
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
    logout,
  }
}
