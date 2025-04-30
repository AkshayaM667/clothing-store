import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {Object.entries(cartItems).map(([key, quantity]) => {
        if (quantity > 0) {
          const [id, size] = key.split("_");
          const product = all_product.find(p => p.id === Number(id));
          if (!product) return null;

          return (
            <div key={key}>
              <div className="cartitems-format cartitems-format-main">
                <img src={product.image} alt={product.name} className="carticon-product-icon" />
                <p>{product.name}</p>
                <p>₹{product.new_price}</p>
                <button className="cartitems-quantity">{quantity}</button>
                <p>₹{(product.new_price * quantity).toFixed(2)}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  alt="Remove"
                  onClick={() => removeFromCart(product.id, size)}
                />
              </div>
              <p className="cartitems-size">Size: <strong>{size}</strong></p>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fees</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{getTotalCartAmount().toFixed(2)}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cartitems-promocode">
          <p>If You Have a Promo Code, Enter it Here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
