import { ref, computed } from 'vue'
import TokenService from './token.service'
import api from './api'

// ✅ Global state
const user = ref(null)
const loading = ref(false)
const error = ref(null)

// ✅ Load user info (Define function before calling it)
async function loadUserInfo() {
  loading.value = true
  error.value = null

  try {
    if (TokenService.isAuthenticated()) {
      const response = await api.get('me')

      if (response.data.user) {
        user.value = response.data.user
        TokenService.setUser(response.data.user)
      } else {
        throw new Error('Invalid user data')
      }
    }
  } catch (err) {
    console.error('Error loading user info:', err)  // ✅ Fix: Log the error
    error.value = 'Failed to load user info'
    TokenService.removeToken()
  } finally {
    loading.value = false
  }
}

// ✅ Call loadUserInfo AFTER defining it
if (TokenService.isAuthenticated()) {
  loadUserInfo()
}

// ✅ Export auth functions
export function useAuth() {
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role?.slug === 'admin')
  const currentUser = computed(() => user.value)

  async function login(credentials) {
    loading.value = true
    error.value = null

    try {
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required')
      }

      const response = await api.post('login', credentials)

      if (response.data.token && response.data.user) {
        TokenService.setToken(response.data.token)
        TokenService.setUser(response.data.user)
        user.value = response.data.user
        return response
      } else {
        throw new Error('Invalid response format from server')
      }
    } catch (err) {
      console.error('Login error:', err) // ✅ Fix: Log the error
      error.value = err.response?.data?.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    error.value = null

    try {
      TokenService.removeToken()
      user.value = null
      await api.get('logout')
    } catch (err) {
      console.error('Logout error:', err)  // ✅ Fix: Log the error
      error.value = 'Logout failed'
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
    logout,
    loadUserInfo
  }
}
