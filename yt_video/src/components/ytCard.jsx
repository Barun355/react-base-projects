import React from "react";
import "./ytCard.css";

const ytCard = ({ data }) => {
  const video = data.items;
  const { snippet, statistics, contentDetails } = video;

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match[1] || "").replace("H", "");
    const minutes = (match[2] || "").replace("M", "");
    const seconds = (match[3] || "").replace("S", "");

    if (hours) {
      return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
    }
    return `${minutes || "0"}:${seconds.padStart(2, "0")}`;
  };

  const formatViews = (views) => {
    const num = parseInt(views);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return "today";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="yt-card">
      <div className="yt-card-thumbnail-container">
        <img
          src={snippet.thumbnails.high.url}
          alt={snippet.title}
          className="yt-card-thumbnail"
        />
        <span className="yt-card-duration">{formatDuration(contentDetails.duration)}</span>
      </div>

      <div className="yt-card-content">
        <h3 className="yt-card-title">{snippet.title}</h3>

        <div className="yt-card-channel">
          <span className="yt-card-channel-name">{snippet.channelTitle}</span>
        </div>

        <div className="yt-card-meta">
          <span className="yt-card-views">{formatViews(statistics.viewCount)} views</span>
          <span className="yt-card-separator">•</span>
          <span className="yt-card-date">{formatDate(snippet.publishedAt)}</span>
        </div>

        {snippet.tags && snippet.tags.length > 0 && (
          <div className="yt-card-tags">
            {snippet.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="yt-card-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ytCard;
