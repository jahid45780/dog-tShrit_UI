export interface IUpdateProductPayload {
  id: string;

  name?: string;
  slug?: string;
  category?: string;
  description?: string;

  price?: number;
  oldPrice?: number;

  colors?: string[];
  sizes?: string[];

  badge?: string;
  stock?: number;
  isActive?: boolean;

  main?: File;
  hover?: File;
}