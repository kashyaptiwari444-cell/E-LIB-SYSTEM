import { Link } from "react-router-dom";
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
          {/* <Link to="/">Books</Link> */}
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

      {/* <DashBooks />  */}

      
    </div>
  );
};

export default Dashboard;