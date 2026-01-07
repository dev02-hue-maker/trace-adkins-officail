// components/TourCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Ticket, Crown } from "lucide-react";
import { TourEvent } from "@/types/tour";
import { motion } from "framer-motion";

interface TourCardProps {
  tour: TourEvent;
  index: number;
}

export default function TourCard({ tour, index }: TourCardProps) {
  const isUpcoming = tour.status === 'upcoming';
  const isPast = tour.status === 'past';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Venue Image */}
        <div className="relative h-48 w-full">
          <Image
            src={tour.venueImage}
            alt={tour.venue}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Status Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold ${
            isUpcoming 
              ? 'bg-green-100 text-green-800' 
              : isPast 
                ? 'bg-gray-100 text-gray-800' 
                : 'bg-red-100 text-red-800'
          }`}>
            {isUpcoming ? 'UPCOMING' : isPast ? 'PAST' : 'CANCELLED'}
          </div>

          {/* VIP Badge */}
          {tour.hasVip && isUpcoming && (
            <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <Crown size={14} />
              VIP
            </div>
          )}
        </div>

        {/* Tour Info */}
        <div className="p-6">
          {/* Date */}
          <div className="flex items-center gap-2 text-amber-600 mb-3">
            <Calendar size={18} />
            <span className="font-bold text-lg">{tour.formattedDate}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <MapPin size={18} />
            <span className="font-medium">{tour.location}</span>
          </div>

          {/* Venue */}
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300 mb-2">
            {tour.venue}
          </h3>

          {/* City & State */}
          <p className="text-gray-700 mb-6">
            {tour.city}, {tour.state}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {isUpcoming ? (
              <>
                <Link
                  href={tour.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors group/btn"
                >
                  <Ticket size={18} />
                  TICKETS
                </Link>
                
                {tour.hasVip && tour.vipLink && (
                  <Link
                    href={tour.vipLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors group/btn"
                  >
                    <Crown size={18} />
                    VIP
                  </Link>
                )}
              </>
            ) : (
              <div className="flex-1 text-center py-3 bg-gray-100 text-gray-500 rounded-lg font-semibold">
                {isPast ? 'EVENT ENDED' : 'CANCELLED'}
              </div>
            )}
          </div>

          {/* Quick Info */}
          <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
            {isUpcoming && tour.hasVip && (
              <div className="flex items-center justify-between">
                <span>VIP Packages Available</span>
                <Crown size={16} className="text-amber-500" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}