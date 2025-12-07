import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <div className="text-3xl">🍽️</div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Flavor Express
              </h3>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Delivering delicious food from your favorite restaurants straight to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-lg">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-orange-400 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-orange-400 transition duration-300">
                  Cart
                </Link>
              </li>
              <li>
                <a href="#about" className="hover:text-orange-400 transition duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-400 transition duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Policies */}
          <div className="space-y-3">
            <h4 className="font-bold text-lg">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#help" className="hover:text-orange-400 transition duration-300">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-orange-400 transition duration-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-orange-400 transition duration-300">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-orange-400 transition duration-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-lg">Connect With Us</h4>
            <div className="flex gap-4">
              <SocialLink 
                href="https://github.com" 
                icon={FaGithub} 
                label="GitHub"
              />
              <SocialLink 
                href="https://linkedin.com" 
                icon={FaLinkedin} 
                label="LinkedIn"
              />
              <SocialLink 
                href="https://twitter.com" 
                icon={FaTwitter} 
                label="Twitter"
              />
              <SocialLink 
                href="https://facebook.com" 
                icon={FaFacebook} 
                label="Facebook"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          
          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} <span className="font-semibold">Flavor Express</span>. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Developed with <span className="text-red-500">❤️</span> by 
              <a 
                href="https://github.com/piyush31508" 
                className="text-orange-400 hover:text-orange-300 transition ml-1 font-semibold"
              >
                Piyush Chawla
              </a>
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-8 pt-8 border-t border-slate-700">
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Email for newsletter"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-semibold hover:shadow-lg transition duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-2">
              Subscribe to our newsletter for latest updates and special offers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-slate-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 rounded-full flex items-center justify-center transition duration-300 transform hover:scale-110"
    aria-label={label}
  >
    <Icon size={18} />
  </a>
);

export default Footer;