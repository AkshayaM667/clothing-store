import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const token = localStorage.getItem("auth-token");

  const fetchWishlist = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:4000/getwishlist", {
        headers: { "auth-token": token },
      });
      if (res.data.success) {
        const wishlistProductIds = res.data.wishlist; // array of {productId: "..."}

        // 🔥 Now, fetch all full product details
        const productDetails = await Promise.all(
          wishlistProductIds.map(async (item) => {
            const res = await axios.get(`http://localhost:4000/product/${item.productId}`);
            return res.data;
          })
        );

        setWishlist(productDetails); // ✅ Now wishlist has full products (name, image, price, etc.)
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }, [token]);

  const addToWishlist = async (productId) => {
    if (!token) return;
    try {
      const res = await axios.post(
        "http://localhost:4000/addtowishlist",
        { productId },
        { headers: { "auth-token": token }
      });

      if (res.data.success) {
        fetchWishlist(); // ✅ Refresh wishlist after adding
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!token) return;
    try {
      const res = await axios.post(
        "http://localhost:4000/removefromwishlist",
        { productId },
        { headers: { "auth-token": token }
      });

      if (res.data.success) {
        fetchWishlist(); // ✅ Refresh wishlist after removing
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
