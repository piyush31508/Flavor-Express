import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" bottom-0 w-full bg-gray-800 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex justify-center sm:justify-start">
            <div className="text-3xl font-semibold">FlavourExpress</div>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/Flavor-Express/" className="hover:underline">Home</Link></li>
              <li><Link to="/Flavor-Express/about" className="hover:underline">About</Link></li>
              <li><Link to="/Flavor-Express/cart" className="hover:underline">Cart</Link></li>
              <li><a href="https://piyush31508.github.io/Portfolio/" className="hover:underline">Portfolio link</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Let's Connect</h3>
            <div className="flex space-x-6 justify-center sm:justify-start">
              <a href="https://github.com/piyush31508" className="text-2xl hover:text-gray-300">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/piyushchawla-webdev/" className="text-2xl hover:text-gray-300">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>© 2024 BrandName. All rights reserved.</p>
          <p>Developed by Piyush Chawla</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
