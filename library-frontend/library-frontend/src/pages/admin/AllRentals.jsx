import { useEffect, useState } from "react";
import api from "../../api/axios";
import { bookImageUrl } from "../../utils/imageUrl";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AllRentals() {
  const [rentals, setRentals] = useState([]);
  const [message, setMessage] = useState("");

  const fetchRentals = async () => {
    try {
      const res = await api.get("/rentals");
      setRentals(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to load rentals");
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const handleReturn = async (id) => {
    try {
      await api.put(`/rentals/return/${id}`);
      fetchRentals();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to mark returned");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this rental record?")) return;

    try {
      await api.delete(`/rentals/${id}`);
      fetchRentals();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to delete rental");
    }
  };

  const isOverdue = (r) =>
    !r.returned && new Date(r.returnDate) < new Date();

  return (
    <div className="container-fluid py-3">

      {/* Header */}
      <div className="row align-items-center mb-4">
        <div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
          <h2 className="fw-bold m-0">All Rentals</h2>
        </div>

        <div className="col-12 col-md-6 text-center text-md-end">
          <button
            className="btn btn-primary"
            onClick={() => window.print()}
          >
            🖨️ Print
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="alert alert-danger">
          {message}
        </div>
      )}

      {/* Card */}
      <div className="card shadow-sm">
        <div className="card-body p-0">

          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle mb-0">

              <thead className="table-dark text-center">
                <tr>
                  <th>Cover</th>
                  <th>Student</th>
                  <th>Book</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Fine</th>
                  <th width="180">Actions</th>
                </tr>
              </thead>

              <tbody>
                {rentals.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No Rental Records Found
                    </td>
                  </tr>
                ) : (
                  rentals.map((r) => (
                    <tr
                      key={r._id}
                      className={isOverdue(r) ? "table-danger" : ""}
                    >
                      <td className="text-center">
                        {r.book?.image ? (
                          <img
                            src={bookImageUrl(r.book.image)}
                            alt={r.book.title}
                            className="img-thumbnail"
                            style={{
                              width: "70px",
                              height: "90px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            className="bg-light border rounded d-flex justify-content-center align-items-center"
                            style={{
                              width: "70px",
                              height: "90px",
                              fontSize: "12px",
                            }}
                          >
                            No Image
                          </div>
                        )}
                      </td>

                      <td>
                        <strong>{r.student?.name}</strong>
                        <br />
                        <small className="text-muted text-break">
                          {r.student?.email}
                        </small>
                      </td>

                      <td>
                        <strong>{r.book?.title}</strong>
                        <br />
                        <small className="text-muted">
                          {r.book?.author}
                        </small>
                      </td>

                      <td>
                        {new Date(r.issueDate).toLocaleDateString()}
                      </td>

                      <td>
                        {new Date(r.returnDate).toLocaleDateString()}
                      </td>

                      <td>
                        {r.returned ? (
                          <span className="badge bg-success">
                            Returned
                          </span>
                        ) : isOverdue(r) ? (
                          <span className="badge bg-danger">
                            Overdue
                          </span>
                        ) : (
                          <span className="badge bg-warning text-dark">
                            Issued
                          </span>
                        )}
                      </td>

                      <td>
                        <span className="fw-bold text-danger">
                          ₹{r.fine || 0}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex flex-wrap gap-2 justify-content-center">

                          {!r.returned && (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => handleReturn(r._id)}
                            >
                              Return
                            </button>
                          )}

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(r._id)}
                          >
                            Delete
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
}