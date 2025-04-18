import React, { useEffect, useRef } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/favicon_io/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active link style
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? '#4f46e5' : '#4b5563',
    borderBottom: isActive ? '2px solid #4f46e5' : 'none',
  });

  return (
    <nav 
      ref={navRef}
      className={`bg-white/90 backdrop-blur-sm fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md py-3' : 'shadow-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            aria-label="Home"
        >
            {/* Icône avec animation et effet de lumière */}
            <div className="relative">
              <img src={logo} alt="Narnia Center Logo" className="h-8 w-8 transition-transform group-hover:rotate-12 duration-300 ease-in-out drop-shadow-lg" />
            </div>

            {/* Texte avec dégradé, animation et typographie distinctive */}
            <div className="flex flex-col items-start">
                <span className="text-xl font-serif font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-purple-700 transition-colors duration-300 ease-in-out">
                    Narnia Center
                </span>
                {/* Slogan visible sur les grands écrans */}
                <p className="hidden md:block text-sm text-gray-500 mt-1 transition-opacity duration-300 ease-in-out group-hover:opacity-80">
                    Building Community
                </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['about','activities', 'events', 'mission', 'schedule','blog','contact'].map((path) => (
              <NavLink
                key={path}
                to={`/${path}`}
                style={navLinkStyle}
                className="pb-1 px-1 font-medium hover:text-indigo-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-300"
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </NavLink>
            ))}
            <Link
              to="/login"
              className="ml-4 flex items-center space-x-2 bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-indigo-200"
            >
              <User size={18} />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-4 space-y-2 bg-white/95 backdrop-blur-sm">
            {['about','activities', 'events', 'mission', 'schedule','gallery','blog', 'donate','faq','contact'].map((path) => (
              <NavLink
                key={path}
                to={`/${path}`}
                style={navLinkStyle}
                className="block px-4 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </NavLink>
            ))}
            <Link
              to="/login"
              className="block mx-4 mt-4 px-4 py-3 text-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}