import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductData } from '../context/ProductContext';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, X, RefreshCw, Image as ImageIcon } from 'lucide-react';

const ProductEditForm = () => {
  const { editProduct, editProductState, setEditProductState } = ProductData();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: 0,
    images: ['', '', ''],
    thumbnail: ''
  });

  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [imagePreviews, setImagePreviews] = useState(['', '', '']);
  const [originalData, setOriginalData] = useState(null);

  // Load product data when component mounts or editProductState changes
  useEffect(() => {
    if (editProductState) {
      const data = {
        title: editProductState.title || '',
        description: editProductState.description || '',
        price: editProductState.price || '',
        discountPercentage: editProductState.discountPercentage || 0,
        images: Array.isArray(editProductState.images)
          ? editProductState.images.slice(0, 3)
          : ['', '', ''],
        thumbnail: editProductState.thumbnail || ''
      };
      
      // Ensure images array has 3 elements
      while (data.images.length < 3) {
        data.images.push('');
      }

      setFormData(data);
      setOriginalData(data);
      setThumbnailPreview(data.thumbnail);
      setImagePreviews(data.images);
    }
  }, [editProductState]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('Images')) {
      const index = parseInt(name.charAt(name.length - 1)) - 1;
      setFormData((prev) => {
        const updatedImages = [...prev.images];
        updatedImages[index] = value;
        return { ...prev, images: updatedImages };
      });
      updateImagePreview(index, value);
    } else if (name === 'thumbnail') {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setThumbnailPreview(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const updateImagePreview = (index, value) => {
    const newPreviews = [...imagePreviews];
    newPreviews[index] = value;
    setImagePreviews(newPreviews);
  };

  const validateForm = () => {
    const { title, description, price, thumbnail, images } = formData;

    if (!title.trim()) {
      toast.error('Product title is required');
      return false;
    }

    if (!description.trim()) {
      toast.error('Product description is required');
      return false;
    }

    if (!price || parseFloat(price) <= 0) {
      toast.error('Please enter a valid price');
      return false;
    }

    if (!thumbnail.trim()) {
      toast.error('Thumbnail image URL is required');
      return false;
    }

    return true;
  };

  const hasChanges = () => {
    if (!originalData) return false;
    return JSON.stringify(formData) !== JSON.stringify(originalData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!hasChanges()) {
      toast.error('No changes made');
      return;
    }

    setIsSubmitting(true);

    try {
      if (editProductState) {
        editProduct({
          ...formData,
          price: parseFloat(formData.price),
          discountPercentage: parseFloat(formData.discountPercentage) || 0,
          images: formData.images.filter(img => img.trim() !== ''),
          _id: editProductState._id
        });
        toast.success('Product updated successfully!');
        setEditProductState(null);
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to update product');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditProductState(null);
    navigate('/dashboard');
  };

  const handleReset = () => {
    if (originalData) {
      setFormData(originalData);
      setThumbnailPreview(originalData.thumbnail);
      setImagePreviews(originalData.images);
      toast.success('Form reset to original values');
    }
  };

  // If no product is being edited, show message
  if (!editProductState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">⚠️ No Product Selected</h1>
          <p className="text-gray-600 mb-6">Please select a product to edit from the dashboard</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header with Back Button */}
        <button
          onClick={handleCancel}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition mb-8 font-medium"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-8 px-8">
            <h2 className="text-4xl font-bold flex items-center gap-3">
              <RefreshCw size={40} /> Edit Product
            </h2>
            <p className="text-blue-100 mt-2">Update product details and pricing</p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Basic Information Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                📝 Basic Information
              </h3>
              
              {/* Product Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter product title"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Update product description"
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-none"
                  required
                />
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                💰 Pricing & Offers
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-600 font-bold text-lg">₹</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Discount */}
                <div>
                  <label htmlFor="discountPercentage" className="block text-sm font-semibold text-gray-700 mb-2">
                    Discount Percentage (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="discountPercentage"
                      name="discountPercentage"
                      value={formData.discountPercentage}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      min="0"
                      max="100"
                    />
                    <span className="absolute right-4 top-3 text-gray-600 font-bold">%</span>
                  </div>
                  {formData.price && formData.discountPercentage > 0 && (
                    <p className="text-xs text-blue-600 mt-2">
                      Final Price: ₹{(formData.price * (1 - formData.discountPercentage / 100)).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                🖼️ Product Images
              </h3>

              {/* Thumbnail */}
              <div>
                <label htmlFor="thumbnail" className="block text-sm font-semibold text-gray-700 mb-2">
                  Thumbnail Image URL *
                </label>
                <input
                  type="url"
                  id="thumbnail"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  required
                />
                {thumbnailPreview && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Current Preview:</p>
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="h-32 w-32 object-cover rounded-lg border-2 border-gray-300"
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  </div>
                )}
              </div>

              {/* Additional Images */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <ImageIcon className="inline mr-2" size={18} />
                  Additional Images
                </label>
                <div className="space-y-3">
                  {[1, 2, 3].map((num) => (
                    <div key={num}>
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="url"
                          name={`Images${num}`}
                          value={formData.images[num - 1] || ''}
                          onChange={handleChange}
                          placeholder={`Image URL ${num}`}
                          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm"
                        />
                        {imagePreviews[num - 1] && (
                          <div className="w-12 h-12 rounded-lg border-2 border-gray-300 overflow-hidden">
                            <img
                              src={imagePreviews[num - 1]}
                              alt={`Preview ${num}`}
                              className="w-full h-full object-cover"
                              onError={(e) => (e.target.style.display = 'none')}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Changes Indicator */}
            {hasChanges() && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="font-semibold text-gray-800">Unsaved Changes</p>
                  <p className="text-sm text-gray-600">You have made changes. Save them before leaving.</p>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-8 border-t-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                <RefreshCw size={18} /> Reset Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !hasChanges()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={18} /> Update Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-3">📋 Product ID</h4>
            <p className="font-mono text-sm bg-white px-3 py-2 rounded border-2 border-blue-200 break-all">
              {editProductState._id}
            </p>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-3">📅 Last Updated</h4>
            <p className="text-sm text-gray-600">
              {editProductState.createdAt ? new Date(editProductState.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditForm;