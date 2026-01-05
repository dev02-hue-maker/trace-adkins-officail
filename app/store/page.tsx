/* eslint-disable @typescript-eslint/no-explicit-any */
// app/store/page.tsx
"use client";

import { useState, useMemo } from "react";
 
 
import { ShoppingBag, Filter, Search, Star, TrendingUp, Tag } from "lucide-react";
import { categories, mockProducts } from "@/types/mockProducts";
import ProductCard from "../components/ProductCard";

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState('featured');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.includes(activeCategory) || 
        (activeCategory === 'sale' && product.originalPrice)
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort products
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return b.id.localeCompare(a.id); // Using ID as proxy for newness
        case 'featured':
        default:
          // Featured products first, then by category match
          const aIsFeatured = a.category.includes('featured');
          const bIsFeatured = b.category.includes('featured');
          if (aIsFeatured && !bIsFeatured) return -1;
          if (!aIsFeatured && bIsFeatured) return 1;
          return 0;
      }
    });
  }, [activeCategory, sortBy, searchQuery]);

  const featuredProducts = mockProducts.filter(p => p.category.includes('featured'));
  const saleProducts = mockProducts.filter(p => p.originalPrice);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-amber-900 to-amber-700 text-white py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Official <span className="text-amber-300">Store</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Exclusive Trace Adkins merchandise, apparel, music, and collectibles
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Store Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Products', value: mockProducts.length, icon: ShoppingBag, color: 'bg-amber-100 text-amber-600' },
            { label: 'Categories', value: categories.length, icon: Tag, color: 'bg-blue-100 text-blue-600' },
            { label: 'On Sale', value: saleProducts.length, icon: TrendingUp, color: 'bg-green-100 text-green-600' },
            { label: 'Featured Items', value: featuredProducts.length, icon: Star, color: 'bg-purple-100 text-purple-600' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-xl mr-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Sort by: Price: Low to High</option>
                <option value="price-high">Sort by: Price: High to Low</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="overflow-x-auto">
            <div className="flex space-x-2 pb-4">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Products
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  {category.id === 'sale' && (
                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      {saleProducts.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <>
            {/* Active Category Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {activeCategory === 'all' 
                    ? 'All Products' 
                    : categories.find(c => c.id === activeCategory)?.name}
                </h2>
                <p className="text-gray-600 mt-2">
                  {activeCategory === 'all' 
                    ? `Showing ${filteredProducts.length} products` 
                    : categories.find(c => c.id === activeCategory)?.description}
                </p>
              </div>
              <div className="text-gray-600">
                {filteredProducts.length} items
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-semibold transition-colors duration-300"
            >
              View All Products
            </button>
          </div>
        )}

        {/* Featured Products Banner */}
        {activeCategory === 'all' && (
          <div className="mt-16 bg-linear-to-r from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Can&apos;t decide? Start with our featured items
                </h3>
                <p className="text-gray-600 max-w-2xl">
                  These fan favorites combine quality, style, and that authentic Trace Adkins spirit.
                </p>
              </div>
              <button
                onClick={() => setActiveCategory('featured')}
                className="mt-6 md:mt-0 px-8 py-3 bg-amber-500 text-white hover:bg-amber-600 rounded-xl font-bold transition-colors duration-300 inline-flex items-center"
              >
                <Star className="w-5 h-5 mr-2" />
                View Featured
              </button>
            </div>
          </div>
        )}

        {/* Store Policies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              title: 'Free Shipping',
              description: 'Free standard shipping on orders over $75',
              icon: '🚚',
              color: 'bg-blue-100 text-blue-600'
            },
            {
              title: 'Easy Returns',
              description: '30-day return policy on all items',
              icon: '🔄',
              color: 'bg-green-100 text-green-600'
            },
            {
              title: 'Secure Payment',
              description: '100% secure payment processing',
              icon: '🔒',
              color: 'bg-purple-100 text-purple-600'
            },
          ].map((policy, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start">
                <div className={`text-2xl p-3 rounded-lg mr-4 ${policy.color}`}>
                  {policy.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{policy.title}</h4>
                  <p className="text-gray-600 text-sm">{policy.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}