/* eslint-disable @typescript-eslint/no-explicit-any */
// components/AlbumCard.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Music, ExternalLink } from "lucide-react";
import { Album } from "@/types/music";

interface AlbumCardProps {
  album: Album;
  index: number;
}

export default function AlbumCard({ album, index }: AlbumCardProps) {
  const handleAlbumClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const appleMusicUrl = (album as any).appleMusicUrl || (album as any).appleMusic || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => handleAlbumClick(album.spotifyUrl)}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Album Cover */}
        <div className="relative h-64 w-full">
          <Image
            src={album.coverImage}
            alt={album.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Play className="w-8 h-8 text-white" fill="white" />
            </div>
          </div>

          {/* Album Year Badge */}
          <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {album.year}
          </div>
        </div>

        {/* Album Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300 line-clamp-1">
                {album.title}
              </h3>
              <p className="text-gray-600 mt-1">{album.artist}</p>
            </div>
            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors duration-300" />
          </div>

          {/* Album Details */}
          <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t">
            <div className="flex items-center">
              <Music className="w-4 h-4 mr-1" />
              <span>{album.tracks} tracks</span>
            </div>
            <span>{album.duration}</span>
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {album.genre.split(', ').map((genre, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex gap-4 mt-6 pt-6 border-t">
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(album.spotifyUrl, '_blank', 'noopener,noreferrer');
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-green-50 text-green-700 hover:bg-green-100 px-3 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Spotify
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(appleMusicUrl, '_blank', 'noopener,noreferrer');
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-pink-50 text-pink-700 hover:bg-pink-100 px-3 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.31-2.33 1.05-3.11z"/>
              </svg>
              Apple Music
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}