// src/App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import { useCart } from './context/CartContext';

// PAGES
import Home from './pages/Home';
import Login from './pages/Login';
import Verify from './pages/Verify';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';

// COMPONENTS
import ProductAdd from './component/ProductAdd';
import ProductEditForm from './component/ProductEditForm';
import AdminRoute from './component/AdminRoute';

function App() {
  const { cart, addToCart } = useCart();

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header cartItems={cart.length} />

        {/* Main */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/cart" element={<Cart />} />

            {/* Admin/Dashboard Routes - now protected */}
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/add"
              element={
                <AdminRoute>
                  <ProductAdd />
                </AdminRoute>
              }
            />
            <Route
              path="/edit"
              element={
                <AdminRoute>
                  <ProductEditForm />
                </AdminRoute>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
                  <div className="text-center space-y-6 bg-white rounded-2xl shadow-xl p-8 max-w-md">
                    <div className="text-6xl mb-4">🔍</div>
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

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
