import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://api.freeapi.app/api/v1/public/randomjokes?page=${page}&limit=8`)
      .then((response) => {
        setJokes(response.data.data.data);
        setTotalPages(response.data.data.totalPages);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch jokes. Please try again.");
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
      <h1 className="title">Jokes Viewer</h1>
      <p className="subtitle">Browse through hilarious jokes!</p>

      {loading && <p className="loading">Loading jokes...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="jokes-grid">
            {jokes.map((joke) => (
              <div key={joke.id} className="joke-card">
                <span className="joke-number">#{joke.id}</span>
                <p className="joke-content">{joke.content}</p>
                {joke.categories.length > 0 && (
                  <div className="joke-categories">
                    {joke.categories.map((cat, index) => (
                      <span key={index} className="category-tag">
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
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
