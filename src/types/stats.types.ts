
export interface IUserBookingStatItem {
  _id: string;
  totalAmount: number;

  paymentStatus: "PENDING" | "PAID" | "FAILED";

  bookingStatus:
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED";

  items: Array<{
    product: string;
    name: string;
    quantity: number;
    price: number;
    color: string;
    size: string;
    subtotal: number;
  }>;

  shippingAddress: {
    name: string;
    phone: string;
    address: string;
  };

  stripeSessionId?: string;
  createdAt?: string;
}

export interface IProductHistory {
  _id: string;
  productName: string;
  totalQuantity: number;
  totalSpent: number;
}

export interface IUserStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;

  totalSpent: number;

  payments: {
    paid: number;
    pending: number;
    failed: number;
  };

  bookings: IUserBookingStatItem[];

  productHistory: IProductHistory[];
}

export interface IUserStatsResponse {
  success: boolean;
  message: string;
  data: IUserStats;
}