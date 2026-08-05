import { useEffect, useState } from "react";
import api from "../../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    role: "student",
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get("/");
      setUsers(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(`/delete-user/${id}`);
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to delete user");
    }
  };

  const startEdit = (user) => {
    setEditingId(user._id);
    setEditForm({
      name: user.name,
      role: user.role,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/edit-user/${editingId}`, editForm);
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update user");
    }
  };

  return (
    <div className="container-fluid py-3">

      {/* Header */}
      <div className="row align-items-center mb-4">
        <div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
          <h2 className="fw-bold m-0">Manage Users</h2>
        </div>

        <div className="col-12 col-md-6 text-center text-md-end">
          <button
            className="btn btn-primary px-4"
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

      {/* Table Card */}
      <div className="card shadow-sm">
        <div className="card-body p-0">

          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle mb-0">

              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th width="180">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No Users Found
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u._id}>
                      {editingId === u._id ? (
                        <td colSpan="4">
                          <form
                            onSubmit={handleUpdate}
                            className="row g-2"
                          >
                            <div className="col-12 col-md-5">
                              <input
                                type="text"
                                className="form-control"
                                value={editForm.name}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div className="col-12 col-md-3">
                              <select
                                className="form-select"
                                value={editForm.role}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    role: e.target.value,
                                  })
                                }
                              >
                                <option value="student">
                                  Student
                                </option>
                                <option value="admin">
                                  Admin
                                </option>
                              </select>
                            </div>

                            <div className="col-12 col-md-4 d-grid d-md-flex gap-2">
                              <button
                                type="submit"
                                className="btn btn-success"
                              >
                                Save
                              </button>

                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setEditingId(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </td>
                      ) : (
                        <>
                          <td>{u.name}</td>

                          <td className="text-break">
                            {u.email}
                          </td>

                          <td>
                            <span
                              className={`badge ${
                                u.role === "admin"
                                  ? "bg-danger"
                                  : "bg-success"
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>

                          <td>
                            <div className="d-flex flex-wrap gap-2">
                              <button
                                className="btn btn-warning btn-sm"
                                onClick={() => startEdit(u)}
                              >
                                Edit
                              </button>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  handleDelete(u._id)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </>
                      )}
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