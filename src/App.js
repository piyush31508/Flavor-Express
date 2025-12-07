import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import { useCart } from './context/CartContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Verify from './pages/Verify';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import ProductAdd from './component/ProductAdd';
import ProductEditForm from './component/ProductEditForm';

function App() {
  const { cart, addToCart } = useCart();

  return (
    <>
      <BrowserRouter>
        {/* Layout wrapper with flexbox for sticky footer */}
        <div className="flex flex-col min-h-screen">
          
          {/* Header - Sticky at top */}
          <Header cartItems={cart.length} />

          {/* Main Content - Grows to fill available space */}
          <main className="flex-grow">
            <Routes>
              
              {/* Public Routes */}
              <Route 
                path="/" 
                element={<Home addToCart={addToCart} />} 
              />
              
              <Route 
                path="/login" 
                element={<Login />} 
              />
              
              <Route 
                path="/verify" 
                element={<Verify />} 
              />
              
              <Route 
                path="/cart" 
                element={<Cart />} 
              />

              {/* Admin/Dashboard Routes - Now accessible to all */}
              <Route 
                path="/dashboard" 
                element={<Dashboard />} 
              />
              
              <Route 
                path="/add" 
                element={<ProductAdd />} 
              />
              
              <Route 
                path="/edit" 
                element={<ProductEditForm />} 
              />

              {/* 404 Not Found Page */}
              <Route 
                path="*" 
                element={
                  <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
                    <div className="text-center space-y-6 bg-white rounded-2xl shadow-xl p-8 max-w-md">
                      <div className="text-6xl">🔍</div>
                      <h1 className="text-4xl font-bold text-gray-800">404</h1>
                      <p className="text-xl text-gray-600">Page Not Found</p>
                      <p className="text-gray-500">
                        The page you're looking for doesn't exist or has been moved.
                      </p>
                      <a 
                        href="/" 
                        className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
                      >
                        Back to Home
                      </a>
                    </div>
                  </div>
                } 
              />
            </Routes>
          </main>

          {/* Footer - Always at bottom */}
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;