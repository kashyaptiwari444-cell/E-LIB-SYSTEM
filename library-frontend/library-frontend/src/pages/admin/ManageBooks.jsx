import { useEffect, useState } from "react";
import api from "../../api/axios";
import { bookImageUrl } from "../../utils/imageUrl";
import "./ManageBooks.css";

const emptyForm = {
  title: "",
  author: "",
  category: "",
  quantity: "",
};

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  
  const [searchType, setSearchType] = useState("title");
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");


  const [form, setForm] = useState(emptyForm);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

const fetchBooks = async () => {
  try {
    const params = {};

    if (searchType === "title") {
      params.title = searchText;
    }

    if (searchType === "author") {
      params.author = searchText;
    }

    if (searchType === "category") {
      params.category = category;
    }

    const res = await api.get("/books", {
      params,
    });

    setBooks(res.data.books);
    setTotalPages(res.data.totalPages);
  } catch (err) {
    setMessage(
      err.response?.data?.message || "Failed to load books."
    );
  }
};

useEffect(() => {
  if (searchType === "title") {
    fetchBooks();
  }
}, [searchText]);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if(searchType==="category"){
        fetchBooks();
    }
},[category]);

  const handleImageChange = (e) => {
    const file = e.target.files[0] || null;

    setImageFile(file);

    setPreview(
      file ? URL.createObjectURL(file) : null
    );
  };

  const resetForm = () => {
    setForm(emptyForm);

    setImageFile(null);

    setPreview(null);

    setExistingImage(null);

    setEditingId(null);

    setFileInputKey((k) => k + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    const data = new FormData();

    data.append("title", form.title);
    data.append("author", form.author);
    data.append("category", form.category);
    data.append("quantity", form.quantity);

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      if (editingId) {
        await api.put(
          `/books/edit-book/${editingId}`,
          data
        );

        setMessage("Book Updated Successfully");
      } else {
        await api.post(
          "/books/add-book",
          data
        );

        setMessage("Book Added Successfully");
      }

      resetForm();

      fetchBooks();
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Failed to save book."
      );
    }
  };

  const handleEdit = (book) => {
    setEditingId(book._id);

    setForm({
      title: book.title,
      author: book.author,
      category: book.category,
      quantity: book.quantity,
    });

    setExistingImage(book.image);

    setImageFile(null);

    setPreview(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?"))
      return;

    try {
      await api.delete(
        `/books/delete-book/${id}`
      );

      fetchBooks();
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Delete failed."
      );
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    setPage(1);

    fetchBooks();
  };

  return (
    <div className="books-page">

      <div className="page-header">

        <h1>📚 Manage Books</h1>

        <p>
          Add, Update and Manage Library Books
        </p>

      </div>

      {message && (
        <div className="message-box">
          {message}
        </div>
      )}

      <form
        className="book-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={form.author}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          min="0"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <input
          key={fileInputKey}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {(preview || existingImage) && (
          <img
            src={
              preview ||
              bookImageUrl(existingImage)
            }
            alt="Preview"
            className="preview-image"
          />
        )}

        <button
          type="submit"
          className="save-btn"
        >
          {editingId
            ? "Update Book"
            : "Add Book"}
        </button>

        {editingId && (
          <button
            type="button"
            className="cancel-btn"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}

      </form>

      <form className="search-box">

    <select
        value={searchType}
        onChange={(e)=>{
            setSearchType(e.target.value);
            setSearchText("");
            setCategory("");
        }}
    >

        <option value="title">
            Book Name
        </option>

        <option value="author">
            Author
        </option>

        <option value="category">
            Category
        </option>

    </select>

    {
        searchType === "title" && (

            <input
                type="text"
                placeholder="Search Book..."
                value={searchText}
                onChange={(e)=>setSearchText(e.target.value)}
            />

        )
    }

    {
        searchType === "author" && (

            <>
                <input
                    type="text"
                    placeholder="Enter Author Name"
                    value={searchText}
                    onChange={(e)=>setSearchText(e.target.value)}
                />

                <button
                    type="button"
                    onClick={fetchBooks}
                >
                    Search
                </button>

            </>

        )
    }

    {
        searchType === "category" && (

            <select
                value={category}
                onChange={(e)=>{
                    setCategory(e.target.value);
                }}
            >

                <option value="">
                    Select Category
                </option>

                <option value="Full Stack">
                    Full Stack
                </option>

                <option value="Frontend">
                    Frontend
                </option>

                <option value="Backend">
                    Backend
                </option>

                <option value="Business">
                    Business
                </option>

            </select>

        )
    }

</form>

      {/* Book Cards will come here in Part 2 */}
      {/* ================= BOOK CARDS ================= */}

      <div className="books-grid">

        {books.length === 0 ? (

          <div className="no-books">

            <h2>No Books Found</h2>

            <p>
              There are no books available.
            </p>

          </div>

        ) : (

          books.map((book) => (

            <div
              className="book-card"
              key={book._id}
            >

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

              <div className="book-details">

                <h3 className="book-title">

                  {book.title}

                </h3>

                <p className="book-author">

                  <strong>Author :</strong> {book.author}

                </p>

                <div className="book-badges">

                  <span className="category-badge">
                    

                    Category : {book.category}

                  </span>
                  </div><br />
                  <div>

                  <span className="quantity-badge">

                    Qty : {book.quantity}

                  </span>

                </div>

                <div className="book-buttons">

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(book)}
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(book._id)
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>
    </div>

  );

}

