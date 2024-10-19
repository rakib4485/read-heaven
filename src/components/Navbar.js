import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className={`text-2xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
          ReadHaven
        </div>
        <ul className={`hidden md:flex space-x-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
          <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
          {/* <li><Link to="#books" className="hover:text-blue-500">Books</Link></li> */}
          <li><Link to="/wishlist" className="hover:text-blue-500">Wishlist</Link></li>
        </ul>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMobileMenu} className="text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col items-center space-y-4 p-4">
          <li><Link to="/node_modules" className="text-gray-800 hover:text-blue-500">Home</Link></li>
          <li><Link to="/node_modulesbooks" className="text-gray-800 hover:text-blue-500">Books</Link></li>
          <li><Link to="/wishlist" className="text-gray-800 hover:text-blue-500">Wishlist</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
