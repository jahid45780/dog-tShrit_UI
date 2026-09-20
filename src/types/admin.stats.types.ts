

export interface IUserRoleStats {
  _id: string;
  count: number;
}

export interface IUserOverviewStats {
  totalUsers: number;
  totalActiveUsers: number;
  totalInactiveUsers: number;
  totalBlockedUsers: number;
  newUsersLast7Days: number;
  newUsersLast30Days: number;
  usersByRole: IUserRoleStats[];
}


/* =========================================================
   PRODUCT STATS
========================================================= */

export interface IProductCategoryStats {
  _id: string;
  count: number;
}

export interface ITopProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  rating: number;
  reviews: number;
  stock: number;
  images?: {
    main?: string;
  };
}

export interface IProductStats {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  outOfStockProducts: number;
  lowStockProducts: number;
  totalStock: number;
  productsByCategory: IProductCategoryStats[];
  topProducts: ITopProduct[];
}


/* =========================================================
   BOOKING STATS
========================================================= */

export interface IBookingStatusStats {
  _id: string;
  count: number;
}

export interface IRecentBookingUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface IRecentBooking {
  _id: string;
  user:
    | IRecentBookingUser
    | string;
  items: Array<{
    product: string;
    name: string;
    quantity: number;
    price: number;
    color: string;
    size: string;
    subtotal: number;
  }>;
  shippingAddress?: {
    name: string;
    phone: string;
    address: string;
  };
  totalAmount: number;
  paymentStatus:
    | "PENDING"
    | "PAID"
    | "FAILED";
  bookingStatus:
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED";
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBookingStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  bookingsLast7Days: number;
  bookingsLast30Days: number;
  uniqueCustomers: number;
  bookingsByStatus: IBookingStatusStats[];
  recentBookings: IRecentBooking[];
}


/* =========================================================
   PAYMENT STATS
========================================================= */

export interface IPaymentStatusStats {
  _id: string;
  count: number;
}

export interface IPaymentStats {
  totalPayments: number;
  paidPayments: number;
  pendingPayments: number;
  failedPayments: number;
  totalRevenue: number;
  averagePaymentAmount: number;
  paymentsByStatus: IPaymentStatusStats[];
}


/* =========================================================
   RESPONSE TYPES
========================================================= */

export interface IStatsResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
