import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const api = axios.create({
    baseURL: API_URL,
    timeout: 5000, // 5 second timeout to fail fast on Vercel
})

export default api
export { API_URL }
