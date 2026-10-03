/* =========================================================
   COMMON RESPONSE
========================================================= */

export interface IStatsResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}


/* =========================================================
   CUSTOMER
========================================================= */

export interface IAdminCustomer {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;

  totalOrders: number;
  paidOrders: number;
  totalSpent: number;

  lastOrderAt?: string;

  customerType:
    | "GUEST"
    | "REGISTERED";
}


/* =========================================================
   RECENT BOOKING
========================================================= */

export interface IAdminRecentBooking {
  _id: string;

  user?: {
    _id: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  } | null;

  guestId?: string | null;

  customer: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
  };

  items: any[];

  totalAmount: number;

  paymentStatus: string;

  bookingStatus: string;

  customerType:
    | "GUEST"
    | "REGISTERED";

  createdAt: string;
}


/* =========================================================
   RECENT USER
========================================================= */

export interface IAdminRecentUser {
  _id: string;

  name: string;

  email: string;

  phone?: string;

  address?: string;

  Role?: string;

  IsActive?: string;

  createdAt: string;
}


/* =========================================================
   MONTHLY STATS
========================================================= */

export interface IMonthlyStats {
  year: number;

  month: number;

  orders: number;

  revenue: number;
}


/* =========================================================
   ADMIN STATS
========================================================= */

export interface IAdminStats {

  // --------------------------------
  // BASIC
  // --------------------------------

  totalUsers: number;

  totalProducts: number;

  totalBookings: number;


  // --------------------------------
  // BOOKING
  // --------------------------------

  pendingBookings: number;

  confirmedBookings: number;

  cancelledBookings: number;


  // --------------------------------
  // PAYMENT
  // --------------------------------

  paidOrders: number;

  pendingPayments: number;

  failedPayments: number;

  totalRevenue: number;

  averagePaymentAmount: number;


  // --------------------------------
  // CUSTOMERS
  // --------------------------------

  uniqueCustomers: number;

  guestCustomers: number;

  registeredCustomers: number;

  customers: IAdminCustomer[];


  // --------------------------------
  // RECENT DATA
  // --------------------------------

  recentBookings: IAdminRecentBooking[];

  recentUsers: IAdminRecentUser[];


  // --------------------------------
  // CHART
  // --------------------------------

  monthlyStats: IMonthlyStats[];
}