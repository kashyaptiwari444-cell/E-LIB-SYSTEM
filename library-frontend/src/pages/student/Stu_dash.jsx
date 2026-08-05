import { Link } from "react-router-dom";
import "./Stu_dash.css";
import { useAuth } from '../../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()
  return (
    <div className="dashboard">


      {/* Hero */}

      <section className="hero">

        <div className="hero-content">

          <h1>
            Welcome, {user.name}!
            <span> Apna-Library Management System</span>
          </h1>

          <p>
            Discover thousands of books, manage your library account,
            borrow books online, and explore knowledge anytime,
            anywhere.
          </p>


        </div>

      </section>

      {/* <DashBooks />  */}

      
    </div>
  );
};

export default Dashboard;