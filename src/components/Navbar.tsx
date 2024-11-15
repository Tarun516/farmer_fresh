import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Sprout, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Educational Resources', href: '/educational-resources' },
    { name: 'Farmer Profiles', href: '/farmer-profiles' },
    { name: 'Farmer Analytics', href: '/farmer-analytics' },
    { name: 'Buyer Analytics', href: '/Buyer-analytics' },
    

  ];

  return (
    <nav className="bg-gradient-to-r from-green-800 to-green-900 text-white py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Sprout className="h-6 w-6 text-green-300 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-2xl font-bold bg-gradient-to-r from-green-300 to-white bg-clip-text text-transparent">
              Farm Fresh
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative group py-2"
              >
                <span className="relative z-10 hover:text-green-300 transition-colors duration-200">
                  {link.name}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-300 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Auth & Cart Section */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/login"
              className="px-4 py-2 rounded-full border border-green-300 hover:bg-green-300 hover:text-green-900 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-full bg-green-300 text-green-900 hover:bg-white hover:text-green-900 transition-all duration-300"
            >
              Sign Up
            </Link>
            <Link to="/cart" className="relative group">
              <ShoppingCart className="h-6 w-6 hover:text-green-300 transition-colors duration-200" />
              <span className="absolute -top-2 -right-2 bg-green-300 text-green-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-6 w-6 text-green-300" />
            <span className="text-xl font-bold">Farm Fresh</span>
          </Link>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-green-700 rounded-lg transition-colors duration-200"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-green-800 shadow-lg py-4 px-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block w-full text-left py-2 hover:text-green-300 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4 border-t border-green-700">
              <Link 
                to="/login"
                className="w-full px-4 py-2 rounded-full border border-green-300 hover:bg-green-300 hover:text-green-900 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup" 
                className="w-full px-4 py-2 rounded-full bg-green-300 text-green-900 hover:bg-white transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;