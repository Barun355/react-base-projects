import React from "react";
import "./productCard.css";

const ProductCard = ({ data }) => {
  const {
    id,
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
  } = data;

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const calculateDiscountedPrice = (price, discount) => {
    const discounted = price - (price * discount) / 100;
    return `$${discounted.toFixed(2)}`;
  };

  const formatRating = (rating) => {
    return rating.toFixed(1);
  };

  return (
    <div className="product-card">
      <div className="product-card-image-container">
        <img src={thumbnail} alt={title} className="product-card-image" />
        {discountPercentage > 0 && (
          <span className="product-card-discount">
            -{discountPercentage.toFixed(0)}%
          </span>
        )}
        {stock < 20 && stock > 0 && (
          <span className="product-card-stock-badge">Low Stock</span>
        )}
      </div>

      <div className="product-card-content">
        <div className="product-card-header">
          <span className="product-card-brand">{brand}</span>
          <span className="product-card-category">{category}</span>
        </div>

        <h3 className="product-card-title">{title}</h3>
        <p className="product-card-description">{description}</p>

        <div className="product-card-rating">
          <span className="product-card-rating-stars">★</span>
          <span className="product-card-rating-value">
            {formatRating(rating)}
          </span>
          <span className="product-card-rating-separator">•</span>
          <span className="product-card-stock">{stock} in stock</span>
        </div>

        <div className="product-card-pricing">
          {discountPercentage > 0 ? (
            <>
              <span className="product-card-price-original">
                {formatPrice(price)}
              </span>
              <span className="product-card-price-discounted">
                {calculateDiscountedPrice(price, discountPercentage)}
              </span>
            </>
          ) : (
            <span className="product-card-price">{formatPrice(price)}</span>
          )}
        </div>

        <button className="product-card-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
