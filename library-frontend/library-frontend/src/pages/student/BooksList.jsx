import { useEffect, useState } from 'react'
import api from '../../api/axios'
import { bookImageUrl } from '../../utils/imageUrl'

export default function BooksList() {
  const [books, setBooks] = useState([])

  const [searchType, setSearchType] = useState("title")
  const [searchText, setSearchText] = useState("")
  const [category, setCategory] = useState("")

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchBooks = async () => {
    setLoading(true)
    try {
      const params = {
      page,
      limit: 10,
    }

    if (searchType === "title") {
      params.title = searchText
    }

    if (searchType === "author") {
      params.author = searchText
    }

    if (searchType === "category") {
      params.category = category
    }

    const res = await api.get("/books", {
      params,
    })



      setBooks(res.data.books)
      setTotalPages(res.data.totalPages || 1)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to load books')
    } finally {
      setLoading(false)
    }
  }

useEffect(() => {
  if (searchType === "title") {
    fetchBooks()
  }
}, [searchText])


useEffect(() => {
  if (searchType === "category") {
    fetchBooks()
  }
}, [category])


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
      <h2>🔎Search Book</h2>
      {message && <p className="info">{message}</p>}

      <form onSubmit={handleSearch} className="search-bar">

        <select
          value={searchType}
          onChange={(e) => {
            setSearchType(e.target.value)
            setSearchText("")
            setCategory("")
          }}
        >
          <option value="title">Book Name</option>
          <option value="author">Author</option>
          <option value="category">Category</option>
        </select>

        {searchType === "title" && (
          <input
            type="text"
            placeholder="Search Book..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        )}

        {searchType === "author" && (
          <>
            <input
              type="text"
              placeholder="Enter Author Name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <button type="submit">
              Search
            </button>
          </>
        )}

        {searchType === "category" && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>

            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Business">Business</option>

          </select>
        )}

    </form>



<h1 align="center">Available Books ⭐</h1><hr /><br />
      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="books-grid">
  {books.map((book) => (
    <div className="book-card" key={book._id}>
      <div className="book-image">
        {book.image ? (
          <img
            src={bookImageUrl(book.image)}
            alt={book.title}
          />
        ) : (
          <div className="no-image">
            📚
          </div>
        )}
      </div>

      <div className="book-content">
        <h3>{book.title}</h3>

        <p>
          <strong>Author :</strong> {book.author}
        </p>

        <p>
          <strong>Category :</strong> {book.category}
        </p>

        <p>
          <strong>Available :</strong> {book.quantity}
        </p>

        <button
          className="issue-btn"
          disabled={book.quantity <= 0}
          onClick={() => handleIssue(book._id)}
        >
          {book.quantity <= 0
            ? "Out Of Stock"
            : "Issue Book"}
        </button>
      </div>
    </div>
  ))}
</div>
      )}


    </div>
  )
}
