import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [meals, setMeals] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://api.freeapi.app/api/v1/public/meals?page=${page}&limit=9`)
      .then((response) => {
        setMeals(response.data.data.data);
        setTotalPages(response.data.data.totalPages);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch meals. Please try again.");
        setLoading(false);
      });
  }, [page]);

  function getIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure ? measure.trim() : ""} ${ingredient.trim()}`);
      }
    }
    return ingredients;
  }

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
      <h1 className="title">Meals Explorer</h1>
      <p className="subtitle">Discover delicious recipes from around the world</p>

      {loading && <p className="loading">Loading meals...</p>}
      {error && <p className="error">{error}</p>}

      {selectedMeal && (
        <div className="modal-overlay" onClick={() => setSelectedMeal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedMeal(null)}>
              X
            </button>
            <img
              src={selectedMeal.strMealThumb}
              alt={selectedMeal.strMeal}
              className="modal-image"
            />
            <div className="modal-content">
              <h2>{selectedMeal.strMeal}</h2>
              <p className="modal-meta">
                <span className="tag">{selectedMeal.strCategory}</span>
                <span className="tag">{selectedMeal.strArea}</span>
              </p>

              <h3>Ingredients</h3>
              <ul className="ingredients-list">
                {getIngredients(selectedMeal).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3>Instructions</h3>
              <p className="instructions">{selectedMeal.strInstructions}</p>

              {selectedMeal.strYoutube && (
                <a
                  href={selectedMeal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="youtube-link"
                >
                  Watch on YouTube
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="meals-grid">
            {meals.map((meal) => (
              <div
                key={meal.idMeal}
                className="meal-card"
                onClick={() => setSelectedMeal(meal)}
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="meal-image"
                />
                <div className="meal-info">
                  <h3 className="meal-name">{meal.strMeal}</h3>
                  <div className="meal-tags">
                    <span className="tag">{meal.strCategory}</span>
                    <span className="tag">{meal.strArea}</span>
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
