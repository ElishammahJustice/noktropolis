import router from '@/router'
import api from './api'

class TokenService {
  setToken(token) {
    localStorage.setItem('authToken', token)
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  getToken() {
    return localStorage.getItem('authToken')
  }

  getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  removeToken() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  }

  isAuthenticated() {
    return !!this.getToken()
  }

  async userInfo() {
    try {
      const response = await api.get('/user/profile')
      this.setUser(response.data)
    } catch (error) {
      console.error('No Authenticated User Found:', error)
    }
  }
}

export default new TokenService()
