// Type definitions for Laser Presisjon e-commerce platform

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  variants?: ProductVariant[];
  inStock: boolean;
  featured?: boolean;
  relatedProducts?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'color' | 'material';
  options: string[];
  priceModifier?: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  variant?: { [key: string]: string };
  customization?: Customization;
}

export interface Customization {
  engravingText?: string;
  engravingStyle?: string;
  font?: string;
  uploadedImage?: string;
}

export interface Order {
  orderNumber: string;
  email: string;
  items: CartItem[];
  status: OrderStatus;
  createdAt: Date;
  estimatedDelivery?: Date;
  tracking?: TrackingInfo[];
  giftWrapping?: boolean;
}

export type OrderStatus = 'Mottatt' | 'Under produksjon' | 'Sendt' | 'Levert';

export interface TrackingInfo {
  status: OrderStatus;
  date: Date;
  description: string;
}

export interface SpecialOrder {
  id: string;
  userId?: string;
  email: string;
  status: 'draft' | 'submitted' | 'completed';
  material?: string;
  engravingStyle?: string;
  font?: string;
  uploadedImages?: string[];
  description?: string;
  preferredDate?: Date;
  estimatedPrice?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: Date;
  author: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
