import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ProductData } from '../context/ProductContext';

const ProductAdd = () => {
  const { addProduct } = ProductData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: 0,
    thumbnail:'',
    images:[]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name.startsWith('Images')) {
      const index = parseInt(name.replace('Images', ''), 10) - 1;
      setFormData((prevData) => {
        const updatedImages = [...prevData.images];
        updatedImages[index] = value;
        return { ...prevData, images: updatedImages };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleCancel = () => {
    navigate('/Flavor-Express/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, price, discountPercentage, thumbnail, images } = formData;

    if (!title || !description || !price || !thumbnail || !images) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const newProduct = {
      title,
      description,
      price: parseFloat(price),
      discountPercentage: parseFloat(discountPercentage),
      thumbnail: thumbnail,
      images: images,
    };
    addProduct(newProduct);
    navigate('/Flavor-Express/dashboard');
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md w-full mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Product</h2>
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
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
