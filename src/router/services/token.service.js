import router from '@/router'; // Use alias for cleaner imports
import api from './api'; // Ensure correct path to API service

class TokenService {
  setToken(token) {
    localStorage.setItem('authToken', token);
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user)); // Store user object as JSON
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; // Parse JSON safely
  }

  removeToken() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user'); // Also remove user data
    router.push('/login');
  }

  isAuthenticated() {
    return !!this.getToken(); // Returns true if token exists
  }

  async userInfo() {
    try {
      const response = await api.get('/user/profile'); // Fixed API route
      this.setUser(response.data);
    } catch (error) {
      console.error('No Authenticated User Found:', error);
    }
  }
}

// Export a singleton instance
export default new TokenService();
