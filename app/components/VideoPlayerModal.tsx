// components/VideoPlayerModal.tsx
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Volume2 } from "lucide-react";
import { MusicVideo } from "@/types/video";

interface VideoPlayerModalProps {
  video: MusicVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoPlayerModal({ video, isOpen, onClose }: VideoPlayerModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!video) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-6xl bg-black rounded-2xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-linear-to-r from-gray-900 to-black border-b border-gray-800">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                </div>
                <h3 className="text-lg font-bold text-white truncate px-4">
                  {video.title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* YouTube Player */}
              <div className="relative pt-[56.25%] bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                />
              </div>

              {/* Video Info */}
              <div className="p-6 bg-linear-to-r from-gray-900 to-black">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white mb-2">
                      {video.title}
                    </h2>
                    <p className="text-gray-300 text-sm">
                      {video.description}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank')}
                      className="p-2 bg-gray-800 text-white hover:bg-gray-700 rounded-lg transition-colors"
                      title="Open in YouTube"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 bg-gray-800 text-white hover:bg-gray-700 rounded-lg transition-colors"
                      title="Volume"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Views</div>
                    <div className="text-white font-semibold">{video.views}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Duration</div>
                    <div className="text-white font-semibold">{video.duration}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Released</div>
                    <div className="text-white font-semibold">
                      {new Date(video.releaseDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Director</div>
                    <div className="text-white font-semibold">{video.director}</div>
                  </div>
                </div>

                {video.album && (
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="text-gray-400 text-sm">From Album</div>
                    <div className="text-white font-semibold">{video.album}</div>
                  </div>
                )}
              </div>

              {/* Controls Footer */}
              <div className="px-6 py-4 bg-black border-t border-gray-800">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <button
                      onClick={() => window.open(`https://www.youtube.com/watch?v=${video.youtubeId}&t=0s`, '_blank')}
                      className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg font-semibold transition-colors"
                    >
                      Open in YouTube
                    </button>
                    <button
                      onClick={() => {
                        // Share functionality
                        navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${video.youtubeId}`);
                        alert('Link copied to clipboard!');
                      }}
                      className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Copy Link
                    </button>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}