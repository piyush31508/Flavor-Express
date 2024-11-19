import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../index.js';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const [responseId, setResponseId] = useState("");
    const [responseStatus, setResponseStatus] = useState([]);

    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => reject(false);
            document.body.appendChild(script);
        });
    };

    const createRazorPayOrder = async (amount) => {
        const data = { amount: amount , currency: "INR", description: "Payment for product" };

        try {
            const response = await axios.post(`${server}/payment/order`, data, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('Order created:', response.data);
            await handleRazorPay(response.data.orderID, data.amount);
        } catch (error) {
            console.error('Error creating order:', error.response?.data || error.message);
            toast.error('Failed to create order. Please try again.');
        }
    };

    const handleRazorPay = async (orderId, amount) => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res) {
            toast.error('Failed to load Razorpay script');
            return;
        }
        if (!window.Razorpay) {
            toast.error('Razorpay SDK not loaded. Please check your network connection.');
            return;
        }

        const options = {
            key: 'rzp_test_esSRYdqK5z6yfi',
            amount: amount,
            currency: "INR",
            name: "FlavourExpress",
            description: "Payment to FlavourExpress",
            order_id: orderId,
            handler: (response) => {
                console.log('Payment Successful:', response);
                setResponseId(response.razorpay_payment_id);
                toast.success('Payment successful!');
            },
            prefill: { name: "FlavourExpress", email: "piyushwork2003@gmail.com" },
            theme: { color: "#3399cc" },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const paymentFetch = async (e) => {
        e.preventDefault();
        const paymentId = e.target.paymentId.value.trim();
      
        if (!paymentId) {
          toast.error("Please enter a valid Payment ID.");
          return;
        }
      
        try {
          const res = await axios.get(`${server}/payment/status/${paymentId}`);
          console.log('Payment Status:', res.data);
          setResponseStatus(res.data);
          toast.success('Payment status fetched successfully!');
        } catch (error) {
          console.error('Error fetching payment status:', error.response?.data || error.message);
          toast.error('Error getting payment status.');
        }
      };
      

    return (
        <PaymentContext.Provider value={{ createRazorPayOrder, responseId, paymentFetch }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const PaymentData = () => useContext(PaymentContext);
