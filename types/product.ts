// types/product.ts
export interface Product {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  category: string[];
  images: string[];
  featuredImage: string;
  quantity: number;
  inStock: boolean;
  sku: string;
  tags: string[];
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  materials?: string[];
  features?: string[];
  specifications?: Record<string, string>;
}

export interface CartItem extends Product {
  cartQuantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
}