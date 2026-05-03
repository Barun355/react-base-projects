import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function fetchCat() {
    setLoading(true);
    setError(null);

    axios
      .get("https://api.freeapi.app/api/v1/public/cats/cat/random")
      .then((response) => {
        setCat(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch cat. Please try again.");
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div className="app">
      <h1 className="title">Random Cat Viewer</h1>
      <p className="subtitle">Discover amazing cat breeds!</p>

      <button className="new-cat-btn" onClick={fetchCat}>
        Get New Cat
      </button>

      {loading && <p className="loading">Loading cat...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && cat && (
        <div className="cat-card">
          <div className="cat-image-section">
            <img src={cat.image} alt={cat.name} className="cat-image" />
          </div>

          <div className="cat-info">
            <h2 className="cat-name">{cat.name}</h2>
            <p className="cat-origin">Origin: {cat.origin}</p>
            <p className="cat-lifespan">Life Span: {cat.life_span} years</p>
            <p className="cat-weight">Weight: {cat.weight.metric} kg</p>
            <p className="cat-temperament">
              <strong>Temperament:</strong> {cat.temperament}
            </p>
            <p className="cat-description">{cat.description}</p>

            <div className="cat-traits">
              <div className="trait">
                <span className="trait-label">Adaptability</span>
                <div className="trait-bar">
                  <div
                    className="trait-fill"
                    style={{ width: `${(cat.adaptability / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="trait">
                <span className="trait-label">Affection</span>
                <div className="trait-bar">
                  <div
                    className="trait-fill"
                    style={{ width: `${(cat.affection_level / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="trait">
                <span className="trait-label">Energy</span>
                <div className="trait-bar">
                  <div
                    className="trait-fill"
                    style={{ width: `${(cat.energy_level / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="trait">
                <span className="trait-label">Intelligence</span>
                <div className="trait-bar">
                  <div
                    className="trait-fill"
                    style={{ width: `${(cat.intelligence / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="trait">
                <span className="trait-label">Child Friendly</span>
                <div className="trait-bar">
                  <div
                    className="trait-fill"
                    style={{ width: `${(cat.child_friendly / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
