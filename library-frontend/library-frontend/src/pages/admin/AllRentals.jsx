import { useEffect, useState } from 'react'
import api from '../../api/axios'
import { bookImageUrl } from '../../utils/imageUrl'

export default function AllRentals() {
  const [rentals, setRentals] = useState([])
  const [message, setMessage] = useState('')

  const fetchRentals = async () => {
    try {
      const res = await api.get('/rentals')
      setRentals(res.data)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to load rentals')
    }
  }

  useEffect(() => {
    fetchRentals()
  }, [])

  const handleReturn = async (id) => {
    try {
      await api.put(`/rentals/return/${id}`)
      fetchRentals()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to mark returned')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this rental record?')) return
    try {
      await api.delete(`/rentals/${id}`)
      fetchRentals()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete rental')
    }
  }

  const isOverdue = (r) => !r.returned && new Date(r.returnDate) < new Date()

  return (
    <div>
      <h2>All Rentals</h2>
      {message && <p className="error">{message}</p>}

      <table>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Student</th>
            <th>Book</th>
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
              <td>
                {r.student?.name}
                <br />
                <small>{r.student?.email}</small>
              </td>
              <td>
                {r.book?.title}
                <br />
                <small>{r.book?.author}</small>
              </td>
              <td>{new Date(r.issueDate).toLocaleDateString()}</td>
              <td>{new Date(r.returnDate).toLocaleDateString()}</td>
              <td>{r.returned ? 'Returned' : isOverdue(r) ? 'Overdue' : 'Issued'}</td>
              <td>₹{r.fine || 0}</td>
              <td>
                {!r.returned && <button onClick={() => handleReturn(r._id)}>Mark Returned</button>}
                <button onClick={() => handleDelete(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
