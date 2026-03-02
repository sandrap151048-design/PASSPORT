import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const api = axios.create({
    baseURL: API_URL,
    timeout: 15000, // 15 second timeout for cross-network requests
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api
export { API_URL }
