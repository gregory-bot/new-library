import React, { useState, useEffect } from "react";
import { Book, ShoppingCart, Menu, X } from "lucide-react";

const Navbar = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ["Home", "Books", "Add Book", "About", "Contact"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".mobile-menu")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  const getNavHref = (item) => {
    if (item.toLowerCase() === 'home') {
      return '#'; 
    }
    return `#${item.toLowerCase().replace(" ", "-")}`;
  };

  return (
    <nav className="fixed w-full z-50 bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Book className="h-8 w-8 text-indigo-600" />
            <span
              className="text-xl font-bold"
              style={{ fontFamily: "Courier New, monospace" }}
            >
              archives library
            </span>
          </div>

          {}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={getNavHref(item)}
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                onClick={(e) => {
                  if (item.toLowerCase() === 'home') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                {item}
              </a>
            ))}
            <button
              onClick={onCartClick}
              className="relative flex items-center text-gray-700 hover:text-indigo-600"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {}
          <div className="md:hidden flex items-center">
            <button onClick={onCartClick} className="relative mr-4">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {}
        <div
          className={`fixed top-0 left-0 h-full w-3/4 bg-indigo-600 text-white z-50 shadow-lg mobile-menu transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b border-indigo-700">
            <span className="text-lg font-bold">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col p-6 space-y-6">
            {navItems.map((item) => (
              <a
                key={item}
                href={getNavHref(item)}
                className="text-lg hover:text-indigo-300 transition-colors duration-300"
                onClick={(e) => {
                  if (item.toLowerCase() === 'home') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                  setIsMenuOpen(false);
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;