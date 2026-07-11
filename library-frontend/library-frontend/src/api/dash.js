import axios from 'axios'


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4444'
})


api.interceptors.request.use((config) => {
  print(token)
  if (!token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
