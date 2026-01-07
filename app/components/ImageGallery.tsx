// components/ImageGallery.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react';
import { BiographyImage } from '@/types/about';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageGalleryProps {
  images: BiographyImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<BiographyImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter images by category
  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  // Get all unique categories
  const categories = ['all', ...new Set(images.map(img => img.category))];

  const openLightbox = (image: BiographyImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredImages.length
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    
    setSelectedImage(filteredImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <>
      {/* Gallery Controls */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-amber-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All Photos' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
            onClick={() => openLightbox(image, index)}
          >
            {/* Image */}
            <div className="relative h-64 w-full">
              <Image
                src={image.url}
                alt={image.caption}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <Camera size={16} />
                    <span className="text-sm font-semibold">{image.year}</span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">{image.caption}</h4>
                  <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                    {image.category}
                  </span>
                </div>
              </div>

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 size={20} className="text-gray-800" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-6xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors"
              >
                <X size={24} />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors"
              >
                <ChevronRight size={24} />
              </button>

              {/* Image */}
              <div className="relative w-full h-[70vh]">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Caption */}
              <div className="mt-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-white">{selectedImage.caption}</h3>
                  <span className="px-4 py-1 bg-amber-500 text-white font-bold rounded-full">
                    {selectedImage.year}
                  </span>
                </div>
                <p className="text-gray-300">
                  Category: <span className="font-semibold text-white capitalize">{selectedImage.category}</span>
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                  <span>Image {currentIndex + 1} of {filteredImages.length}</span>
                  <span>•</span>
                  <span>Use arrow keys or buttons to navigate</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}