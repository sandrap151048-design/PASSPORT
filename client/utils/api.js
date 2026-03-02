import axios from 'axios'

// Determine API URL based on environment or window location
let API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        if (hostname.includes('vercel.app') || hostname.includes('localhost') || hostname.includes('0.0.0.0')) {
            // Default to relative path for better proxying/rewrites
            API_URL = '/api'
        } else {
            // Fallback for LAN access
            API_URL = `http://${hostname}:5000/api`
        }
    } else {
        // Fallback for SSR
        API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api'
    }
}

// Ensure it ends with /api if it's a full URL
if (API_URL && API_URL.startsWith('http') && !API_URL.endsWith('/api')) {
    API_URL = API_URL.endsWith('/') ? `${API_URL}api` : `${API_URL}/api`;
}

console.log('Final API_URL path:', API_URL);

const api = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    }
})

// Add interceptor to log errors for easier debugging
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

