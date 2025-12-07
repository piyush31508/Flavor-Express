import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductData } from '../context/ProductContext';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, X, Plus, Image as ImageIcon } from 'lucide-react';

const ProductAdd = () => {
  const { addProduct } = ProductData();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: 0,
    thumbnail: '',
    images: ['', '', '']
  });

  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [imagePreviews, setImagePreviews] = useState(['', '', '']);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('Images')) {
      const index = parseInt(name.replace('Images', ''), 10) - 1;
      setFormData((prevData) => {
        const updatedImages = [...prevData.images];
        updatedImages[index] = value;
        return { ...prevData, images: updatedImages };
      });
      updateImagePreview(index, value);
    } else if (name === 'thumbnail') {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setThumbnailPreview(value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
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

    if (!images[0].trim()) {
      toast.error('At least one product image URL is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const newProduct = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        discountPercentage: parseFloat(formData.discountPercentage) || 0,
        thumbnail: formData.thumbnail.trim(),
        images: formData.images.filter(img => img.trim() !== ''),
      };

      addProduct(newProduct);
      toast.success('Product added successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to add product');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      discountPercentage: 0,
      thumbnail: '',
      images: ['', '', '']
    });
    setThumbnailPreview('');
    setImagePreviews(['', '', '']);
    toast.success('Form reset');
  };

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
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-8 px-8">
            <h2 className="text-4xl font-bold flex items-center gap-3">
              <Plus size={40} /> Add New Product
            </h2>
            <p className="text-green-100 mt-2">Create a new product and add it to your catalog</p>
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
                  placeholder="e.g., Masala Dosa, Biryani, Pizza"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                  required
              />
                <p className="text-xs text-gray-500 mt-1">Be descriptive and clear</p>
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
                  placeholder="Describe your product in detail..."
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Include ingredients, preparation, or special features</p>
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
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                      min="0"
                      max="100"
                    />
                    <span className="absolute right-4 top-3 text-gray-600 font-bold">%</span>
                  </div>
                  {formData.price && formData.discountPercentage > 0 && (
                    <p className="text-xs text-green-600 mt-2">
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                  required
                />
                {thumbnailPreview && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Preview:</p>
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
                  Additional Images (Optional)
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
                          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition text-sm"
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
                <p className="text-xs text-gray-500 mt-3">💡 Tip: Add high-quality images for better product presentation</p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-8 border-t-2">
              <button
                type="reset"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                <X size={18} /> Reset Form
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
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} /> Save Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            💡 Tips for Success
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Use clear, descriptive product titles</li>
            <li>✓ Include all relevant details in description</li>
            <li>✓ Set competitive prices</li>
            <li>✓ Use high-quality product images (400x400px or larger)</li>
            <li>✓ Set realistic discount percentages (0-50%)</li>
            <li>✓ All image URLs should be valid and accessible</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;