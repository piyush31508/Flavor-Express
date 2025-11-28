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
          <Route path="/" element={<Home addToCart={addToCart} cart={cart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit" element={<ProductEditForm />} />
          <Route path="/add" element={<ProductAdd />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
