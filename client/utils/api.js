import axios from 'axios'

const API_URL = '/api'

const api = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.response.use(
    response => response,
    error => {
        if (typeof window !== 'undefined') {
            console.error('API Error Details:', {
                url: error.config?.url,
                fullPath: (error.config?.baseURL || '') + (error.config?.url || ''),
                method: error.config?.method,
                status: error.response?.status,
                message: error.message,
                responseData: error.response?.data
            });
        }
        return Promise.reject(error);
    }
);

export default api
export { API_URL }

