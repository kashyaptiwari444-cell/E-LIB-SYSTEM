import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setStats(res.data.dashboard))
      .catch((err) =>
        setMessage(err.response?.data?.message || "Failed to load dashboard")
      );
  }, []);

  if (message) return <p className="error">{message}</p>;
  if (!stats) return <h2 className="loading">Loading Dashboard...</h2>;

  const cards = [
    {
      label: "Total Books",
      value: stats.totalBooks,
      icon: "📚",
      color: "blue",
    },
    {
      label: "Total Students",
      value: stats.totalStudents,
      icon: "🎓",
      color: "green",
    },
    {
      label: "Total Admins",
      value: stats.totalAdmins,
      icon: "👨‍💼",
      color: "purple",
    },
    {
      label: "Issued Books",
      value: stats.issuedBooks,
      icon: "📖",
      color: "orange",
    },
    {
      label: "Returned Books",
      value: stats.returnedBooks,
      icon: "✅",
      color: "teal",
    },
    {
      label: "Overdue Books",
      value: stats.overdueBooks,
      icon: "⏳",
      color: "red",
    },
    {
      label: "Fine Collected",
      value: `₹${stats.totalFineCollected}`,
      icon: "💰",
      color: "gold",
    },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        📊 Admin Dashboard
      </h1>

      <div className="stats-grid">
        {cards.map((card) => (
          <div className={`stat-card ${card.color}`} key={card.label}>
            <div className="card-icon">{card.icon}</div>

            <div className="stat-value">{card.value}</div>

            <div className="stat-label">{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}