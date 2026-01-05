// types/news.ts
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  category: string;
  slug: string;
}

export interface NewsParams {
  params: {
    slug: string;
  };
}