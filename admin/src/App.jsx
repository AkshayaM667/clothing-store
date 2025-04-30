import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Admin from './Components/Pages/Admin/Admin';
import WishlistButton from './Components/WishlistButton'; // Adjust path if needed
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />

      {/* Optional: Add Wishlist button in the header or wherever you like */}
      <div style={{ padding: '1rem', textAlign: 'right' }}>
        <WishlistButton />
      </div>

      <Admin />
    </div>
  );
};

export default App;
