// Shared types for Arslan Traders storefront

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: { products: number };
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number | null;
  currency: string;
  sku?: string | null;
  stock: number;
  featured: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  material?: string | null;
  color?: string | null;
  dimensions?: string | null;
  weight?: string | null;
  tags: string[];
  images: string[];
  videoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  category?: Category;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  limit: number;
  offset: number;
};

export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'popular';

export type FilterState = {
  category: string; // 'all' or category slug
  search: string;
  minPrice: number;
  maxPrice: number;
  sort: SortOption;
  featuredOnly: boolean;
};
