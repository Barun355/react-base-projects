import React from "react";
import "./quotes.css";

const QuoteCard = ({ data }) => {
  const { author, content } = data;

  return (
    <div className="quote-card">
      <div className="quote-card-content">
        <div className="quote-icon">"</div>
        <p className="quote-text">{content}</p>
      </div>

      <div className="quote-footer">
        <h3 className="quote-author">— {author}</h3>
      </div>
    </div>
  );
};

export default QuoteCard;
