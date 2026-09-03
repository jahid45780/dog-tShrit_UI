 export type ProductBadge = "New" | "Trending" | "Sale" | "Popular";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  hoverImage?: string;
  badge?: ProductBadge;
  colors?: string[];
  sizes?: string[];
};