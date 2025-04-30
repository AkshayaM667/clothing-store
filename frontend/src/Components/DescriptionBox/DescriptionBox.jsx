import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="info-section">
        <h3>Material & Care</h3>
        <ul>
          <li>Premium Cotton / Rayon Blend</li>
          <li>Machine wash cold with like colors</li>
          <li>Do not bleach or tumble dry</li>
          <li>Iron on low heat inside out</li>
        </ul>
      </div>

      <div className="info-section">
        <h3>Shipping Information</h3>
        <p>Estimated delivery: 3-7 business days.</p>
        <p>Free shipping on orders above ₹999.</p>
      </div>

      <div className="info-section">
        <h3>Return & Exchange</h3>
        <p>Easy 7-day return or exchange available.</p>
        <p>Product must be unused with original tags intact.</p>
      </div>

      <div className="info-section">
        <h3>Seller Information</h3>
        <p>Sold by: StyleVibe Official</p>
        <p>GSTIN: 29ABCDE1234FZ1</p>
      </div>
    </div>
  );
};

export default DescriptionBox;
