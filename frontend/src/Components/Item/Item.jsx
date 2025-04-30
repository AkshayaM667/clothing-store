import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import WishlistButton from '../Wishlist/WishlistButton'; // Ensure the path is correct

const Item = (props) => {
  return (
    <div className='item'>
      <div className="item-image-wrapper" style={{ position: 'relative' }}>
        <Link to={`/product/${props.id}`}>
          <img
            onClick={() => window.scrollTo(0, 0)} 
            src={props.image} 
            alt={props.name} 
            className="item-image"
          />
        </Link>

        {/* Wishlist Button Positioned Top-Right */}
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
  <WishlistButton product={{
    _id: props._id,    // 🛠 Pass _id if available
    id: props.id,
    name: props.name,
    image: props.image,
    new_price: props.new_price,
    old_price: props.old_price,
    category: props.category
  }} />
</div>

      </div>

      <p className="item-name">{props.name}</p>

      <div className="item-prices">
        <div className="item-price-new">
          ₹{props.new_price}
        </div>
        <div className="item-price-old">
          ₹{props.old_price}
        </div>
      </div>
    </div>
  );
};

export default Item;
