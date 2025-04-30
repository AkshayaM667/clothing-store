import React from "react";
import { useWishlist } from "../Context/WishlistContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product._id || product.productId} className="border rounded-2xl p-4 shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-brown-600 font-bold">₹{product.new_price}</p>
              <button
                className="mt-2 px-4 py-1 bg-red-100 text-red-500 rounded-lg text-sm"
                onClick={() => removeFromWishlist(product._id || product.productId)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
