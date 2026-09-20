import type { ComponentType, ReactNode } from "react";


export interface IResponse<T>{
    statusCode:number;
    success:boolean;
    message:string;
    data:T
}


export interface ISidebarItem {
  title: string;

  items: {
    title: string;
    url: string;
    component?: ComponentType;
  }[];
}

export type IRole  = "ADMIN" | "USER" 


export interface IProduct {
  _id: string;

  name: string;
  slug: string;

  category:
    | "Dog Lovers"
    | "Cat Lovers"
    | "Paw Collection"
    | "Custom";

  description: string;

  price: number;
  oldPrice?: number;

  rating: number;
  reviews: number;

  images: {
    main: string;
    hover: string;
  };

  colors: string[];
  sizes: string[];

  badge?:
    | "New"
    | "Trending"
    | "Popular"
    | "Sale"
    | "Best Seller";

  stock: number;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}


export interface IProductResponse {
  success: boolean;
  message: string;

  data: IProduct[];

  meta: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
}

export interface IAddToCartPayload {
  product: string;
  quantity: number;
  color?: string;
  size?: string;
}

export interface IUpdateCartPayload {
  itemId: string;
  quantity: number;
}

export interface ICartProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  category?: string;
  badge?: string;
  stock: number;
  images?: {
    main?: string;
    hover?: string;
  };
}

export interface ICartItem {
  _id: string;
  product: ICartProduct;
  quantity: number;
  color?: string;
  size?: string;
}

export interface ICart {
  _id?: string;
  user: string;
  items: ICartItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ICartResponse {
  success: boolean;
  message: string;
  data: ICart;
}


export interface IBookingItem {
  product: string;
  name: string;
  quantity: number;
  price: number;
  color: string;
  size: string;
  subtotal: number;
}

export interface IShippingAddress {
  name: string;
  phone: string;
  address: string;
}

export interface IBooking {
  _id: string;
  user: string;

  items: IBookingItem[];

  shippingAddress: IShippingAddress;

  totalAmount: number;

  paymentStatus: "PENDING" | "PAID" | "FAILED";

  bookingStatus:
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED";

  stripeSessionId?: string;

  stripePaymentIntentId?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateBookingResponse {
  success: boolean;
  message: string;

  data: {
    booking: IBooking;

    checkoutUrl: string;
  };
}