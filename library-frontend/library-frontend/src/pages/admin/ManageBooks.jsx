import { useEffect, useState } from 'react'
import api from '../../api/axios'

const emptyForm = { title: '', author: '', category: '', quantity: '' }

export default function ManageBooks() {
  const [books, setBooks] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books', { params: { page, limit: 10, search } })
      setBooks(res.data.books)
      setTotalPages(res.data.totalPages || 1)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to load books')
    }
  }

  useEffect(() => {
    fetchBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    const payload = { ...form, quantity: Number(form.quantity) }
    try {
      if (editingId) {
        await api.put(`/books/edit-book/${editingId}`, payload)
        setMessage('Book updated successfully')
      } else {
        await api.post('/books/add-book', payload)
        setMessage('Book added successfully')
      }
      resetForm()
      fetchBooks()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to save book')
    }
  }

  const handleEdit = (book) => {
    setEditingId(book._id)
    setForm({ title: book.title, author: book.author, category: book.category, quantity: book.quantity })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this book?')) return
    try {
      await api.delete(`/books/delete-book/${id}`)
      fetchBooks()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete book')
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchBooks()
  }

  return (
    <div>
      <h2>Manage Books</h2>
      {message && <p className="info">{message}</p>}

      <form onSubmit={handleSubmit} className="inline-form">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input
          name="quantity"
          type="number"
          min="0"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? 'Update Book' : 'Add Book'}</button>
        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <form onSubmit={handleSearch} className="search-bar">
        <input placeholder="Search books" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.quantity}</td>
              <td>
                <button onClick={() => handleEdit(book)}>Edit</button>
                <button onClick={() => handleDelete(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}
