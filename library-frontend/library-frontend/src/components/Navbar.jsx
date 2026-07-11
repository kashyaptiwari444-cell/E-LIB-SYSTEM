import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">📚 Library</div>
      <div className="navbar-links">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && user.role === 'student' && (
          <>
            <Link to="/books">Books</Link>
            <Link to="/my-books">My Books</Link>
          </>
        )}

        {user && user.role === 'admin' && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/books">Manage Books</Link>
            <Link to="/admin/rentals">Rentals</Link>
            <Link to="/admin/users">Users</Link>
          </>
        )}

        {user && (
          <span className="navbar-user">
            {user.name} <em>({user.role})</em>
            <button onClick={handleLogout}>Logout</button>
          </span>
        )}
      </div>
    </nav>
  )
}
