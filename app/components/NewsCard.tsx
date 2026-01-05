// components/NewsCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { NewsArticle } from "@/types/news";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export default function NewsCard({ article, index }: NewsCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Clickable Image */}
      <Link href={`/news/${article.slug}`} className="block overflow-hidden">
        <div className="relative h-64 md:h-72 w-full">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {article.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        {/* Date */}
        <div className="flex items-center text-gray-500 mb-3">
          <Calendar className="w-4 h-4 mr-2" />
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>

        {/* Clickable Title */}
        <Link href={`/news/${article.slug}`} className="block mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
            {article.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 mb-6 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Read More Button */}
        <Link
          href={`/news/${article.slug}`}
          className="inline-flex items-center text-amber-600 font-semibold group/btn hover:text-amber-700 transition-colors duration-300"
        >
          Read More
          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.article>
  );
}