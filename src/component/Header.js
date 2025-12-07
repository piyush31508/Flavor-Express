// src/component/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, LogOut } from 'lucide-react';
import { UserData } from '../context/UserContext';

const Header = ({ cartItems = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuth, data, logOut } = UserData();

  const handleSignOut = () => {
    logOut();
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="text-3xl">🍽️</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Flavor Express
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-2 items-center">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/cart" className="relative">
            <div className="flex items-center gap-2">
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </div>
          </NavLink>

          {/* 👇 Dashboard only visible if user is admin */}
          {data?.isAdmin && <NavLink to="/dashboard">Dashboard</NavLink>}

          {!isAuth ? (
            <NavLink
              to="/login"
              className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-lg hover:shadow-lg"
            >
              Sign In
            </NavLink>
          ) : (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg transition font-medium"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white hover:bg-slate-700 p-2 rounded-lg transition"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 py-3 space-y-2 animate-fadeIn">
          <MobileNavLink to="/" onClick={closeMenu}>Home</MobileNavLink>

          <MobileNavLink to="/cart" onClick={closeMenu}>
            <div className="flex items-center justify-between">
              <span>Cart</span>
              {cartItems > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                  {cartItems}
                </span>
              )}
            </div>
          </MobileNavLink>

          {/* 👇 Dashboard link mobile - only admin */}
          {data?.isAdmin && (
            <MobileNavLink to="/dashboard" onClick={closeMenu}>
              Dashboard
            </MobileNavLink>
          )}

          {!isAuth ? (
            <MobileNavLink to="/login" onClick={closeMenu}>
              Sign In
            </MobileNavLink>
          ) : (
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 hover:bg-slate-700 rounded-lg transition flex items-center gap-2"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, children, className = "" }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-lg hover:bg-slate-700 transition duration-300 text-sm font-medium block ${className}`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-2 hover:bg-slate-700 rounded-lg transition font-medium"
  >
    {children}
  </Link>
);

export default Header;
