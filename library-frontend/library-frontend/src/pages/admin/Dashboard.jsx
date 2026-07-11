import { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    api
      .get('/dashboard')
      .then((res) => setStats(res.data.dashboard))
      .catch((err) => setMessage(err.response?.data?.message || 'Failed to load dashboard'))
  }, [])

  if (message) return <p className="error">{message}</p>
  if (!stats) return <p>Loading...</p>

  const cards = [
    { label: 'Total Books', value: stats.totalBooks },
    { label: 'Total Students', value: stats.totalStudents },
    { label: 'Total Admins', value: stats.totalAdmins },
    { label: 'Issued Books', value: stats.issuedBooks },
    { label: 'Returned Books', value: stats.returnedBooks },
    { label: 'Overdue Books', value: stats.overdueBooks },
    { label: 'Total Fine Collected', value: `₹${stats.totalFineCollected}` },
  ]

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="stats-grid">
        {cards.map((c) => (
          <div className="stat-card" key={c.label}>
            <div className="stat-value">{c.value}</div>
            <div className="stat-label">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
