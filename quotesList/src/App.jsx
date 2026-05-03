import { useState, useEffect } from "react";
import ProductCard from "./components/quotes";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.freeapi.app/api/v1/public/quotes",
        );
        const data = await response.json();
        const list = data?.data?.data ?? [];
        setQuotes(Array.isArray(list) ? list : []);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        {quotes.length > 0
          ? quotes.map((quote) => <ProductCard key={quote.id} data={quote} />)
          : loading}
      </div>
    </>
  );
}

export default App;
