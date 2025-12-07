import React from 'react';
import { useCart } from '../context/CartContext';
import { PaymentData } from '../context/PaymentContext';
import { Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateCartQuantity } = useCart();
  const { createRazorPayOrder } = PaymentData();

  const calculateItemTotal = (price, discount, quantity) => {
    const discountedPrice = price * (1 - discount / 100);
    return (discountedPrice * quantity).toFixed(2);
  };

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) =>
          total + (item.price * (1 - item.discountPercentage / 100) * item.quantity),
        0
      )
      .toFixed(2);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (qty > 0) {
      updateCartQuantity(id, qty);
    }
  };

  const handleCheckout = () => {
    const totalAmount = calculateTotal();
    if (totalAmount > 0) {
      createRazorPayOrder(totalAmount);
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-orange-800 to-slate-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <ShoppingCart size={36} /> Shopping Cart
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {cart.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-16">
            <div className="mb-6">
              <ShoppingCart size={80} className="mx-auto text-gray-300" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start adding some delicious items!</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              <ArrowLeft size={18} /> Continue Shopping
            </Link>
          </div>
        ) : (
          // Cart with Items
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => {
                const discountedPrice = (
                  item.price * (1 - item.discountPercentage / 100)
                ).toFixed(2);
                const itemTotal = calculateItemTotal(
                  item.price,
                  item.discountPercentage,
                  item.quantity
                );

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden"
                  >
                    <div className="flex gap-4 p-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {item.description}
                        </p>

                        {/* Price Info */}
                        <div className="flex items-center gap-4 mt-3">
                          <div className="space-y-1">
                            <p className="text-green-600 font-bold text-lg">
                              ₹{discountedPrice}
                            </p>
                            {item.discountPercentage > 0 && (
                              <p className="text-xs text-gray-500 line-through">
                                ₹{item.price.toFixed(2)}
                              </p>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <label htmlFor={`qty-${item._id}`} className="text-sm font-medium">
                              Qty:
                            </label>
                            <input
                              id={`qty-${item._id}`}
                              type="number"
                              min="1"
                              max="99"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(item._id, e.target.value)
                              }
                              className="w-16 px-2 py-1 border-2 border-gray-300 rounded-lg text-center font-semibold focus:outline-none focus:border-orange-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Item Total & Remove */}
                      <div className="flex flex-col items-end justify-between">
                        <p className="text-2xl font-bold text-gray-800">₹{itemTotal}</p>
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition transform hover:scale-110"
                          aria-label="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
                  Order Summary
                </h2>

                {/* Summary Details */}
                <div className="space-y-3 border-b pb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span className="font-semibold">₹0</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">Total</span>
                  <span className="text-3xl font-bold text-green-600">
                    ₹{calculateTotal()}
                  </span>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition transform hover:scale-105"
                >
                  Proceed to Checkout
                </button>

                <Link
                  to="/"
                  className="block text-center border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Continue Shopping
                </Link>

                <button
                  onClick={handleClearCart}
                  className="w-full border-2 border-red-500 text-red-500 py-2 rounded-lg font-semibold hover:bg-red-50 transition"
                >
                  Clear Cart
                </button>

                {/* Items Count */}
                <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-orange-600">{cart.length}</span> items in cart
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;