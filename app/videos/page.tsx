// app/videos/page.tsx
"use client";

import { useState, useMemo } from "react";
 
import { MusicVideo } from "@/types/video";
import { Play, Filter, Search, TrendingUp, Clock, Flame, Calendar, Eye } from "lucide-react";
import { mockVideos, videoPlaylists } from "@/types/mockVideos";
import VideoCard from "../components/VideoCard";
import VideoPlayerModal from "../components/VideoPlayerModal";

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<MusicVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'title'>('date');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Official Video', 'Live Performance', 'Lyric Video', 'Behind the Scenes'];

  const handleVideoClick = (video: MusicVideo) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const filteredAndSortedVideos = useMemo(() => {
    let filtered = mockVideos;

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(video => video.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (video.album && video.album.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort videos
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case 'views':
          const viewsA = parseFloat(a.views.replace('M', '')) * (a.views.includes('M') ? 1000000 : 1);
          const viewsB = parseFloat(b.views.replace('M', '')) * (b.views.includes('M') ? 1000000 : 1);
          return viewsB - viewsA;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [activeCategory, sortBy, searchQuery]);

  const featuredVideos = mockVideos.filter(v => v.featured);
  const totalViews = mockVideos.reduce((sum, video) => {
    const views = parseFloat(video.views.replace('M', '')) * (video.views.includes('M') ? 1000000 : 1);
    return sum + views;
  }, 0);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-amber-900 via-black to-amber-900 py-20">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500 rounded-full mb-6 animate-pulse">
              <Play className="w-10 h-10" fill="white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-amber-400">TRACE ADKINS</span> <span className="text-white">VIDEOS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Official music videos, live performances, behind the scenes, and exclusive content
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-amber-400 font-bold">{mockVideos.length}+</span> Videos
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-amber-400 font-bold">{(totalViews / 1000000).toFixed(0)}M+</span> Views
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-amber-400 font-bold">4</span> Categories
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search videos by title, album, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="date">Sort by: Newest</option>
                <option value="views">Sort by: Most Views</option>
                <option value="title">Sort by: Title</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
                {category !== 'All' && (
                  <span className="ml-2 text-xs bg-black/30 px-2 py-1 rounded">
                    {mockVideos.filter(v => v.category === category).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Videos */}
        {featuredVideos.length > 0 && activeCategory === 'All' && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Flame className="w-6 h-6 text-amber-500 mr-3" />
                <h2 className="text-3xl font-bold">Featured Videos</h2>
              </div>
              <div className="text-amber-400 font-semibold">
                <TrendingUp className="w-5 h-5 inline mr-2" />
                Most Popular
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredVideos.map((video, index) => (
                <div key={video.id} onClick={() => handleVideoClick(video)}>
                  <VideoCard video={video} index={index} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Video Playlists */}
        {videoPlaylists.length > 0 && activeCategory === 'All' && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Play className="w-6 h-6 text-amber-500 mr-3" />
                <h2 className="text-3xl font-bold">Video Playlists</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videoPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="relative group cursor-pointer"
                  onClick={() => {
                    // Handle playlist click - could open playlist modal or filter by these videos
                    setActiveCategory('All');
                  }}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-amber-500/20 to-transparent rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative bg-gray-800 rounded-2xl p-6 border border-gray-700 group-hover:border-amber-500 transition-colors duration-300">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300">
                      {playlist.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{playlist.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 text-sm font-semibold">
                        {playlist.videos.length} videos
                      </span>
                      <Play className="w-5 h-5 text-gray-400 group-hover:text-amber-400 transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Videos */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-amber-500 mr-3" />
              <h2 className="text-3xl font-bold">
                {activeCategory === 'All' ? 'All Videos' : activeCategory}
                <span className="text-gray-400 text-lg ml-3">
                  ({filteredAndSortedVideos.length} videos)
                </span>
              </h2>
            </div>
          </div>

          {filteredAndSortedVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedVideos.map((video, index) => (
                <div key={video.id} onClick={() => handleVideoClick(video)}>
                  <VideoCard video={video} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-800/50 rounded-2xl">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No videos found</h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </section>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Videos', value: mockVideos.length, icon: Play, color: 'text-amber-400' },
            { label: 'Total Views', value: `${(totalViews / 1000000).toFixed(1)}M`, icon: Eye, color: 'text-green-400' },
            { label: 'Years Covered', value: '25+', icon: Calendar, color: 'text-blue-400' },
            { label: 'Categories', value: categories.length - 1, icon: Filter, color: 'text-purple-400' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-800 rounded-2xl p-6">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-xl bg-black/30 mr-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* YouTube Channel CTA */}
        <div className="mt-16 bg-linear-to-r from-red-900/30 to-black rounded-2xl p-8 md:p-12 border border-red-900/50">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">Subscribe on YouTube</h3>
              <p className="text-gray-300 max-w-2xl">
                Never miss a new video! Subscribe to Trace Adkins&apos; official YouTube channel for
                the latest music videos, live performances, and exclusive content.
              </p>
            </div>
            <a
              href="https://www.youtube.com/@TraceAdkinsOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 md:mt-0 px-8 py-3 bg-red-600 text-white hover:bg-red-700 rounded-xl font-bold transition-colors duration-300 inline-flex items-center"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              Visit YouTube Channel
            </a>
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedVideo(null);
        }}
      />
    </div>
  );
}