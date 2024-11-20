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
          <Route path="/Flavor-Express" element={<Home addToCart={addToCart} cart={cart} />} />
          <Route path="/Flavor-Express/login" element={<Login />} />
          <Route path="/Flavor-Express/verify" element={<Verify />} />
          <Route path="/Flavor-Express/cart" element={<Cart />} />
          <Route path="/Flavor-Express/dashboard" element={<Dashboard />} />
          <Route path="/Flavor-Express/edit" element={<ProductEditForm />} />
          <Route path="/Flavor-Express/add" element={<ProductAdd />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
