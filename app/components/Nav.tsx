"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, 
  FiShoppingCart, 
  FiMenu, 
  FiX,
  FiSearch,
  FiChevronDown
} from 'react-icons/fi';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube 
} from 'react-icons/fa';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNoticeVisible, setIsNoticeVisible] = useState(true);
  const { getTotalItems } = useCart();
  const cartItemsCount = getTotalItems();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { label: 'ABOUT', href: '/about', hasDropdown: false },
    { label: 'TOUR', href: '/tour', hasDropdown: false },
    { label: 'VIP', href: '/vip', hasDropdown: false },
    { label: 'NEWS', href: '/news', hasDropdown: false },
    { label: 'MUSIC', href: '/music', hasDropdown: false },
    { label: 'VIDEOS', href: '/videos', hasDropdown: false },
    { label: 'STORE', href: '/store', hasDropdown: false },
  ];

  const socialIcons = [
    { icon: FaFacebook, label: 'Facebook', href: 'https://facebook.com' },
    { icon: FaTwitter, label: 'Twitter', href: 'https://twitter.com' },
    { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: FaYoutube, label: 'YouTube', href: 'https://youtube.com' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}
    >
      {/* Top Notice Bar with Animation */}
      <AnimatePresence>
        {isNoticeVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-linear-to-r from-amber-100 to-amber-200 text-amber-900"
          >
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <div className="py-2 md:py-3 flex items-center justify-between">
                <p className="text-xs md:text-sm font-medium text-center flex-1">
                  All orders placed between Dec 19, 2025 and Jan 5, 2026 will begin shipping on Jan 6,
                  as we will be out for the holidays. Thank you for your patience!
                </p>
                <button
                  onClick={() => setIsNoticeVisible(false)}
                  className="ml-4 text-amber-700 hover:text-amber-900"
                  aria-label="Close notice"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation */}
      <nav className="relative">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 md:h-20 flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" passHref>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-wider text-gray-900 cursor-pointer"
              >
                TRACE ADKINS
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <motion.ul 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:flex items-center space-x-6 lg:space-x-8"
            >
              {navItems.map((item) => (
                <motion.li 
                  key={item.label}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="relative group"
                >
                  <Link 
                    href={item.href}
                    className="flex items-center text-sm lg:text-base font-medium tracking-wider text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <FiChevronDown className="ml-1 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>
                  
                  {/* Hover underline effect */}
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-0.5 bg-amber-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.li>
              ))}
            </motion.ul>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Search Icon */}
              <Link href="/search" passHref>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="hidden md:block text-gray-700 hover:text-gray-900"
                  aria-label="Search"
                >
                  <FiSearch size={20} />
                </motion.button>
              </Link>

              {/* User Icon */}
              <Link href="/account" passHref>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative text-gray-700 hover:text-gray-900"
                  aria-label="Account"
                >
                  <FiUser size={22} />
                </motion.button>
              </Link>

              {/* Cart Icon with Dynamic Badge */}
              <Link href="/cart" passHref>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative text-gray-700 hover:text-gray-900"
                  aria-label="Shopping Cart"
                >
                  <FiShoppingCart size={22} />
                  {cartItemsCount > 0 && (
                    <motion.span 
                      key={cartItemsCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                      {cartItemsCount > 9 ? '9+' : cartItemsCount}
                    </motion.span>
                  )}
                </motion.button>
              </Link>

              {/* Social Icons (Desktop only) */}
              <div className="hidden lg:flex items-center space-x-3 ml-4">
                {socialIcons.map((social) => (
                  <motion.a
                    key={social.label}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-amber-500"
                    aria-label={social.label}
                  >
                    <social.icon size={16} />
                  </motion.a>
                ))}
              </div>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-700 hover:text-gray-900"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Search Bar for Mobile */}
                <div className="relative mb-6">
                  <Link href="/search" passHref>
                    <div className="relative cursor-pointer">
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <div className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-400">
                        Search...
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Mobile Menu Items */}
                <motion.ul 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {navItems.map((item) => (
                    <motion.li
                      key={item.label}
                      variants={itemVariants}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link 
                        href={item.href}
                        className="w-full flex items-center justify-between text-lg font-medium text-gray-700 hover:text-gray-900 py-3 border-b border-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>{item.label}</span>
                        {item.hasDropdown && <FiChevronDown />}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Account & Cart Links for Mobile */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex space-x-4">
                    <Link href="/account" passHref>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center text-gray-700 hover:text-gray-900"
                      >
                        <FiUser className="mr-2" />
                        Account
                      </motion.button>
                    </Link>
                    <Link href="/cart" passHref>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center text-gray-700 hover:text-gray-900 relative"
                      >
                        <FiShoppingCart className="mr-2" />
                        Cart
                        {cartItemsCount > 0 && (
                          <span className="ml-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                            {cartItemsCount}
                          </span>
                        )}
                      </motion.button>
                    </Link>
                  </div>
                </div>

                {/* Social Icons for Mobile */}
                <div className="flex items-center justify-center space-x-6 mt-8 pt-6 border-t border-gray-100">
                  {socialIcons.map((social) => (
                    <motion.a
                      key={social.label}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-amber-500"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}