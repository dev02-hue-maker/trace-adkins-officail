// app/about/page.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
 
import { 
  biographyText, 
  biographyImages, 
  careerMilestones, 
  careerStats 
} from '@/data/mockBiography';
import { 
  Music, 
  Award, 
  Users, 
  TrendingUp, 
  Disc, 
  Mic2,
  Quote,
  Calendar,
  Star,
  Trophy,
  Album,
  Headphones
} from 'lucide-react';
import { motion } from 'framer-motion';
import ImageGallery from '../components/ImageGallery';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'bio' | 'gallery' | 'career'>('bio');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=2000&q=80"
            alt="Trace Adkins performing live"
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-500 rounded-xl">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                TRACE ADKINS
              </h1>
            </div>
            <p className="text-2xl text-gray-200 leading-relaxed">
              25 Years of Authentic Country Music
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white shadow-xl -mt-12 relative z-10 mx-4 md:mx-8 lg:mx-auto max-w-6xl rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-8">
          {[
            { icon: <Album className="w-8 h-8" />, label: 'Albums Sold', value: careerStats.albumsSold },
            { icon: <TrendingUp className="w-8 h-8" />, label: 'Billboard Hits', value: careerStats.billboardHits },
            { icon: <Star className="w-8 h-8" />, label: 'Top 10 Singles', value: careerStats.top10Singles },
            { icon: <Headphones className="w-8 h-8" />, label: 'Streams', value: careerStats.streams },
            { icon: <Trophy className="w-8 h-8" />, label: 'Grammy Nominations', value: careerStats.grammyNominations },
            { icon: <Disc className="w-8 h-8" />, label: 'Studio Albums', value: careerStats.albums },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 rounded-2xl mb-4 group-hover:bg-amber-100 transition-colors">
                <div className="text-amber-600">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab('bio')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'bio'
                  ? 'bg-white shadow-lg text-amber-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Biography
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'gallery'
                  ? 'bg-white shadow-lg text-amber-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => setActiveTab('career')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'career'
                  ? 'bg-white shadow-lg text-amber-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Career
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'bio' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
            >
              {/* Opening Quote */}
              <div className="mb-12">
                <div className="flex items-start gap-4">
                  <Quote className="w-8 h-8 text-amber-500 mt-1 flex-shrink-0" />
                  <blockquote className="text-2xl md:text-3xl italic text-gray-800 leading-relaxed">
                    {biographyText.intro}
                  </blockquote>
                </div>
              </div>

              {/* Main Biography */}
              <div className="prose prose-lg max-w-none">
                {/* First Paragraph */}
                <div className="mb-8">
                  {biographyText.body.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Quote Section */}
                <div className="my-12 p-8 bg-amber-50 rounded-2xl border-l-4 border-amber-500">
                  <div className="flex items-start gap-4">
                    <Mic2 className="w-8 h-8 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-2xl font-semibold text-gray-900 mb-2">In His Own Words</p>
                      <p className="text-xl italic text-gray-700">{biographyText.quote}</p>
                    </div>
                  </div>
                </div>

                {/* Second Paragraph */}
                <div className="mb-8">
                  {biographyText.section2.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Fun Fact */}
                <div className="my-12 p-8 bg-gray-50 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <Music className="w-8 h-8 text-gray-700 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-2xl font-semibold text-gray-900 mb-2">Fun Fact</p>
                      <p className="text-xl italic text-gray-700">{biographyText.quote2}</p>
                    </div>
                  </div>
                </div>

                {/* Third Paragraph */}
                <div className="mb-8">
                  {biographyText.section3.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Closing Quote */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                  <div className="max-w-3xl mx-auto text-center">
                    <Quote className="w-12 h-12 text-amber-500 mx-auto mb-6" />
                    <p className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                      {biographyText.closingQuote}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      <span className="font-semibold">25+ Years in Music</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Photo Gallery</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  A visual journey through Trace Adkins&apos; career, from early days to current performances
                </p>
              </div>
              <ImageGallery images={biographyImages} />
            </motion.div>
          )}

          {activeTab === 'career' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Career Milestones</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Key moments in a legendary 25+ year career
                </p>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-400 to-amber-600 hidden md:block" />

                {/* Milestones */}
                <div className="space-y-12">
                  {careerMilestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`flex flex-col md:flex-row items-center ${
                        index % 2 === 0 ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Content */}
                      <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} mb-6 md:mb-0`}>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="text-3xl">{milestone.icon}</div>
                            <div>
                              <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full font-bold text-sm">
                                {milestone.year}
                              </span>
                              <h3 className="text-2xl font-bold text-gray-900 mt-2">{milestone.title}</h3>
                            </div>
                          </div>
                          <p className="text-gray-700 text-lg">{milestone.description}</p>
                        </div>
                      </div>

                      {/* Year Marker */}
                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-xl">
                          <span className="text-white font-bold text-xl">{milestone.year}</span>
                        </div>
                      </div>

                      {/* Empty spacer for alignment */}
                      <div className="md:w-1/2 hidden md:block" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Collaborations Section */}
              <div className="mt-20 p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl text-white">
                <div className="text-center mb-12">
                  <Award className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                  <h3 className="text-3xl font-bold mb-4">Iconic Collaborations</h3>
                  <p className="text-gray-300 text-lg">
                    Working with legends across musical genres
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { name: 'Blake Shelton', role: 'Duet Partner' },
                    { name: 'Luke Bryan', role: 'Collaboration' },
                    { name: 'Snoop Dogg', role: 'Cross-genre Feature' },
                    { name: 'Melissa Etheridge', role: 'Special Feature' },
                    { name: 'Stevie Wonder', role: 'Harmonica on Track' },
                    { name: 'Pitbull', role: 'Party Anthem Feature' },
                    { name: 'Keb Mo', role: 'Blues Collaboration' },
                    { name: 'Kid Rock', role: 'Rock-Country Fusion' },
                  ].map((collab, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors"
                    >
                      <Users className="w-8 h-8 mx-auto mb-3 text-amber-400" />
                      <h4 className="font-bold text-lg mb-1">{collab.name}</h4>
                      <p className="text-gray-300 text-sm">{collab.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}