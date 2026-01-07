// app/components/ProductGrid.tsx
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { Filter, SortAsc, Grid, List, Search, X, ChevronDown, ChevronUp } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'newest';
type FilterOption = 'all' | 'in-stock' | 'sale' | 'featured';

export default function ProductGrid({ products }: ProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate price range from products
  const maxPrice = useMemo(() => {
    if (products.length === 0) return 1000;
    return Math.ceil(Math.max(...products.map(p => p.originalPrice ?? p.price)));
  }, [products]);

  const [priceRange, setPriceRange] = useState<[number, number]>(() => [0, maxPrice]);

  // Extract all unique categories
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    products.forEach(product => {
      if (Array.isArray(product.category)) {
        product.category.forEach(cat => categories.add(cat));
      } else {
        categories.add(product.category);
      }
    });
    return Array.from(categories).sort();
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => {
        if (product.title && product.title.toLowerCase().includes(query)) return true;
        if (product.description && product.description.toLowerCase().includes(query)) return true;

        const category = product.category;
        if (Array.isArray(category)) {
          return category.some(cat => String(cat).toLowerCase().includes(query));
        }

        if (typeof category === 'string' || typeof category === 'number') {
          return String(category).toLowerCase().includes(query);
        }

        return false;
      });
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => {
        const productCategories = Array.isArray(product.category) 
          ? product.category 
          : [product.category];
        return selectedCategories.some(selectedCat => 
          productCategories.includes(selectedCat)
        );
      });
    }

    // Apply price range filter
    filtered = filtered.filter(product => {
      const price = product.originalPrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply special filters
    switch (filterBy) {
      case 'in-stock':
        filtered = filtered.filter(product => product.inStock);
        break;
      case 'sale':
        filtered = filtered.filter(product => product.originalPrice !== undefined);
        break;
      case 'featured':
        filtered = filtered.filter(product => product.category.includes('featured'));
        break;
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => (a.originalPrice || a.price) - (b.originalPrice || b.price));
        break;
      case 'price-desc':
        sorted.sort((a, b) => (b.originalPrice || b.price) - (a.originalPrice || a.price));
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        sorted.sort((a, b) => {
          const aIsFeatured = a.category.includes('featured');
          const bIsFeatured = b.category.includes('featured');
          if (aIsFeatured && !bIsFeatured) return -1;
          if (!aIsFeatured && bIsFeatured) return 1;
          return 0;
        });
    }

    return sorted;
  }, [products, sortBy, filterBy, searchQuery, selectedCategories, priceRange]);

  // Stats for display
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const inStockProducts = products.filter(p => p.inStock).length;
    const saleProducts = products.filter(p => p.originalPrice !== undefined).length;
    const featuredProducts = products.filter(p => p.category.includes('featured')).length;
    const filteredCount = filteredAndSortedProducts.length;

    return { totalProducts, inStockProducts, saleProducts, featuredProducts, filteredCount };
  }, [products, filteredAndSortedProducts]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setFilterBy('all');
    setPriceRange([0, maxPrice]);
  };

  // Determine grid columns based on screen size and view mode
  const getGridColumns = () => {
    if (viewMode === 'list') return 'grid-cols-1';
    
    if (isMobile) {
      return 'grid-cols-1';
    } else {
      return 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Our Premium Collection
          </h1>
          <p className="text-base sm:text-lg md:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl">
            Discover handpicked items at unbeatable prices. Quality meets affordability.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-10 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between px-4 sm:px-6 py-3 bg-white rounded-xl shadow-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Filter size={20} />
                <span>{isFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
                <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs sm:text-sm">
                  {stats.filteredCount}
                </span>
              </div>
              {isFilterOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className={`
            ${isFilterOpen ? 'block' : 'hidden'} lg:block
            w-full lg:w-64 xl:w-72 shrink-0
          `}>
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Filters</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  Clear all
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6 sm:mb-8">
                <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4">Price Range</h3>
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                    <span>${priceRange[0].toFixed(2)}</span>
                    <span>${priceRange[1].toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6 sm:mb-8">
                <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4">Categories</h3>
                <div className="space-y-1 sm:space-y-2 max-h-48 sm:max-h-64 overflow-y-auto pr-2">
                  {allCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryToggle(category)}
                      className={`
                        w-full text-left px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base
                        ${selectedCategories.includes(category)
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'hover:bg-gray-50 text-gray-700'
                        }
                      `}
                    >
                      <div className="flex justify-between items-center">
                        <span className="truncate">{category}</span>
                        {selectedCategories.includes(category) && (
                          <X size={16} className="text-amber-600 flex-shrink-0 ml-2" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Filters */}
              <div className="mb-6 sm:mb-8">
                <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4">Quick Filters</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFilterBy('all')}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm ${
                      filterBy === 'all' 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All ({stats.totalProducts})
                  </button>
                  <button
                    onClick={() => setFilterBy('in-stock')}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm ${
                      filterBy === 'in-stock'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    In Stock ({stats.inStockProducts})
                  </button>
                  <button
                    onClick={() => setFilterBy('sale')}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm ${
                      filterBy === 'sale'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    On Sale ({stats.saleProducts})
                  </button>
                  <button
                    onClick={() => setFilterBy('featured')}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm ${
                      filterBy === 'featured'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Featured ({stats.featuredProducts})
                  </button>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategories.length > 0 || searchQuery || filterBy !== 'all' || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <div className="pt-4 sm:pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3">Active Filters</h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                        Search: &apos;{searchQuery}&apos;
                        <button onClick={() => setSearchQuery('')} className="ml-1">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    {selectedCategories.map(cat => (
                      <span key={cat} className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                        {cat.length > 12 ? `${cat.substring(0, 12)}...` : cat}
                        <button onClick={() => handleCategoryToggle(cat)} className="ml-1">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    {priceRange[0] > 0 && (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                        Min: ${priceRange[0]}
                        <button onClick={() => setPriceRange([0, priceRange[1]])} className="ml-1">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    {priceRange[1] < maxPrice && (
                      <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                        Max: ${priceRange[1]}
                        <button onClick={() => setPriceRange([priceRange[0], maxPrice])} className="ml-1">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0"> {/* min-w-0 prevents flex overflow */}
            {/* Controls Bar */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* Results Count */}
                <div className="text-gray-700 text-sm sm:text-base">
                  Showing <span className="font-bold">{stats.filteredCount}</span> of{' '}
                  <span className="font-bold">{stats.totalProducts}</span> products
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <SortAsc className="text-gray-500 hidden sm:block" size={20} />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
                    >
                      <option value="default">Sort by</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name-asc">Name: A to Z</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>

                  {/* View Toggle */}
                  <div className="flex bg-gray-100 p-1 rounded-lg self-end sm:self-auto">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                      aria-label="Grid view"
                    >
                      <Grid size={18} className={viewMode === 'grid' ? 'text-amber-600' : 'text-gray-500'} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                      aria-label="List view"
                    >
                      <List size={18} className={viewMode === 'list' ? 'text-amber-600' : 'text-gray-500'} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12 sm:py-20 bg-white rounded-xl sm:rounded-2xl shadow-lg">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto px-4 text-sm sm:text-base">
                  Try adjusting your search or filter criteria to find what you&apos;re looking for.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-amber-500 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-amber-600 transition-colors text-sm sm:text-base"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={`grid ${getGridColumns()} gap-4 sm:gap-6`}>
                {filteredAndSortedProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={index}
                    // viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredAndSortedProducts.length > 0 && (
              <div className="mt-8 sm:mt-12 flex justify-center">
                <nav className="flex flex-wrap items-center justify-center gap-2">
                  <button className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 font-medium text-sm sm:text-base">
                    ← Previous
                  </button>
                  <button className="px-3 sm:px-4 py-2 sm:py-3 bg-amber-500 text-white rounded-lg sm:rounded-xl font-medium text-sm sm:text-base">
                    1
                  </button>
                  <button className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 font-medium text-sm sm:text-base">
                    2
                  </button>
                  <button className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 font-medium text-sm sm:text-base">
                    3
                  </button>
                  <button className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 font-medium text-sm sm:text-base">
                    Next →
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}