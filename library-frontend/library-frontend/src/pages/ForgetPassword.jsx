import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios"; // Change according to your project

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/auth/forgot-password", {
        email,
      });

      setMessage(res.data.message || "OTP sent successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">

      <div className="steps">
        <span className="active"></span>
        <span></span>
        <span></span>
      </div>

      <h2>Forgot Password</h2>

       <label>
        Enter your registered email. We will send a 6-digit OTP to reset your
        password.
      </label>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
<br /><br />
      <form onSubmit={handleSubmit}>
       Email Address

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> <br />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>

      <p>
        Remember your password?{" "}
        <Link to="/login">Back to Login</Link>
      </p>

    </div>
  );
}