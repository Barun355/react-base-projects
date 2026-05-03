import { useState, useEffect } from "react";
import YtCard from "./components/ytCard";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.freeapi.app/api/v1/public/youtube/videos",
        );
        const data = await response.json();

        const list = data?.data?.data ?? [];
        setVideos(Array.isArray(list) ? list : []);
      } catch (error) {
        console.error("Error fetching videos:", error);
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
          <h1 className="app-title">YouTube Videos</h1>
          <p className="app-subtitle">Discover amazing content</p>
        </div>
      </header>

      <main className="app-main">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading videos...</p>
          </div>
        ) : videos.length > 0 ? (
          <div className="video-grid">
            {videos.map((video) => (
              <YtCard key={video.items.id} data={video} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No videos found</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
