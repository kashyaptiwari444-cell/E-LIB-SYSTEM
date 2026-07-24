import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

import Login from './pages/Login'
import Register from './pages/Register'
import BooksList from './pages/student/BooksList'
import MyBooks from './pages/student/MyBooks'
import Dashboard from './pages/admin/Dashboard'
import ManageBooks from './pages/admin/ManageBooks'
import AllRentals from './pages/admin/AllRentals'
import ManageUsers from './pages/admin/ManageUsers'
import Main_Dash from './pages/Main_Dash'
import Dashboard_Footer from './pages/Main_Dash_Footer'

function App() {
  return (
    <>
      
      <div className="container">
        <Routes>

          <Route path="/" element={<Navigate to="/main_dash" replace />} />
          <Route path='/main_dash' element={
            <>
            <Main_Dash/>
            <BooksList />
            <Dashboard_Footer/>

            </>
            } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            
          {/* Student routes */}
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <Navbar />
                <BooksList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-books"
            element={
              <ProtectedRoute>
                <Navbar />
                <MyBooks />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Navbar />
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/books"
            element={
              <AdminRoute>
                <Navbar />
                <ManageBooks />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/rentals"
            element={
              <AdminRoute>
                <Navbar />
                <AllRentals />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <Navbar />
                <ManageUsers />
              </AdminRoute>
            }
          />

          <Route path="*" element={<Navigate to="/main_dash" replace />} />
        </Routes>
      </div>
    </>
  )
}

export default App
