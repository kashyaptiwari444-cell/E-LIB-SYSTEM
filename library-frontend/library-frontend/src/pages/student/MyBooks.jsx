import { useEffect, useState } from 'react'
import api from '../../api/axios'
import { bookImageUrl } from '../../utils/imageUrl'

export default function MyBooks() {
  const [rentals, setRentals] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchRentals = async () => {
    setLoading(true)
    try {
      const res = await api.get('/rentals/mybooks')
      setRentals(res.data.rentals)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to load your books')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRentals()
  }, [])

  const handleReturn = async (rentalId) => {
    setMessage('')
    try {
      const res = await api.put(`/rentals/return/${rentalId}`)
      const fine = res.data.rental.fine
      setMessage(fine > 0 ? `Book returned. Fine: ₹${fine}` : 'Book returned successfully')
      fetchRentals()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to return book')
    }
  }

  const isOverdue = (rental) => !rental.returned && new Date(rental.returnDate) < new Date()

  return (
    <div>
      <h2>My Issued Books</h2>
      {message && <p className="info">{message}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : rentals.length === 0 ? (
        <p>You haven't issued any books yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Fine</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((r) => (
              <tr key={r._id} className={isOverdue(r) ? 'overdue' : ''}>
                <td>
                  {r.book?.image ? (
                    <img className="thumb" src={bookImageUrl(r.book.image)} alt={r.book.title} />
                  ) : (
                    <div className="thumb thumb-empty">No image</div>
                  )}
                </td>
                <td>{r.book?.title}</td>
                <td>{r.book?.author}</td>
                <td>{new Date(r.issueDate).toLocaleDateString()}</td>
                <td>{new Date(r.returnDate).toLocaleDateString()}</td>
                <td>{r.returned ? 'Returned' : isOverdue(r) ? 'Overdue' : 'Issued'}</td>
                <td>₹{r.fine || 0}</td>
                <td>{!r.returned && <button onClick={() => handleReturn(r._id)}>Return</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
