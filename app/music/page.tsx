// app/music/page.tsx
 
import { Metadata } from "next";
import { Headphones, Disc, Music, Play, Calendar } from "lucide-react";
import { mockAlbums, mockSongs } from "@/types/mockMusic";
import SongCard from "../components/SongCard";
import AlbumCard from "../components/AlbumCard";

export const metadata: Metadata = {
  title: "Music | Trace Adkins",
  description: "Official discography, albums, and songs from country music star Trace Adkins.",
};

export default function MusicPage() {
  const featuredSongs = mockSongs.filter(song => song.featured);
  const allSongs = mockSongs.filter(song => !song.featured);
  const latestAlbums = mockAlbums.sort((a, b) => b.year - a.year);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-gray-900 via-amber-900 to-gray-900 text-white py-20">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500 rounded-full mb-6">
              <Headphones className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-amber-400">TRACE ADKINS</span> <span className="text-white">MUSIC</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Official discography, streaming links, and complete collection of albums and songs
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Featured Songs */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Hits</h2>
              <div className="w-24 h-1 bg-amber-500"></div>
            </div>
            <div className="flex items-center text-amber-600 font-semibold">
              <Play className="w-5 h-5 mr-2" />
              <span>Most Played</span>
            </div>
          </div>

          <div className="space-y-4">
            {featuredSongs.map((song, index) => (
              <SongCard key={song.id} song={song} index={index} />
            ))}
          </div>
        </section>

        {/* Discography - Albums */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Discography</h2>
              <div className="w-24 h-1 bg-amber-500"></div>
            </div>
            <div className="flex items-center text-amber-600 font-semibold">
              <Disc className="w-5 h-5 mr-2" />
              <span>{mockAlbums.length} Albums</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestAlbums.map((album, index) => (
              <AlbumCard key={album.id} album={album} index={index} />
            ))}
          </div>
        </section>

        {/* All Songs */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">All Songs</h2>
              <div className="w-24 h-1 bg-amber-500"></div>
            </div>
            <div className="flex items-center text-amber-600 font-semibold">
              <Music className="w-5 h-5 mr-2" />
              <span>{mockSongs.length} Songs</span>
            </div>
          </div>

          <div className="space-y-4">
            {allSongs.map((song, index) => (
              <SongCard key={song.id} song={song} index={index} />
            ))}
          </div>
        </section>

        {/* Streaming Platforms */}
        <section className="bg-linear-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Stream Everywhere
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Listen to Trace Adkins on all major streaming platforms. Click any album or song to open in your preferred platform.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Spotify', color: 'bg-green-500', icon: 'Spotify', url: 'https://open.spotify.com/artist/trace-adkins' },
              { name: 'Apple Music', color: 'bg-pink-500', icon: 'Apple Music', url: 'https://music.apple.com/us/artist/trace-adkins' },
              { name: 'Amazon Music', color: 'bg-blue-500', icon: 'Amazon', url: 'https://music.amazon.com/artists/trace-adkins' },
              { name: 'YouTube Music', color: 'bg-red-600', icon: 'YouTube', url: 'https://music.youtube.com/channel/trace-adkins' },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`${platform.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-bold text-lg">{platform.icon.charAt(0)}</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{platform.name}</h4>
                <p className="text-sm text-gray-600">Open in app</p>
              </a>
            ))}
          </div>
        </section>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          {[
            { label: 'Total Albums', value: mockAlbums.length, icon: Disc, color: 'bg-amber-100 text-amber-600' },
            { label: 'Total Songs', value: mockSongs.length, icon: Music, color: 'bg-blue-100 text-blue-600' },
            { label: 'Years Active', value: '25+', icon: Calendar, color: 'bg-green-100 text-green-600' },
            { label: 'Streaming Platforms', value: '8', icon: Headphones, color: 'bg-purple-100 text-purple-600' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg mr-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}