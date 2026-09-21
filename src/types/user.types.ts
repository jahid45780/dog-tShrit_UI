export interface IAdminOrder {
  _id: string;

  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  } | null;

  items: {
    product: string;
    name: string;
    image?: string;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
    subtotal?: number;
  }[];

  shippingAddress?: {
    name?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };

  totalAmount: number;

  paymentStatus:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED";

  bookingStatus:
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";

  stripeSessionId?: string;

  createdAt: string;
  updatedAt: string;
}

export interface IOrdersResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: IAdminOrder[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface IOrdersQuery {
  page: number;
  limit: number;
}