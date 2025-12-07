import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoadingSpinner } from '../component/Loading';
import { UserData } from '../context/UserContext';
import { Lock, ArrowLeft, Clock } from 'lucide-react';

const Verify = () => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const { verifyUser, btnLoading } = UserData();

  // Timer for OTP expiration
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.trim() && otp.length === 6) {
      verifyUser(Number(otp), navigate);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Only allow digits and max 6 characters
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const handleResendOTP = () => {
    setOtp('');
    setTimeLeft(300);
    setCanResend(false);
    // Call resend OTP API here
    console.log('Resending OTP...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-800 to-slate-900 flex items-center justify-center px-4 py-12">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>

      {/* Verify Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8 animate-fadeIn">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-2">
              <Lock className="text-blue-600" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Verify OTP</h1>
            <p className="text-gray-600 text-sm">
              We've sent a 6-digit code to your email
            </p>
          </div>

          {/* OTP Input Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* OTP Input */}
            <div className="space-y-3">
              <label htmlFor="otp" className="block text-sm font-semibold text-gray-700">
                One-Time Password
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleInputChange}
                placeholder="000000"
                maxLength="6"
                className="w-full px-4 py-4 text-center text-4xl font-bold tracking-widest border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800 placeholder:text-gray-300"
                autoFocus
                required
              />
              <p className="text-xs text-gray-500 text-center">
                {otp.length}/6 digits entered
              </p>
            </div>

            {/* Timer Display */}
            <div className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg ${
              timeLeft > 60 
                ? 'bg-green-50 border-2 border-green-200' 
                : 'bg-red-50 border-2 border-red-200'
            }`}>
              <Clock size={18} className={timeLeft > 60 ? 'text-green-600' : 'text-red-600'} />
              <span className={`font-semibold ${timeLeft > 60 ? 'text-green-700' : 'text-red-700'}`}>
                {formatTime(timeLeft)} remaining
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={btnLoading || otp.length !== 6 || timeLeft <= 0}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-105"
            >
              {btnLoading ? (
                <>
                  <LoadingSpinner /> Verifying...
                </>
              ) : (
                <>
                  Verify OTP <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                </>
              )}
            </button>
          </form>

          {/* Didn't Receive Code */}
          <div className="text-center space-y-3 pt-4 border-t">
            <p className="text-sm text-gray-600">Didn't receive the code?</p>
            {canResend ? (
              <button
                type="button"
                onClick={handleResendOTP}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-sm text-gray-500">
                You can resend in {formatTime(timeLeft)}
              </p>
            )}
            
            {/* Check Spam */}
            <p className="text-xs text-gray-500">
              💡 Check your spam or promotions folder
            </p>
          </div>

          {/* Back to Login */}
          <div className="text-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition font-medium"
            >
              <ArrowLeft size={16} /> Back to Login
            </Link>
          </div>

          {/* Security Message */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-700 flex items-center gap-2">
              🔒 Security Notice
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>✓ Never share your OTP with anyone</li>
              <li>✓ We'll never ask for OTP via call/SMS</li>
              <li>✓ OTP expires in 5 minutes</li>
            </ul>
          </div>

          {/* Email Hint */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Tip:</span> Check the email address associated with your account
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center mt-6 text-gray-300 text-sm">
          Having trouble? 
          <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold ml-1">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default Verify;