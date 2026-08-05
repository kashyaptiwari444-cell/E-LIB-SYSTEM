// import { useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api/axios"; // Change according to your project
// import { toast } from "react-toastify";

// export default function ForgetPassword() {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setMessage("");
//     setLoading(true);

//     try {
//       const res = await api.post("/auth/forgot-password", {
//         email,
//       });

//       toast.success(res.data.message || "OTP sent successfully.");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="form-card">

//       <div className="steps">
//         <span className="active"></span>
//         <span></span>
//         <span></span>
//       </div>

//       <h2>Forgot Password</h2>

//        <label>
//         Enter your registered email. We will send a 6-digit OTP to reset your
//         password.
//       </label>

//       {error && <p className="error">{error}</p>}
//       {message && <p className="success">{message}</p>}
// <br /><br />
//       <form onSubmit={handleSubmit}>
//        Email Address

//         <input
//           type="email"
//           placeholder="you@example.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         /> <br />

//         <button type="submit" disabled={loading}>
//           {loading ? "Sending..." : "Send OTP"}
//         </button>
//       </form>

//       <p>
//         Remember your password?{" "}
//         <Link to="/login">Back to Login</Link>
//       </p>

//     </div>
//   );
// }
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await await api.post("/auth/forgot-password", {
        email,
      });
      toast.success(res.data.message || "OTP sent successfully");
    } catch (err) {
  console.log(err);
  console.log(err.response);
  console.log(err.response?.data);

  toast.error(err.response?.data?.message || "Something went wrong");
}
    finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100ph",
        background: "#1f5ca8",
      }}
    >
      <div
        className="bg-white shadow p-5"
        style={{
          width: "500px",
          borderRadius: "25px",
        }}
      >
        {/* Logo */}
        <h1
          className="text-center fw-bold mb-4"
          style={{ color: "#163c73" }}
        >
         Apna-Library
        </h1>

        {/* Steps */}
        <div className="d-flex justify-content-center align-items-center mb-5">
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#1f5ca8",
            }}
          ></div>

          <div
            style={{
              width: 70,
              height: 3,
              background: "#f3eeee",
            }}
          ></div>

          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#d5d5d5",
            }}
          ></div>

          <div
            style={{
              width: 70,
              height: 3,
              background: "#d5d5d5",
            }}
          ></div>

          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#d5d5d5",
            }}
          ></div>
        </div>

        <h2 className="fw-bold mb-3">Forgot Password</h2>

        <p className="text-secondary mb-3">
          Enter your registered email. We will send a 6-digit OTP to reset your
          password.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="fw-bold mb-2">Email Address</label>

          <input
            type="email"
            className="form-control form-control-lg mb-4"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            className="btn btn-primary w-100 py-3"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <p className="text-center mt-4">
          Remember your password?{" "}
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}