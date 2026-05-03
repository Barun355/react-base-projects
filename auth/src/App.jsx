import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("login"); // "login" or "register"

  useEffect(() => {
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/users/current-user",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok && data.data) {
        setUser(data.data);
      }
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setView("login");
  };

  const handleSwitchToRegister = () => {
    setView("register");
  };

  const handleSwitchToLogin = () => {
    setView("login");
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {user ? (
        <Profile user={user} onLogout={handleLogout} />
      ) : view === "login" ? (
        <Login onLogin={handleLogin} onSwitchToRegister={handleSwitchToRegister} />
      ) : (
        <Register onRegister={handleLogin} onSwitchToLogin={handleSwitchToLogin} />
      )}
    </div>
  );
}

export default App;
