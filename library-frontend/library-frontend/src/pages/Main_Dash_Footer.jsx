import { Link } from "react-router-dom";
import "./Main_Dash.css";

const Dashboard_Footer = () => {
  return (
    <div className="dashboard">
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

        <h2>🔔 Importent Rules</h2>

        <div className="cards">

          <div className="card">
            <div>
              <h3>3 Imp. Rules</h3>
              1. Book Issue Duration = 14 days. <br />
              2. Fine = ₹5 per day after return date. <br />         
              3. One student maximum 3 book Issue.

            </div>
          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="footer">
        © 2026 E-Library Management System | Made with ❤️ using MERN
      </footer>

    </div>
  );
};

export default Dashboard_Footer;