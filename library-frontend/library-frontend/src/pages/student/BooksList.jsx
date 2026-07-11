import { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function BooksList() {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchBooks = async () => {
    setLoading(true)
    try {
      const res = await api.get('/books', { params: { page, limit: 10, search } })
      setBooks(res.data.books)
      setTotalPages(res.data.totalPages || 1)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to load books')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchBooks()
  }

  const handleIssue = async (bookId) => {
    setMessage('')
    try {
      const res = await api.post('/rentals/issue', { book: bookId })
      setMessage(res.data.message)
      fetchBooks()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to issue book')
    }
  }

  return (
    <div>
      <h2>All Books</h2>
      {message && <p className="info">{message}</p>}

      <form onSubmit={handleSearch} className="search-bar">
        <input
          placeholder="Search by title, author, category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Available</th>
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
                  <button disabled={book.quantity <= 0} onClick={() => handleIssue(book._id)}>
                    {book.quantity <= 0 ? 'Out of stock' : 'Issue'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div> */}
    </div>
  )
}
