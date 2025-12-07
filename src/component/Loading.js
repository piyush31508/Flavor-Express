import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="inline-flex items-center justify-center">
      <div className="w-5 h-5 border-3 border-t-orange-500 border-r-orange-500 border-b-gray-300 border-l-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export const LoadingBig = () => {
  return (
    <div className="flex justify-center items-center w-full py-16">
      <div className="flex space-x-3">
        <div className="h-4 w-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
        <div className="h-4 w-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
        <div className="h-4 w-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export const LoadingSmall = () => {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <div className="h-3 w-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
      <div className="h-3 w-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
      <div className="h-3 w-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-bounce"></div>
    </div>
  );
};

export const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 shadow-2xl">
        <LoadingBig />
        <p className="text-center text-gray-600 mt-4">Loading...</p>
      </div>
    </div>
  );
};