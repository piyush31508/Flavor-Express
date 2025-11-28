import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import { UserData } from '../context/UserContext';
import 'font-awesome/css/font-awesome.min.css';

const Header = ({ cartItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { setData, isAuth, data, logOut } = UserData();

  const handleSignOut = () => {
    logOut();
    setData(null);
  }
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="mx-auto container px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-gray-300 transition duration-300">
            Flavor Express
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Cart
            {cartItems > 0 && (
              <sup
                className="absolute mt-6 ml-4 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold transform translate-x-1/2 -translate-y-1/2"
              >
                {cartItems}
              </sup>
            )}
          </Link>

          {data &&
            <Link
              to="/dashboard"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Dashboard
            </Link>
          }


          {!isAuth ? (
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Sign In
            </Link>
          ) : (
            <Link
              onClick={handleSignOut}
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Sign Out
            </Link>
          )}

        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isMenuOpen ? 'block' : 'hidden'
          } md:hidden bg-gray-800 text-white px-4 py-2`}
      >
        <Link
          to="/"
          className="block py-2 hover:text-gray-300 transition duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/cart"
          className="block py-2 hover:text-gray-300 transition duration-300"
        >
          Cart
          {cartItems > 0 && (
            <sup
              className="block py-2 hover:text-gray-300 transition duration-300"
            >
              {cartItems}
            </sup>
          )}
        </Link>
        {data &&
          <Link
            to="/dashboard"
            className="block py-2 hover:text-gray-300 transition duration-300"
          >
            Dashboard
          </Link>
        }

        {!isAuth ? (
          <Link
            to="/login"
            className="block py-2 hover:text-gray-300 transition duration-300"
          >
            Sign In
          </Link>
        ) : (
          <Link
            onClick={handleSignOut}
            to="/login"
            className="block py-2 hover:text-gray-300 transition duration-300"
          >
            Sign Out
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
