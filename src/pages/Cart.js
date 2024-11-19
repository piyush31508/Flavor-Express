import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { PaymentData } from '../context/PaymentContext';

const Cart = () => {
  const { createRazorPayOrder, responseId, paymentFetch, responseStatus } = PaymentData();
  const { cart, removeFromCart, clearCart, updateCartQuantity } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) =>
          total + (item.price * (1 - item.discountPercentage / 100) * item.quantity),
        0
      )
      .toFixed(2);
  };

  const handleQuantityChange = (id, e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      updateCartQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    const totalAmount = calculateTotal();
    createRazorPayOrder(totalAmount); // Trigger Razorpay flow
  };

  return (
    <div className="w-full sm:w-[540px] md:w-[720px] lg:w-[1170px] mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center border rounded-lg p-4 shadow-md">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-green-500 font-bold">
                    ₹{(
                      item.price - (item.price * item.discountPercentage) / 100
                    ).toFixed(2)}
                  </p>
                  <div className="w-3/4 ml-7 flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(item._id, e)}
                      className="w-16 p-1 border rounded text-center"
                    />
                    <span className="text-sm">x ₹{(
                      item.price - (item.price * item.discountPercentage) / 100
                    ).toFixed(2)}</span>

                    <div className="ml-auto flex items-center">
                      <span className="font-bold">
                        ₹{(
                          (item.price - (item.price * item.discountPercentage) / 100) *
                          item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total: ₹{calculateTotal()}</p>
            <button
              onClick={clearCart}
              className="bg-blue-500 text-white px-6 py-2 rounded mt-3 hover:bg-blue-600 transition duration-300"
            >
              Clear Cart
            </button>
            <div className="mt-6">
              <button
                onClick={handleCheckout}
                className="bg-green-500 text-white px-6 py-2 rounded mt-3 hover:bg-green-600 transition duration-300"
              >
                Buy Now
              </button>
              {/* fetching payment id */}
              {/* {responseId && <p>Payment ID: {responseId}</p>}
              <form onSubmit={paymentFetch} className="mt-4">
                <input
                  type="text"
                  name="paymentId"
                  placeholder="Enter Payment ID"
                  className="border rounded p-2"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ml-2"
                >
                  Fetch Payment
                </button>
              </form>
              {responseStatus && (
                <div className="mt-4">
                  <h4 className="font-bold">Payment Details:</h4>
                  <pre>{JSON.stringify(responseStatus, null, 2)}</pre>
                </div>
              )} */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
