import { useState } from 'react';
import { ProductData } from '../context/ProductContext';
import { LoadingBig } from '../component/Loading.js';
import { UserData } from '../context/UserContext.js';

const Home = ({ addToCart, cart }) => {

 
  const { total, products, loading, pagination } = ProductData();


  const [selectedQuantity, setSelectedQuantity] = useState({});

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
    console.log('Added to cart:', product, 'Quantity:', quantity);
    setSelectedQuantity({ ...selectedQuantity, [product._id]: undefined });
  };

  const handleQuantityChange = (productId, value) => {
    setSelectedQuantity({ ...selectedQuantity, [productId]: value });
  };

  const handlePage = (page) => {
    pagination(page);
  }

  return (
    <div>
      <div className="w-full sm:w-[540px] md:w-[720px] lg:w-[1170px] mx-auto p-4">
        <div className="flex flex-wrap -m-2">
          {loading ? (
            <LoadingBig />
          ) : products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="w-1/2 sm:w-1/3 md:w-1/4 p-2">
                <div className="product-card border rounded-lg p-4 shadow hover:shadow-lg transition duration-300">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-64 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 h-[60px] overflow-hidden">
                    {product.description}
                  </p>
                  <div className="flex gap-4 justify-evenly items-center leading-none">
                    <p className="text-green-500 font-bold">
                      ₹{(
                        product.price - (product.price * product.discountPercentage) / 100
                      ).toFixed(2)}{' '}
                      <span className="line-through text-gray-500 text-sm">
                        ₹{product.price.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-yellow-500 text-sm">Rating: {product.rating}</p>
                  </div>
  
                  {selectedQuantity[product._id] !== undefined ? (
                    <div className="mt-3 flex items-center">
                      <input
                        type="number"
                        min="1"
                        value={selectedQuantity[product._id] || 1}
                        onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                        className="w-16 p-1 border rounded text-center"
                      />
                      <button
                        onClick={() => handleAddToCart(product, selectedQuantity[product._id])}
                        className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600 transition duration-300"
                      >
                        Add {selectedQuantity[product._id]} to Cart
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        setSelectedQuantity({ ...selectedQuantity, [product._id]: 1 })
                      }
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-3 hover:bg-blue-600 transition duration-300"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full">No products available</p>
          )}
        </div>
        
        {/* Pagination Section */}
        {!loading && products.length > 0 && (
          <div className="pagination mt-4 text-center">
            {Array(Math.ceil(total / 12))
              .fill(0)
              .map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePage(i + 1)}
                  className="mx-1 px-3 py-1 border rounded hover:bg-blue-500 hover:text-white"
                >
                  {i + 1}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
  
};

export default Home;
