import React from "react";
import { useWishlist } from "../../Context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const WishlistButton = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = Array.isArray(wishlist)
    ? wishlist.some(
        (item) =>
          item._id === product._id || item.id === product.id // match by _id or fallback id
      )
    : false;

  const toggleWishlist = () => {
    console.log("Toggling wishlist for product:", product);

    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  if (!wishlist) {
    return <button disabled className="wishlist-button">Loading...</button>;
  }

  return (
    <button onClick={toggleWishlist} className="wishlist-button">
      {isInWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  );
};

export default WishlistButton;
