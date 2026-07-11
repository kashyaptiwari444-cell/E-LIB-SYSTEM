import axios from 'axios'

// Base URL comes from .env (VITE_API_URL). Falls back to your backend's default port.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4444'
})

// Attach the JWT (if we have one) to every outgoing request.
// Backend's `auth` middleware is assumed to read this as: Authorization: Bearer <token>
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
