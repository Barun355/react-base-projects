import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://api.freeapi.app/api/v1/public/randomusers?page=${page}&limit=8`)
      .then((response) => {
        setUsers(response.data.data.data);
        setTotalPages(response.data.data.totalPages);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users. Please try again.");
        setLoading(false);
      });
  }, [page]);

  function handlePrevious() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handleNext() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  return (
    <div className="app">
      <h1 className="title">Users Directory</h1>
      <p className="subtitle">Browse random user profiles</p>

      {loading && <p className="loading">Loading users...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="users-grid">
            {users.map((user) => (
              <div key={user.login.uuid} className="user-card">
                <div className="card-header">
                  <img
                    src={user.picture.large}
                    alt={`${user.name.first} ${user.name.last}`}
                    className="user-avatar"
                  />
                </div>
                <div className="card-body">
                  <h3 className="user-name">
                    {user.name.title} {user.name.first} {user.name.last}
                  </h3>
                  <p className="user-username">@{user.login.username}</p>

                  <div className="user-details">
                    <p className="detail">
                      <span className="detail-label">Email</span>
                      <span className="detail-value">{user.email}</span>
                    </p>
                    <p className="detail">
                      <span className="detail-label">Phone</span>
                      <span className="detail-value">{user.phone}</span>
                    </p>
                    <p className="detail">
                      <span className="detail-label">Location</span>
                      <span className="detail-value">
                        {user.location.city}, {user.location.country}
                      </span>
                    </p>
                    <p className="detail">
                      <span className="detail-label">Age</span>
                      <span className="detail-value">{user.dob.age} years</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button onClick={handlePrevious} disabled={page === 1}>
              Previous
            </button>
            <span className="page-info">
              Page {page} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
