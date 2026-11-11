
import React from "react";

function ProductCard({
  product,
  addToCart,
  isWishlisted,
  toggleWishlist
}) {
  return (
    <div className="card">

      <button
        className="wishlist-btn"
        onClick={() => toggleWishlist(product.id)}
        aria-label="Toggle wishlist"
      >
        {isWishlisted ? "❤️" : "🤍"}
      </button>

      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      <h3>{product.name}</h3>

      <p className="category">
        Category: {product.category}
      </p>

      <h3 className="price">
        ₹{product.price.toLocaleString("en-IN")}
      </h3>

      <button
        className="add-btn"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;
