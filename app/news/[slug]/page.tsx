// app/news/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react";
import { mockNews } from "@/types/mockNews";
 

// Remove the NewsParams interface since we'll handle params differently

export async function generateStaticParams() {
  return mockNews.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const article = mockNews.find((a) => a.slug === resolvedParams.slug);
  
  if (!article) {
    return {
      title: "Article Not Found",
    };
  }
  
  return {
    title: `${article.title} | Trace Adkins`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
    },
  };
}

export default async function NewsDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const article = mockNews.find((a) => a.slug === resolvedParams.slug);
  
  if (!article) {
    notFound();
  }

  // Find related articles (exclude current one)
  const relatedArticles = mockNews
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/news"
            className="inline-flex items-center text-gray-600 hover:text-amber-600 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Link>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center text-gray-500 mb-4">
            <Calendar className="w-5 h-5 mr-2" />
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span className="mx-2">•</span>
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
              {article.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            {article.excerpt}
          </p>

          {/* Share Buttons */}
          <div className="flex items-center border-t border-b py-4">
            <span className="text-gray-700 mr-4">Share:</span>
            <div className="flex gap-2">
              <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative h-100 md:h-125 w-full mb-8 rounded-2xl overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Call to Action */}
        <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Want More Updates?
            </h3>
            <p className="text-gray-600 mb-6">
              Subscribe to never miss important announcements, tour dates, and exclusive content.
            </p>
            <Link
              href="/newsletter"
              className="inline-flex items-center bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-300"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 pt-12 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/news/${relatedArticle.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48">
                      <Image
                        src={relatedArticle.imageUrl}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2 mb-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}