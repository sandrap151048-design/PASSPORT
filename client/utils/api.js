import axios from 'axios'

// Determine API URL based on environment or window location
let API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
    // If no env var, try to guess or use localhost
    if (typeof window !== 'undefined') {
        // If we're on a Vercel/Production URL, we might want to default to the same origin's /api
        // But since the backend is usually separate, we'll log a warning
        console.warn('NEXT_PUBLIC_API_URL is not set. Defaulting to local backend.')
    }
    API_URL = 'http://localhost:5000/api'
}

const api = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    }
})

// Add interceptor to log errors for easier debugging in "other systems"
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            message: error.message,
            baseUrl: error.config?.baseURL
        });
        return Promise.reject(error);
    }
);

export default api
export { API_URL }
