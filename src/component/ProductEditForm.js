import React, { useState, useEffect } from 'react';
import { ProductData } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const ProductEditForm = () => {
  const { editProduct, editProductState, setEditProductState } = ProductData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: 0,
    images: ['', '', ''],
    thumbnail: ''
  });

  useEffect(() => {
    if (editProductState) {
      setFormData({
        title: editProductState.title || '',
        description: editProductState.description || '',
        price: editProductState.price || '',
        discountPercentage: editProductState.discountPercentage || 0,
        images: Array.isArray(editProductState.images) ? editProductState.images : ['', '', ''], // Ensure images is an array
        thumbnail: editProductState.thumbnail
      });
    }
  }, [editProductState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('Images')) {
      const index = parseInt(name.charAt(name.length - 1)) - 1;  // Extract index from name (Images1 -> index 0)
      setFormData((prev) => {
        const updatedImages = [...prev.images];  // Ensure you're modifying the 'images' array
        updatedImages[index] = value;  // Update the specific image field
        return {
          ...prev,
          images: updatedImages,
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();
    if (editProductState) {
      editProduct({ ...formData, _id: editProductState._id }); 
    }
    setEditProductState(null); 
    navigate('/Flavor-Express/dashboard');
  };

  const handleCancel = () => {
    setEditProductState(null);
    navigate('/Flavor-Express/dashboard');
  };

  if (!editProductState) return null;

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md w-full mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Product Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price (₹)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700">
            Discount Percentage (%)
          </label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            max="100"
          />
        </div>
        <div>
          <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700">
            Thumbnail
          </label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            placeholder="Enter thumbnail's link"
            value={formData.thumbnail}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="text"
            id="Images1"
            name="Images1"  
            value={formData.images[0] || ''}
            required
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            id="Images2"
            name="Images2"  
            value={formData.images[1] || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            id="Images3"
            name="Images3"  
            value={formData.images[2] || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />

        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEditForm;
