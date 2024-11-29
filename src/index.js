import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './context/UserContext.js'
import { ProductProvider } from './context/ProductContext.js';

import reportWebVitals from './reportWebVitals';
import { CartProvider } from './context/CartContext.js';
import { PaymentProvider } from './context/PaymentContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const server = `https://flavor-express-backend.onrender.com/`;


root.render(
  <React.StrictMode>
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <PaymentProvider>
            <App />
          </PaymentProvider>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
