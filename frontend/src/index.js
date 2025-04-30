import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import ShopContextProvider from './Context/ShopContext';
import { WishlistProvider } from './Context/WishlistContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ShopContextProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </ShopContextProvider>
  </React.StrictMode>
);

reportWebVitals();
