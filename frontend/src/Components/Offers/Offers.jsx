import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Offers.css';
import exclusive_image from '../Assets/exclusive_image.png';

const Offers = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/mens'); // Navigate to Men’s category
  };

  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>Only on our Best-Selling Products</p>
        <button onClick={handleButtonClick}>Check Now</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="exclusive offer" />
      </div>
    </div>
  );
};

export default Offers;
