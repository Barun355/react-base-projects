import { useState, useEffect } from "react";
import ProductCard from "./components/productCard";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.freeapi.app/api/v1/public/randomproducts",
        );
        const data = await response.json();
        const list = data?.data?.data ?? [];
        setProducts(Array.isArray(list) ? list : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Product Listings</h1>
          <p className="app-subtitle">Discover amazing products</p>
        </div>
      </header>

      <main className="app-main">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="video-grid">
            {products.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No products found</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
