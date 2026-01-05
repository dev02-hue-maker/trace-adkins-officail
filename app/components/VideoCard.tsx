// components/VideoCard.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Eye, Calendar, Clock, Album, Film } from "lucide-react";
import { MusicVideo } from "@/types/video";
import { useState } from "react";

interface VideoCardProps {
  video: MusicVideo;
  index: number;
}

export default function VideoCard({ video, index }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  const handleVideoClick = () => {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Official Video':
        return 'bg-blue-100 text-blue-800';
      case 'Live Performance':
        return 'bg-green-100 text-green-800';
      case 'Lyric Video':
        return 'bg-purple-100 text-purple-800';
      case 'Behind the Scenes':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={handleVideoClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Video Thumbnail */}
        <div className="relative h-48 md:h-56 w-full">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Play Overlay */}
          <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping"></div>
              <div className="relative bg-amber-600 rounded-full p-4">
                <Play className="w-8 h-8 text-white" fill="white" />
              </div>
            </div>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm font-semibold">
            {video.duration}
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(video.category)}`}>
              {video.category}
            </span>
          </div>

          {/* Views Badge */}
          <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
            <Eye className="w-3 h-3 inline mr-1" />
            {video.views}
          </div>
        </div>

        {/* Video Info */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2 flex-1">
              {video.title}
            </h3>
            {video.featured && (
              <span className="ml-2 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded whitespace-nowrap">
                FEATURED
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {video.description}
          </p>

          {/* Video Metadata */}
          <div className="space-y-2 text-sm text-gray-500">
            {video.album && (
              <div className="flex items-center">
                <Album className="w-4 h-4 mr-2 shrink-0" />
                <span className="truncate">{video.album}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <Film className="w-4 h-4 mr-2 shrink-0" />
              <span className="truncate">Directed by {video.director}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 shrink-0" />
                <span>
                  {new Date(video.releaseDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 shrink-0" />
                <span>{video.duration}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleVideoClick();
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-white hover:bg-amber-600 px-4 py-2.5 rounded-lg transition-colors duration-300 font-semibold"
            >
              <Play className="w-4 h-4" />
              Watch on YouTube
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Add to playlist functionality
              }}
              className="p-2.5 border border-gray-300 text-gray-600 hover:border-amber-500 hover:text-amber-600 rounded-lg transition-colors duration-300"
              title="Add to playlist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}