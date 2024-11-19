import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Verify from './pages/Verify';
import Cart from './pages/Cart';
import Header from './component/Header';
import Footer from './component/Footer';
import { useCart } from './context/CartContext';
import Dashboard from './pages/Dashboard';
import ProductEditForm from './component/ProductEditForm';
import ProductAdd from './component/ProductAdd';
function App() {
  const { cart,addToCart } = useCart();

  return (
    <>
      <BrowserRouter>
        <Header cartItems={cart.length}/>
        <Routes>
          <Route path="/Flavour-Express" element={<Home addToCart={addToCart} cart={cart} />} />
          <Route path="/Flavour-Express/login" element={<Login />} />
          <Route path="/Flavour-Express/verify" element={<Verify />} />
          <Route path="/Flavour-Express/cart" element={<Cart />} />
          <Route path="/Flavour-Express/dashboard" element={<Dashboard />} />
          <Route path="/Flavour-Express/edit" element={<ProductEditForm />} />
          <Route path="/Flavour-Express/add" element={<ProductAdd />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
