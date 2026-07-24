// Backend stores images as a relative path like "/uploads/books/xxx.jpg"
// and serves them as static files from its root (not under /books).
// This turns that into a full URL the <img> tag can load.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4444'

export function bookImageUrl(path) {
  if (!path) return null
  return `${API_URL}${path}`
}
