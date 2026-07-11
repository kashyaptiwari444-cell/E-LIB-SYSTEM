import { Link } from "react-router-dom";
import DashBooks  from './DashBooks'
import "./Main_Dash.css";

const Dashboard = () => {
  return (
    <div className="dashboard">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          📚 E-Library
        </div>

        <div className="nav-links">
          <Link to="/">Books</Link>
          {/* <Link to="/">About</Link> */}

           <Link to="/login" className="btn login-btn">
            Login
          </Link>

          <Link to="/register" className="btn register-btn">
            Register
          </Link> 
        </div>
      </nav>

      {/* Hero */}

      <section className="hero">

        <div className="hero-content">

          <h1>
            Welcome to
            <span> E-Library Management System</span>
          </h1>

          <p>
            Discover thousands of books, manage your library account,
            borrow books online, and explore knowledge anytime,
            anywhere.
          </p>

          <div className="hero-buttons">
 
            <Link to="/login" className="hero-btn login">
              Login
            </Link>

            <Link to="/register" className="hero-btn register">
              Register
            </Link> 

          </div>

        </div>

      </section>

       <DashBooks /> 

      {/* Features */}

      <section className="features">

        <h2>Our Features</h2>

        <div className="cards">

          <div className="card">
            <h3>📖 Thousands of Books</h3>
            <p>
              Access books from different categories including
              programming, science, history and literature.
            </p>
          </div>

          <div className="card">
            <h3>⚡ Easy Borrow</h3>
            <p>
              Borrow books instantly and track return dates from your
              dashboard.
            </p>
          </div>

          <div className="card">
            <h3>🔒 Secure Login</h3>
            <p>
              Secure authentication with personalized student accounts.
            </p>
          </div>

        </div>

      </section>













      {/* Features */}

      <section className="features">

        <h2>🔔 Importent Note</h2>

        <div className="cards">

          <div className="card">
            <div>
              <h3>Important Note</h3> 
              1. Book Issue Duration = 14 days. <br />
              2. Fine = ₹5 per day after return date. <br />         
              3. One student maximum 3 book Issue.

            </div>
          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="footer">
        © 2026 E-Library Management System | Made with ❤️ using React
      </footer>

    </div>
  );
};

export default Dashboard;