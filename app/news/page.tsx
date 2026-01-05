// app/news/page.tsx
 
import { mockNews } from "@/types/mockNews";
import { Metadata } from "next";
import NewsCard from "../components/NewsCard";

export const metadata: Metadata = {
  title: "News & Announcements | Trace Adkins",
  description: "Latest news, announcements, and updates from Trace Adkins.",
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              News & <span className="text-amber-400">Announcements</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay up to date with the latest news, tour announcements, and updates from Trace Adkins.
            </p>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Page Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Updates</h2>
          <div className="w-24 h-1 bg-amber-500 mb-6"></div>
          <p className="text-gray-600">
            Find all the latest news and announcements from Trace Adkins. Click on any article to read more.
          </p>
        </div>

        {/* News Grid */}
        {mockNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockNews.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600">No news articles available at the moment.</h3>
            <p className="text-gray-500 mt-2">Check back soon for updates!</p>
          </div>
        )}

        
      </div>
    </div>
  );
}