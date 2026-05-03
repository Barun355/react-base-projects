import React, { useState } from "react";
import "./Auth.css";

const Profile = ({ user, onLogout }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/users/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        onLogout();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <h2 className="profile-title">Welcome, {user.username}!</h2>
        </div>

        <div className="profile-details">
          <div className="profile-item">
            <span className="profile-label">Username:</span>
            <span className="profile-value">{user.username}</span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{user.email}</span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Role:</span>
            <span className="profile-badge">{user.role}</span>
          </div>

          <div className="profile-item">
            <span className="profile-label">Account Created:</span>
            <span className="profile-value">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="logout-button"
          disabled={loading}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
