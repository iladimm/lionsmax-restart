export type Category = 'Joint Health' | 'Energy & Metabolism' | 'Sleep & Stress' | 'Multivitamins';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number; // For display/comparison
  rating: number;
  reviews: number;
  image: string;
  category: Category;
  benefits: string[];
  affiliateLink: string;
  description: string;
  isBestSeller?: boolean;
  isPrime?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export type ViewState = 'home' | 'shop' | 'product' | 'assistant' | 'blog' | 'article';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  content: string[]; // Array of paragraphs for simple rendering
}