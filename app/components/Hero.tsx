"use client";
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FiMusic, FiPlayCircle, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { TypeAnimation } from 'react-type-animation';

// Mock data for albums/songs
const mockAlbums = [
  {
    id: 1,
    title: "The Way I Wanna Go",
    artist: "Trace Adkins",
    year: 2023,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop",
    description: "A powerful collection of stories set to music, showcasing Trace's rich baritone voice.",
    tracks: 12,
    genre: "Country"
  },
  {
    id: 2,
    title: "Something's Going On",
    artist: "Trace Adkins",
    year: 2022,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop",
    description: "Raw emotion and authentic storytelling in this critically acclaimed album.",
    tracks: 10,
    genre: "Country Rock"
  },
  {
    id: 3,
    title: "Love Will...",
    artist: "Trace Adkins",
    year: 2021,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop",
    description: "An exploration of love in all its forms through heartfelt lyrics and melodies.",
    tracks: 14,
    genre: "Country Ballads"
  }
];

const upcomingTours = [
  { id: 1, city: "Nashville, TN", date: "Feb 15, 2024", venue: "Grand Ole Opry" },
  { id: 2, city: "Austin, TX", date: "Mar 2, 2024", venue: "ACL Live" },
  { id: 3, city: "Denver, CO", date: "Mar 18, 2024", venue: "Red Rocks" },
  { id: 4, city: "Los Angeles, CA", date: "Apr 5, 2024", venue: "Hollywood Bowl" }
];

// Generate particle positions once outside the component
const generateParticlePositions = (count: number) => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2,
  }));
};

export default function Hero() {
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTourDates, setShowTourDates] = useState(false);
  const [direction, setDirection] = useState(1);

  // Generate particle positions once using useMemo
  const particlePositions = useMemo(() => generateParticlePositions(20), []);

  // Auto-rotate albums
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentAlbumIndex((prev) => (prev + 1) % mockAlbums.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentAlbum = mockAlbums[currentAlbumIndex];

  const nextAlbum = () => {
    setDirection(1);
    setCurrentAlbumIndex((prev) => (prev + 1) % mockAlbums.length);
  };

  const prevAlbum = () => {
    setDirection(-1);
    setCurrentAlbumIndex((prev) => (prev - 1 + mockAlbums.length) % mockAlbums.length);
  };

  // Variants definitions with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  };
  
  const albumVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 1, 1] as [number, number, number, number]
      }
    })
  };

  const tourCardVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const statsBarVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        duration: 0.6
      }
    }
  };

  return (
    <section className="relative w-full min-h-screen md:h-[90vh] overflow-hidden bg-linear-to-b from-gray-900 to-black">
      
      {/* Background with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: `url('${currentAlbum.image}')`,
            backgroundBlendMode: 'overlay'
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-l from-black/40 to-transparent" />
        </motion.div>

        {/* Animated Particles - Fixed to use pre-generated positions */}
        <div className="absolute inset-0">
          {particlePositions.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-500/30 rounded-full"
              initial={{
                x: `${particle.x}vw`,
                y: `${particle.y}vh`
              }}
              animate={{
                y: ['0vh', '-20vh'],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-8 md:py-16 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-[80vh]">
          
          {/* Left Column - Album Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-white space-y-6 md:space-y-8"
          >
            {/* Tagline with Typing Effect */}
            <motion.div variants={itemVariants} className="space-y-2">
              <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-sm rounded-full border border-amber-500/30">
                NEW RELEASE
              </span>
              <div className="h-12 md:h-16">
                <TypeAnimation
                  sequence={[
                    'Experience the soul of country music',
                    2000,
                    'Feel the power of authentic storytelling',
                    2000,
                    'Listen to award-winning melodies',
                    2000,
                  ]}
                  wrapper="h2"
                  speed={50}
                  repeat={Infinity}
                  className="text-2xl md:text-4xl lg:text-5xl font-bold font-serif leading-tight"
                />
              </div>
            </motion.div>

            {/* Album Info */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif tracking-tight">
                {currentAlbum.title}
              </h1>
              <div className="flex items-center space-x-4 text-xl text-gray-300">
                <FiMusic className="text-amber-500" />
                <span>{currentAlbum.tracks} Tracks</span>
                <span className="text-gray-500">•</span>
                <span>{currentAlbum.genre}</span>
                <span className="text-gray-500">•</span>
                <span>{currentAlbum.year}</span>
              </div>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                {currentAlbum.description}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-8 py-3 bg-amber-500 text-black font-bold rounded-full flex items-center space-x-3 hover:bg-amber-400 transition-all shadow-lg"
              >
                <FiPlayCircle size={24} />
                <span>{isPlaying ? 'PAUSE TRACK' : 'PLAY NOW'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-transparent text-white border-2 border-white/30 rounded-full flex items-center space-x-3 hover:bg-white/10 transition-all"
              >
                <span>VIEW ALL ALBUMS</span>
                <FiArrowRight />
              </motion.button>
            </motion.div>

            {/* Album Navigation Dots */}
            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {mockAlbums.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentAlbumIndex ? 1 : -1);
                      setCurrentAlbumIndex(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${index === currentAlbumIndex ? 'bg-amber-500 w-8' : 'bg-white/30 hover:bg-white/50'}`}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm">
                {currentAlbumIndex + 1} / {mockAlbums.length}
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column - Album Art & Tour Dates */}
          <div className="relative">
            {/* Album Art with Navigation */}
            <div className="relative max-w-lg mx-auto lg:mx-0 lg:ml-auto">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentAlbumIndex}
                  custom={direction}
                  variants={albumVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative"
                >
                  <motion.img
                    src={currentAlbum.image}
                    alt={currentAlbum.title}
                    className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute -top-4 -right-4 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: [0, 0, 1, 1] as [number, number, number, number]
                    }}
                  >
                    <FiMusic className="text-black" />
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevAlbum}
                  className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70"
                >
                  <FiChevronLeft size={24} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextAlbum}
                  className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70"
                >
                  <FiChevronRight size={24} />
                </motion.button>
              </div>
            </div>

            {/* Tour Dates Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTourDates(!showTourDates)}
              className="absolute bottom-0 right-0 md:bottom-4 md:right-4 px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-black/70 transition-all"
            >
              {showTourDates ? 'HIDE TOUR DATES' : 'UPCOMING TOURS'}
            </motion.button>

            {/* Tour Dates Panel */}
            <AnimatePresence>
              {showTourDates && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-16 right-0 w-full max-w-md bg-black/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/10"
                >
                  <h3 className="text-xl font-bold mb-4 text-white">Upcoming Tour Dates</h3>
                  <div className="space-y-3">
                    {upcomingTours.map((tour, index) => (
                      <motion.div
                        key={tour.id}
                        custom={index}
                        variants={tourCardVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                        whileHover={{ x: 5 }}
                      >
                        <div>
                          <h4 className="font-bold text-white">{tour.city}</h4>
                          <p className="text-sm text-gray-400">{tour.venue}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-amber-500 font-bold">{tour.date}</p>
                          <button className="text-sm text-white hover:text-amber-500 transition">
                            GET TICKETS →
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          variants={statsBarVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10"
        >
          {[
            { label: 'Albums', value: '24+', desc: 'Released' },
            { label: 'Awards', value: '15+', desc: 'Grammy Nominated' },
            { label: 'Tours', value: '200+', desc: 'Worldwide Shows' },
            { label: 'Years', value: '30+', desc: 'In Music Industry' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -5 }}
              className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm"
            >
              <div className="text-3xl md:text-4xl font-bold text-amber-500">{stat.value}</div>
              <div className="text-lg font-medium text-white">{stat.label}</div>
              <div className="text-sm text-gray-400">{stat.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}