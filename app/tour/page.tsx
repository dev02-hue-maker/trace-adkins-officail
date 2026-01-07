// app/tour/page.tsx
"use client";

import { useState, useMemo } from 'react';
 
import { mockTours } from '@/data/mockTours';
import {   Filter, Search, X } from 'lucide-react';
import TourCard from '../components/TourCard';

type TourStatus = 'all' | 'upcoming' | 'past';
type TourSort = 'date-asc' | 'date-desc' | 'location';

export default function TourPage() {
  const [statusFilter, setStatusFilter] = useState<TourStatus>('upcoming');
  const [sortBy, setSortBy] = useState<TourSort>('date-asc');
  const [locationSearch, setLocationSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get all unique states for filtering
  const allStates = useMemo(() => {
    const states = new Set<string>();
    mockTours.forEach(tour => states.add(tour.state));
    return Array.from(states).sort();
  }, []);

  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  // Filter and sort tours
  const filteredAndSortedTours = useMemo(() => {
    let filtered = [...mockTours];

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(tour => tour.status === statusFilter);
    }

    // Apply location search
    if (locationSearch.trim()) {
      const query = locationSearch.toLowerCase().trim();
      filtered = filtered.filter(tour =>
        tour.city.toLowerCase().includes(query) ||
        tour.state.toLowerCase().includes(query) ||
        tour.venue.toLowerCase().includes(query) ||
        tour.location.toLowerCase().includes(query)
      );
    }

    // Apply state filter
    if (selectedStates.length > 0) {
      filtered = filtered.filter(tour => selectedStates.includes(tour.state));
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case 'date-asc':
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'date-desc':
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'location':
        sorted.sort((a, b) => a.location.localeCompare(b.location));
        break;
    }

    return sorted;
  }, [statusFilter, sortBy, locationSearch, selectedStates]);

  const handleStateToggle = (state: string) => {
    setSelectedStates(prev =>
      prev.includes(state)
        ? prev.filter(s => s !== state)
        : [...prev, state]
    );
  };

  const clearAllFilters = () => {
    setStatusFilter('upcoming');
    setLocationSearch('');
    setSelectedStates([]);
    setSortBy('date-asc');
  };

  // Stats
  const stats = {
    total: mockTours.length,
    upcoming: mockTours.filter(t => t.status === 'upcoming').length,
    past: mockTours.filter(t => t.status === 'past').length,
    filtered: filteredAndSortedTours.length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">TOUR DATES</h1>
          <p className="text-xl opacity-90 mb-8 max-w-2xl">
            Experience Trace Adkins live in concert. Find a show near you and get your tickets today.
          </p>
          
          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by city, state, or venue..."
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              className="w-full pl-12 pr-10 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            {locationSearch && (
              <button
                onClick={() => setLocationSearch('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-xl shadow-lg font-semibold hover:bg-gray-50"
            >
              <Filter size={20} />
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
              <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-sm">
                {stats.filtered}
              </span>
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className={`
            lg:block lg:w-64 shrink-0
            ${isFilterOpen ? 'block' : 'hidden'}
          `}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  Clear all
                </button>
              </div>

              {/* Status Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Status</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setStatusFilter('upcoming')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      statusFilter === 'upcoming'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>Upcoming Events</span>
                      <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs">
                        {stats.upcoming}
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => setStatusFilter('past')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      statusFilter === 'past'
                        ? 'bg-gray-100 text-gray-900 border border-gray-300'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>Past Events</span>
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {stats.past}
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      statusFilter === 'all'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>All Events</span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                        {stats.total}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* States Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">States</h3>
                <div className="space-y-2">
                  {allStates.map(state => (
                    <button
                      key={state}
                      onClick={() => handleStateToggle(state)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedStates.includes(state)
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{state}</span>
                        {selectedStates.includes(state) && (
                          <X size={16} className="text-green-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {(selectedStates.length > 0 || locationSearch || statusFilter !== 'upcoming') && (
                <div className="pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-3">Active Filters</h3>
                  <div className="flex flex-wrap gap-2">
                    {locationSearch && (
                      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        Search: &apos;{locationSearch}&apos;
                        <button onClick={() => setLocationSearch('')} className="ml-1">
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    {selectedStates.map(state => (
                      <span key={state} className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {state}
                        <button onClick={() => handleStateToggle(state)} className="ml-1">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    {statusFilter !== 'upcoming' && (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
                        {statusFilter === 'past' ? 'Past Events' : 'All Events'}
                        <button onClick={() => setStatusFilter('upcoming')} className="ml-1">
                          <X size={14} />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Results Count */}
                <div className="text-gray-700">
                  Showing <span className="font-bold">{stats.filtered}</span> of{' '}
                  <span className="font-bold">{stats.total}</span> events
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as TourSort)}
                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="date-asc">Sort by: Date (Ascending)</option>
                    <option value="date-desc">Sort by: Date (Descending)</option>
                    <option value="location">Sort by: Location</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tour Grid */}
            {filteredAndSortedTours.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search size={48} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No events found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Try adjusting your search or filter criteria to find what you&apos;re looking for.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedTours.map((tour, index) => (
                  <TourCard key={tour.id} tour={tour} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}