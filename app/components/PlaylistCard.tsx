// components/PlaylistCard.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ListMusic, Clock } from "lucide-react";
import { VideoPlaylist } from "@/types/video";

interface PlaylistCardProps {
  playlist: VideoPlaylist;
  index: number;
  onClick: () => void;
}

export default function PlaylistCard({ playlist, index, onClick }: PlaylistCardProps) {
  const totalDuration = playlist.videos.reduce((total, video) => {
    const [minutes, seconds] = video.duration.split(':').map(Number);
    return total + minutes * 60 + seconds;
  }, 0);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700">
        {/* Playlist Thumbnail Grid */}
        <div className="relative h-48 bg-gray-900 grid grid-cols-2 grid-rows-2 gap-1 p-1">
          {playlist.videos.slice(0, 4).map((video, idx) => (
            <div key={idx} className="relative overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
          
          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-amber-500 rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 text-white" fill="white" />
            </div>
          </div>
        </div>

        {/* Playlist Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300 mb-2">
                {playlist.title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2">
                {playlist.description}
              </p>
            </div>
            <ListMusic className="w-6 h-6 text-amber-500" />
          </div>

          {/* Playlist Stats */}
          <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-700">
            <div className="flex items-center">
              <Play className="w-4 h-4 mr-2" />
              <span>{playlist.videos.length} videos</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{formatDuration(totalDuration)}</span>
            </div>
          </div>

          {/* View Playlist Button */}
          <button className="w-full mt-6 py-3 bg-gray-700 text-white hover:bg-amber-600 rounded-lg font-semibold transition-colors duration-300">
            View Playlist
          </button>
        </div>
      </div>
    </motion.div>
  );
}