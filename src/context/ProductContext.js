import { createContext, useContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { server } from '../index.js';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [editProductState, setEditProductState] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    
    async function fetchProduct() {
        setLoading(true);
        try {
            const response = await axios.get(`${server}/product/all`);
            setProducts(response.data.products);
            setTotal(response.data.totalProducts); // Update total from server response
        } catch (error) {
            toast.error('Failed to fetch products');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    

    async function pagination(page) {
        setLoading(true);
        try {
            const res = await axios.get(`${server}/product/all?page=${page}`);
            setProducts(res.data.products);
            setTotal(res.data.totalProducts); 
        } catch (error) {
            toast.error('Failed to load paginated products');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    

    async function addProduct(product) {
        try {
            const response = await axios.post(`${server}/product/create`, {
                title: product.title,
                price: product.price,
                description: product.description,
                discountPercentage: product.discountPercentage,
                thumbnail: product.thumbnail,
                images: product.images
            });
            toast.success('Product added successfully');
            fetchProduct();
        } catch (error) {
            toast.error('Failed to add product');
            console.error(error);
        }
    }

    async function editProduct(product) {
        try {
            const updatedProductData = {};

            if (product.price) updatedProductData.price = product.price;
            if (product.title) updatedProductData.title = product.title;
            if (product.description) updatedProductData.description = product.description;
            if (product.discountPercentage) updatedProductData.discountPercentage = product.discountPercentage;
            if (product.thumbnail) updatedProductData.thumbnail = product.thumbnail;
            if (product.images) updatedProductData.images = product.images;
            
            const response = await axios.put(`${server}/product/${product._id}`, updatedProductData);
            toast.success('Product updated successfully');
            fetchProduct();
        } catch (error) {
            toast.error('Failed to update product');
            console.error(error);
        }
    }

    async function deleteProduct(productId) {

        try {
            const { data } = await axios.delete(`${server}/product/${productId}`);
            setProducts(products.filter(product => product._id!== productId));
            toast.success('Product deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete product');
        }
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <ProductContext.Provider value={{ total, pagination, products, loading, editProduct, editProductState, setEditProductState, addProduct, deleteProduct }}>
            {children}
            <Toaster />
        </ProductContext.Provider>
    );
};

export const ProductData = () => useContext(ProductContext);
