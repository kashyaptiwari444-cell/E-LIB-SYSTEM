# 📚 E-LIB-SYSTEM

A modern Full Stack Library Management System built using the MERN stack. The application allows administrators to manage books, while students can browse, issue, return, and track borrowed books through a secure authentication system.

## 🚀 Features

### 👨‍💼 Admin
- Add, update, and delete books
- Manage book inventory
- View all issued books
- Manage students
- Dashboard with library statistics

### 👨‍🎓 Student
- Register and login securely
- Browse available books
- Search books by title or author
- Issue and return books
- View borrowing history

### 🔐 Authentication
- JWT Authentication
- Protected Routes
- Role-Based Access Control (Admin & Student)

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- Multer
- Nodemailer

### Tools
- Git & GitHub
- VS Code
- Postman

---

## 📂 Project Structure

```
E-LIB-SYSTEM/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/kashyaptiwari444-cell/E-LIB-SYSTEM.git
cd E-LIB-SYSTEM
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=4444

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_app_password
```

---

## 📸 Screenshots

Add your screenshots here.

```
Home Page
Login
Dashboard
Book Management
Student Panel
```

---

## 🎯 Future Enhancements

- Fine Calculation
- Book Reservation
- Issue/Return
- Email Notifications
- Analytics Dashboard

---

## 👨‍💻 Author

**Kashyap Tiwari**

---

## ⭐ Support

If you like this project, don't forget to ⭐ star the repository.
