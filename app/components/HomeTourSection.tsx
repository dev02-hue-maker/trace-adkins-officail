// components/HomeTourSection.tsx
"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import TourCard from './TourCard';
import { mockTours } from '@/data/mockTours';
import { Calendar, ChevronRight } from 'lucide-react';

export default function HomeTourSection() {
  const [showPastEvents, setShowPastEvents] = useState(false);

  // Filter upcoming tours and take first 4 for home page
  const upcomingTours = useMemo(() => {
    return mockTours
      .filter(tour => tour.status === 'upcoming')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 4);
  }, []);

  const pastTours = useMemo(() => {
    return mockTours
      .filter(tour => tour.status === 'past')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);
  }, []);

  const displayedTours = showPastEvents ? pastTours : upcomingTours;

  return (
    <section className="py-16 bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="text-amber-500" size={24} />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">TOUR DATES</h2>
            </div>
            <p className="text-gray-600 text-lg">
              Catch Trace Adkins live on tour
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowPastEvents(false)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                !showPastEvents
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              UPCOMING
            </button>
            <button
              onClick={() => setShowPastEvents(true)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                showPastEvents
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              PAST EVENTS
            </button>
            <Link
              href="/tour"
              className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors group"
            >
              ALL TOUR
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Tour Grid */}
        {displayedTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedTours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Calendar size={48} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No {showPastEvents ? 'past' : 'upcoming'} events scheduled
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Check back soon for new tour announcements!
            </p>
            {showPastEvents && (
              <button
                onClick={() => setShowPastEvents(false)}
                className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors"
              >
                View Upcoming Events
              </button>
            )}
          </div>
        )}

        {/* View All Button for Mobile */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/tour"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors group"
          >
            VIEW ALL TOUR DATES
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}