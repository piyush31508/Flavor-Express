import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductData } from '../context/ProductContext';
import ProductCard from '../component/ProductCard';
import { LoadingBig } from '../component/Loading';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { total, pagination, products, loading, setEditProductState, deleteProduct } = ProductData();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(total / itemsPerPage);

  const handleEdit = (product) => {
    setEditProductState(product);
    navigate('/edit');
  };

  const handleDelete = (product) => {
    const sure = window.confirm(
      `Are you sure you want to delete "${product.title}"?\n\nThis action cannot be undone.`
    );
    if (sure) {
      deleteProduct(product._id);
    }
  };

  const handleAddItem = () => {
    navigate('/add');
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      pagination(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
            📊 Dashboard
          </h1>
          <p className="text-blue-200 text-lg">Manage your products and inventory</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Add Product Button */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Products</h2>
            <p className="text-gray-600 mt-1">
              {total} products in total
              {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
            </p>
          </div>
          <button
            onClick={handleAddItem}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition transform hover:scale-105"
          >
            <Plus size={20} /> Add New Product
          </button>
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
                  isDashboard={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* Pagination Section */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 flex-wrap py-8">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  <ChevronLeft size={18} /> Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Page Info */}
            {totalPages > 1 && (
              <div className="text-center text-gray-600 mt-6">
                <p className="text-sm">
                  Showing page <span className="font-bold text-blue-600">{currentPage}</span> of{' '}
                  <span className="font-bold text-blue-600">{totalPages}</span>
                </p>
              </div>
            )}
          </>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <div className="mb-6">
              <div className="text-6xl mb-4">📦</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Yet</h3>
            <p className="text-gray-600 mb-6">Start by adding your first product to the catalog</p>
            <button
              onClick={handleAddItem}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition"
            >
              <Plus size={20} /> Add Your First Product
            </button>
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 mb-8">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            💡 Dashboard Tips
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Click "Add New Product" button to create new products</li>
            <li>✓ Hover over product cards and click "Edit" to modify product details</li>
            <li>✓ Click the X button to delete a product (confirmation required)</li>
            <li>✓ Use pagination to browse through your products</li>
            <li>✓ Each product shows discount percentage and final price</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;