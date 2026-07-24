import { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', role: 'student' })

  const fetchUsers = async () => {
    try {
      const res = await api.get('/')
      setUsers(res.data)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to load users')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return
    try {
      await api.delete(`/delete-user/${id}`)
      fetchUsers()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete user')
    }
  }

  const startEdit = (user) => {
    setEditingId(user._id)
    setEditForm({ name: user.name, role: user.role })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/edit-user/${editingId}`, editForm)
      setEditingId(null)
      fetchUsers()
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update user')
    }
  }

  return (
    <div>
      <h2>Manage Users</h2>
      {message && <p className="error">{message}</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              {editingId === u._id ? (
                <td colSpan="4">
                  <form onSubmit={handleUpdate} className="inline-form">
                    <input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                    <select
                      value={editForm.role}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </form>
                </td>
              ) : (
                <>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => startEdit(u)}>Edit</button>
                    <button onClick={() => handleDelete(u._id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
