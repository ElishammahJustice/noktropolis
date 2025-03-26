import axios from 'axios';
import TokenService from '@/router/services/token.service'; // ✅ Fixed import path
import router from '@/router'; // ✅ Using alias for cleaner imports

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true // Important for Laravel Sanctum authentication
});

// 🔹 Request Interceptor: Automatically Attach Token
apiClient.interceptors.request.use(
    (config) => {
        const token = TokenService.getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 🔹 Response Interceptor: Handle Errors (401, 403, 429)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            console.error("Network Error:", error);
            return Promise.reject({ message: "Network error. Please try again later." });
        }

        const { status, data } = error.response;

        if (status === 401) {
            TokenService.removeToken();
            router.push({ name: 'Login' }); // Redirect to login page
        } else if (status === 403) {
            alert("You do not have permission to access this resource.");
            router.push({ name: 'Forbidden' }); // Redirect to Forbidden page
        } else if (status === 429) {
            alert("Too many requests! Please wait a moment and try again.");
        } else {
            console.error("API Error:", data.message || "An error occurred");
        }

        return Promise.reject(data.message || "An error occurred");
    }
);

// 🔹 Function to Manually Set Authorization Token (Optional)
const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

// 🔹 Helper Function for API Calls with Error Handling
const handleRequest = async (request) => {
    try {
        const response = await request();
        return response.data;
    } catch (error) {
        return { error }; // Return error message instead of crashing
    }
};

// 🔹 API Services (Authentication, Roles, Admin, Users)
export const authAPI = {
    register: (userData) => handleRequest(() => apiClient.post('/register', userData)),
    login: (credentials) => handleRequest(() => apiClient.post('/login', credentials)),
    logout: () => handleRequest(() => apiClient.post('/logout')),
    getUserProfile: () => handleRequest(() => apiClient.get('/user/profile')),
};

export const roleAPI = {
    getRoles: () => handleRequest(() => apiClient.get('/roles')),
    createRole: (roleData) => handleRequest(() => apiClient.post('/roles', roleData)),
    updateRole: (roleId, roleData) => handleRequest(() => apiClient.put(`/roles/${roleId}`, roleData)),
    deleteRole: (roleId) => handleRequest(() => apiClient.delete(`/roles/${roleId}`))
};

export const adminAPI = {
    registerAdmin: (adminData) => handleRequest(() => apiClient.post('/admin/register', adminData)),
    getPendingUsers: () => handleRequest(() => apiClient.get('/admin/pending-users')),
    approveUser: (userId) => handleRequest(() => apiClient.put(`/admin/approve-user/${userId}`)),
    assignRole: (userId, roleData) => handleRequest(() => apiClient.put(`/admin/assign-role/${userId}`, roleData))
};

export const userAPI = {
    getUsers: () => handleRequest(() => apiClient.get('/users')),
    getUser: (userId) => handleRequest(() => apiClient.get(`/user/${userId}`)),
    createUser: (userData) => handleRequest(() => apiClient.post('/user', userData)),
    updateUser: (userId, userData) => handleRequest(() => apiClient.put(`/user/${userId}`, userData)),
    deleteUser: (userId) => handleRequest(() => apiClient.delete(`/user/${userId}`))
};

// Export API Client & Auth Token Setter
export { apiClient, setAuthToken };
export default apiClient;
