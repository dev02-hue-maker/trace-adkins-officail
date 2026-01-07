// components/Footer.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
 import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Phone, 
  Mail, 
  
  Music,
  ShoppingBag,
  Calendar,
  Heart
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter subscription
      console.log('Subscribed:', email);
      setEmail('');
      alert('Thanks for subscribing!');
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <Music className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-wider">TRACE ADKINS</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Official merchandise store and tour information for country music legend Trace Adkins.
              Authentic products, exclusive tour dates, and unforgettable experiences.
            </p>
            
            {/* Phone Number */}
            <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl">
              <div className="p-2 bg-amber-500 rounded-lg">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Customer Support</p>
                <a 
                  href="tel:+13864883394" 
                  className="text-lg font-bold hover:text-amber-400 transition-colors"
                >
                  +1 (386) 488-3394
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-3 border-b border-gray-800">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/store" 
                  className="flex items-center gap-3 text-gray-400 hover:text-amber-400 transition-colors group"
                >
                  <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Store</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/tour" 
                  className="flex items-center gap-3 text-gray-400 hover:text-amber-400 transition-colors group"
                >
                  <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Tour Dates</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/music" 
                  className="flex items-center gap-3 text-gray-400 hover:text-amber-400 transition-colors group"
                >
                  <Music className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Music</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="flex items-center gap-3 text-gray-400 hover:text-amber-400 transition-colors group"
                >
                  <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>About Trace</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-3 border-b border-gray-800">Shop Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/store/category/apparel" className="text-gray-400 hover:text-white transition-colors">
                  Apparel
                </Link>
              </li>
              <li>
                <Link href="/store/category/accessories" className="text-gray-400 hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/store/category/music" className="text-gray-400 hover:text-white transition-colors">
                  Music & Albums
                </Link>
              </li>
              <li>
                <Link href="/store/category/limited" className="text-gray-400 hover:text-white transition-colors">
                  Limited Edition
                </Link>
              </li>
              <li>
                <Link href="/store/category/sale" className="text-gray-400 hover:text-white transition-colors">
                  On Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-3 border-b border-gray-800">Connect With Us</h3>
            <p className="text-gray-400 mb-6">
              Follow Trace Adkins for the latest news, music, and tour updates.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mb-8">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-xl hover:bg-amber-500 hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-xl hover:bg-blue-400 hover:scale-110 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-xl hover:bg-pink-600 hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-xl hover:bg-red-600 hover:scale-110 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4">Stay Updated</h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} Trace Adkins. All rights reserved.</p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/shipping" className="text-gray-400 hover:text-white text-sm transition-colors">
                Shipping Policy
              </Link>
              <Link href="/returns" className="text-gray-400 hover:text-white text-sm transition-colors">
                Returns & Refunds
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                Contact
              </Link>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-500 mr-3">Secure Payment:</div>
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">VISA</span>
                </div>
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">MC</span>
                </div>
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">AMEX</span>
                </div>
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">PP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 text-center text-gray-600 text-xs max-w-3xl mx-auto">
            <p>
              This is an unofficial fan merchandise store. Trace Adkins, his management, and record label 
              are not affiliated with this website. All products are fan-made tributes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}