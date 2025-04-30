import React, { useContext, useState, useRef } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import wishlist_icon from "../Assets/wishlist_icon.png"; 
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { useWishlist } from '../../Context/WishlistContext';

import nav_dropdown from "../Assets/nav_dropdown4.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const { wishlist } = useWishlist(); 
  // ✅ Use wishlist state
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>AURAA ATTIRE</p>
      </div>

      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt="dropdown"
      />

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link to="/">Shop</Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link to="/mens">Men</Link>
          {menu === "mens" && <hr />}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link to="/womens">Women</Link>
          {menu === "womens" && <hr />}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link to="/kids">Kids</Link>
          {menu === "kids" && <hr />}
        </li>
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        {/* ✅ Wishlist Icon + Count */}
        <Link to="/wishlist">
          <div style={{ position: "relative" }}>
            <img src={wishlist_icon} alt="wishlist" />
            {wishlist.length > 0 && (
              <div className="nav-cart-count">{wishlist.length}</div>
            )}
          </div>
        </Link>

        {/* Cart Icon + Count */}
        <Link to="/cart">
          <div style={{ position: "relative" }}>
            <img src={cart_icon} alt="cart" />
            {getTotalCartItems() > 0 && (
              <div className="nav-cart-count">{getTotalCartItems()}</div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
