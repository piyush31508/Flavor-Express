// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductData } from '../context/ProductContext';
import { UserData } from '../context/UserContext';
import toast from 'react-hot-toast';
import { LoadingBig } from '../component/Loading';
import ProductCard from '../component/ProductCard';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';

const Home = ({ addToCart }) => {
  const {
    total,
    products,
    loading,
    pagination,
    searchProducts,
    searchQuery,
  } = ProductData();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(searchQuery || '');
  const { isAuth } = UserData();
  const navigate = useNavigate();

  const itemsPerPage = 12;
  const totalPages = Math.ceil(total / itemsPerPage);

  const handleAddToCart = (product, quantity) => {
    if (!isAuth) {
      toast.error('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
  };

  // search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    searchProducts(searchTerm, 1); // calls /product/search or /product/all if empty
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
    searchProducts('', 1); // fallback to normal listing
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      pagination(page); // ProductContext decides whether to hit /all or /search
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => handlePageChange(currentPage - 1);
  const handleNextPage = () => handlePageChange(currentPage + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-orange-800 to-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              🍽️ Welcome to Flavor Express
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover the most delicious meals from your favorite restaurants,
              delivered fresh to your door.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Section Header + Search */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Featured Dishes
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
            <p className="text-gray-600 mt-3">
              {searchQuery
                ? `Showing results for "${searchQuery}"`
                : 'Explore our most popular items'}
            </p>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 w-full md:w-96"
          >
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search dishes by name, description, category..."
                className="w-full pl-10 pr-10 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300 text-sm"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition text-sm"
            >
              Search
            </button>
          </form>
        </div>

        {/* Products Grid */}
        {loading ? (
          <LoadingBig />
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isDashboard={false}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 flex-wrap py-8">
                {/* Previous */}
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  <ChevronLeft size={18} /> Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                            : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-500 hover:text-orange-600'
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                {/* Next */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Page Info */}
            <div className="text-center text-gray-600 mt-6">
              <p className="text-sm">
                Showing page{' '}
                <span className="font-bold text-orange-600">
                  {currentPage}
                </span>{' '}
                of{' '}
                <span className="font-bold text-orange-600">
                  {totalPages}
                </span>
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-500">No products found</p>
            <p className="text-gray-400 mt-2">
              Try searching with a different keyword
            </p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-4 mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🚀"
              title="Fast Delivery"
              description="Get your food delivered hot and fresh in 30 minutes or less"
            />
            <FeatureCard
              icon="🔒"
              title="Secure Payment"
              description="Multiple payment options with secure Razorpay integration"
            />
            <FeatureCard
              icon="⭐"
              title="Quality Assured"
              description="All restaurants are carefully selected for quality and hygiene"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200 hover:shadow-lg transition duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;
