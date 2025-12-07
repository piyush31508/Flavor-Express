import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../component/Loading';
import { UserData } from '../context/UserContext';
import { Mail, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { loginUser, btnLoading } = UserData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      loginUser(email, navigate);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@email.com');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-800 to-slate-900 flex items-center justify-center px-4 py-12">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8 animate-fadeIn">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="text-5xl mb-2">🍽️</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Flavor Express
            </h1>
            <p className="text-gray-600 text-lg">Welcome Back!</p>
            <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition text-gray-800"
                  required
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">We'll send an OTP to verify your email</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={btnLoading || !email.trim()}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-105"
            >
              {btnLoading ? (
                <>
                  <LoadingSpinner /> Sending OTP...
                </>
              ) : (
                <>
                  Continue <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500 font-medium">or try demo</span>
            </div>
          </div>

          {/* Demo Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50 py-3 rounded-lg font-semibold transition"
          >
            Use Demo Account
          </button>

          {/* Demo Info Box */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4 space-y-3">
            <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
              🎯 Demo Credentials
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600 font-medium">Email:</span>
                <span className="text-xs font-mono bg-white px-3 py-1 rounded border border-gray-200">
                  demo@email.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600 font-medium">OTP:</span>
                <span className="text-xs font-mono bg-white px-3 py-1 rounded border border-gray-200">
                  123456
                </span>
              </div>
            </div>
          </div>

          {/* Security Info */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 space-y-2">
            <p className="text-xs font-semibold text-gray-700 flex items-center gap-2">
              🔒 Your security matters
            </p>
            <p className="text-xs text-gray-600">
              We use OTP verification to keep your account secure. No password needed.
            </p>
          </div>

          {/* Footer Text */}
          <div className="text-center space-y-2 pt-2 border-t">
            <p className="text-xs text-gray-600">
              By signing in, you agree to our
            </p>
            <div className="flex gap-4 justify-center">
              <a href="#" className="text-xs text-orange-600 hover:text-orange-700 font-semibold hover:underline">
                Terms
              </a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-xs text-orange-600 hover:text-orange-700 font-semibold hover:underline">
                Privacy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Text */}
        <p className="text-center mt-6 text-gray-300 text-sm">
          First time here? 
          <span className="text-orange-400 font-semibold ml-1">We'll create your account</span>
        </p>
      </div>
    </div>
  );
};

export default Login;