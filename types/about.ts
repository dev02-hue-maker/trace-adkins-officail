// types/about.ts
export interface BiographyImage {
  id: string;
  url: string;
  caption: string;
  year: string;
  category: 'early' | 'career' | 'performances' | 'personal';
  featured: boolean;
}

export interface CareerMilestone {
  year: string;
  title: string;
  description: string;
  icon: string;
}