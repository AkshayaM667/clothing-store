import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart(product.id, selectedSize);
  };

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt={product.name} />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_dull_icon} alt="half-star" />
          <p>({product.reviews?.length || 0})</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">₹{product.old_price}</div>
          <div className="productdisplay-right-price-new">₹{product.new_price}</div>
        </div>

        <div className="productdisplay-right-description">
          {product.description || "No description available."}
        </div>

        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-size-options">
            {["S", "M", "L", "XL", "XXL"].map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`size-btn ${selectedSize === size ? "active" : ""}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleAddToCart}>ADD TO CART</button>

        <p className="productdisplay-right-category">
          <span>Category : </span>{product.category}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags : </span>Modern, Latest
        </p>

        {/* Directly displaying description and reviews */}
        <div className="productdisplay-extra">
          <h3>🛍️ Product Overview</h3>
          <p>{product.description || "No description available."}</p>

          <h3 style={{ marginTop: "30px" }}>🗣️ Customer Reviews ({product.reviews?.length || 0})</h3>
          <div className="reviews">
            {product.reviews?.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review.id} className="review">
                  <strong>{review.name}</strong>
                  <p>⭐ {review.rating} / 5</p>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
