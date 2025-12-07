// src/component/ProductCard.jsx
import React, { useState } from 'react';
import { Heart, ShoppingCart, Edit2, Trash2, Star } from 'lucide-react';

const ProductCard = ({
  product,
  onAddToCart = null,
  isDashboard = false,
  onEdit = null,
  onDelete = null,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showQuantityInput, setShowQuantityInput] = useState(false);

  // Calculate prices
  const originalPrice = parseFloat(product.price) || 0;
  const discount = parseFloat(product.discountPercentage) || 0;
  const discountedPrice = (originalPrice * (1 - discount / 100)).toFixed(2);
  const savings = (originalPrice - discountedPrice).toFixed(2);
  // Use actual rating from product, default to 4.5 if 0 or undefined
  const rating = product.rating && product.rating > 0 ? product.rating : 4.5;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
      setShowQuantityInput(false);
      setQuantity(1);
    }
  };

  const handleEdit = () => {
    if (onEdit) onEdit(product);
  };

  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this product?')) {
      onDelete(product);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={14} fill="#fbbf24" color="#fbbf24" style={{ opacity: 0.5 }} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={14} fill="none" color="#d1d5db" />
      );
    }

    return stars;
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
          }}
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse-glow">
            -{discount}%
          </div>
        )}

        {/* Wishlist Button (only on Home) */}
        {!isDashboard && (
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-lg transform hover:scale-110"
            aria-label="Add to wishlist"
          >
            <Heart
              size={18}
              fill={isWishlisted ? '#ef4444' : 'none'}
              color={isWishlisted ? '#ef4444' : '#666'}
              className="transition-all"
            />
          </button>
        )}

        {/* Dashboard overlay actions */}
        {isDashboard && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-all transform hover:scale-110 shadow-lg"
              aria-label="Edit product"
            >
              <Edit2 size={20} />
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-all transform hover:scale-110 shadow-lg"
              aria-label="Delete product"
            >
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors min-h-[3.5rem]">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-2 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3 pb-3 border-b border-gray-200">
          <div className="flex items-center gap-1">
            {renderStars(rating)}
          </div>
          <span className="text-sm font-semibold text-gray-700">
            {rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-500">
            ({Math.floor(Math.random() * 500) + 50} reviews)
          </span>
        </div>

        {/* Price Section */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl font-bold text-green-600">
              ₹{discountedPrice}
            </span>
            {discount > 0 && (
              <span className="text-sm line-through text-gray-400">
                ₹{originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {discount > 0 && savings > 0 && (
            <p className="text-xs text-green-600 font-semibold">
              💰 You save ₹{savings}
            </p>
          )}
        </div>

        {/* Add to Cart (only on Home) */}
        {!isDashboard && (
          <div className="mt-4 space-y-2">
            {!showQuantityInput ? (
              <button
                onClick={() => setShowQuantityInput(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            ) : (
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 px-2 py-2 border-2 border-orange-500 rounded-lg text-center font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400"
                  aria-label="Quantity"
                />
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  ✓ Confirm
                </button>
                <button
                  onClick={() => {
                    setShowQuantityInput(false);
                    setQuantity(1);
                  }}
                  className="px-3 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
                  aria-label="Cancel"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;