import { useEffect, useState } from "react";
import api from "../../src/api/dash";
import "./ManageBooks.css";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books", {
        params: {
          page,
          limit: 12,
          search,
        },
      });

      setBooks(res.data.books);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to load books"
      );
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBooks();
  };

  return (
    <div className="books-page">

      <div className="books-header">
        <h1>Library Books</h1>
        <p>Browse all available books in the library.</p>
      </div>

      {message && <p className="message">{message}</p>}

      <form className="search-box" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by title, author or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">
          Search
        </button>
      </form>

      <div className="books-grid">

        {books.length > 0 ? (
          books.map((book) => (

            <div className="book-card" key={book._id}>

              <img
                src={
                  book.image ||
                  "https://via.placeholder.com/300x400?text=Book"
                }
                alt={book.title}
              />

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

              </div>

            </div>

          ))
        ) : (
          <h2>No Books Found</h2>
        )}

      </div>

      <div className="pagination">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span>
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}