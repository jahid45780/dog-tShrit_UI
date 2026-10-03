
import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";

import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  DollarSign,
  Eye,
  FileText,
  Mail,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";

import { useGetAllOrdersQuery } from "@/redux/features/stats/adminStats/admin.stats.api";

/* =========================================================
   TYPES
========================================================= */

interface IProductImage {
  main?: string;
  hover?: string;
}

interface IOrderItem {
  product?: {
    _id?: string;
    name?: string;
    images?: IProductImage;
  };

  name?: string;
  image?: string;
  quantity?: number;
  price?: number;
  subtotal?: number;
  color?: string;
  size?: string;
}

interface ICustomer {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

/* =========================================================
   SHIPPING ADDRESS
   Guest order এর data এখানে থাকে
========================================================= */

interface IShippingAddress {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

interface IOrderUser {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
}

interface IOrder {
  _id: string;

  /* Logged-in user */
  user?: IOrderUser | null;

  /* Guest user */
  guestId?: string;

  /* Guest order email */
  email?: string;

  /* Guest checkout information */
  shippingAddress?: IShippingAddress;

  /* Existing customer structure support */
  customer?: ICustomer;

  items?: IOrderItem[];

  totalAmount?: number;

  paymentStatus?: string;

  bookingStatus?: string;

  customerType?: string;

  createdAt?: string;

  updatedAt?: string;

  stripeSessionId?: string;

  stripePaymentIntentId?: string;
}

interface IOrdersMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
}

interface IOrdersData {
  data?: IOrder[];
  meta?: IOrdersMeta;
}

interface IOrdersResponse {
  success?: boolean;
  message?: string;

  data?: IOrder[] | IOrdersData;

  meta?: IOrdersMeta;
}

/* =========================================================
   ANIMATION
========================================================= */

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const stagger: Variants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   HELPERS
========================================================= */

const formatDate = (date?: string) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatDateTime = (date?: string) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* =========================================================
   CUSTOMER NORMALIZER

   Supports:
   1. Guest order
      email
      shippingAddress.name
      shippingAddress.phone
      shippingAddress.address

   2. Logged-in order
      user.name
      user.email
      user.phone

   3. Old customer structure
      customer.name
      customer.email
      customer.phone
========================================================= */

const getCustomer = (order: IOrder) => {
  const shipping = order.shippingAddress;

  const name =
    shipping?.name ||
    order.customer?.name ||
    order.user?.name ||
    "Guest Customer";

  const email =
    order.email ||
    order.customer?.email ||
    order.user?.email ||
    "N/A";

  const phone =
    shipping?.phone ||
    order.customer?.phone ||
    order.user?.phone ||
    "N/A";

  const address =
    shipping?.address ||
    order.customer?.address ||
    "";

  const city =
    shipping?.city ||
    order.customer?.city ||
    "";

  const postalCode =
    shipping?.postalCode ||
    order.customer?.postalCode ||
    "";

  return {
    name,
    email,
    phone,
    address,
    city,
    postalCode,
  };
};

/* =========================================================
   ADDRESS FORMATTER
========================================================= */

const getFormattedAddress = (order: IOrder) => {
  const customer = getCustomer(order);

  return [
    customer.address,
    customer.city,
    customer.postalCode,
  ]
    .filter(Boolean)
    .join(", ");
};

/* =========================================================
   PAYMENT BADGE
========================================================= */

const PaymentBadge = ({
  status,
}: {
  status?: string;
}) => {
  const value =
    status?.toLowerCase().trim() || "pending";

  const isPaid =
    value === "paid" ||
    value === "success" ||
    value === "successful" ||
    value === "completed" ||
    value === "succeeded";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        isPaid
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isPaid
            ? "bg-emerald-500"
            : "bg-amber-500"
        }`}
      />

      {status || "Pending"}
    </span>
  );
};

/* =========================================================
   BOOKING BADGE
========================================================= */

const BookingBadge = ({
  status,
}: {
  status?: string;
}) => {
  const value =
    status?.toLowerCase().trim() || "pending";

  let className =
    "bg-slate-100 text-slate-600";

  if (
    value === "completed" ||
    value === "confirmed" ||
    value === "delivered"
  ) {
    className =
      "bg-emerald-50 text-emerald-700";
  }

  if (
    value === "processing" ||
    value === "shipped"
  ) {
    className =
      "bg-blue-50 text-blue-700";
  }

  if (
    value === "cancelled" ||
    value === "canceled"
  ) {
    className =
      "bg-red-50 text-red-700";
  }

  if (value === "pending") {
    className =
      "bg-amber-50 text-amber-700";
  }

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${className}`}
    >
      {status || "Pending"}
    </span>
  );
};

/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyOrdersState = ({
  search,
}: {
  search: string;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="flex min-h-[320px] flex-col items-center justify-center px-5 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        {search ? (
          <Search size={25} />
        ) : (
          <Package size={25} />
        )}
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">
        {search
          ? "No matching orders"
          : "No orders found"}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        {search
          ? "Try another order ID, customer name, email or phone."
          : "There are currently no orders available."}
      </p>
    </motion.div>
  );
};

/* =========================================================
   ORDER DETAILS MODAL
========================================================= */

interface OrderDetailsModalProps {
  order: IOrder;
  onClose: () => void;
}

const OrderDetailsModal = ({
  order,
  onClose,
}: OrderDetailsModalProps) => {
  const customer = getCustomer(order);

  const formattedAddress =
    getFormattedAddress(order);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5"
      onClick={onClose}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.97,
          y: 15,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.97,
          y: 10,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        onClick={(e) =>
          e.stopPropagation()
        }
        className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
              <FileText size={17} />
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                Order Details
              </h2>

              <p className="truncate text-xs text-slate-500">
                #{order._id}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
          >
            <X size={17} />
          </button>
        </div>

        {/* =====================================================
            BODY
        ===================================================== */}

        <div className="max-h-[calc(90vh-65px)] overflow-y-auto p-5 sm:p-6">
          {/* ===================================================
              CUSTOMER / SUMMARY
          =================================================== */}

          <div className="grid gap-4 lg:grid-cols-2">
            {/* CUSTOMER */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
                  <User size={16} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Customer
                  </h3>

                  <p className="text-[11px] text-slate-400">
                    Customer information
                  </p>
                </div>
              </div>

              <div className="space-y-3.5">
                {/* NAME */}

                <div>
                  <p className="text-[11px] text-slate-400">
                    Name
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {customer.name}
                  </p>
                </div>

                {/* EMAIL */}

                <div className="flex gap-2.5">
                  <Mail
                    size={15}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />

                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400">
                      Email
                    </p>

                    <p className="mt-0.5 break-all text-xs text-slate-600">
                      {customer.email}
                    </p>
                  </div>
                </div>

                {/* PHONE */}

                <div className="flex gap-2.5">
                  <Phone
                    size={15}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />

                  <div>
                    <p className="text-[10px] text-slate-400">
                      Phone
                    </p>

                    <p className="mt-0.5 text-xs text-slate-600">
                      {customer.phone}
                    </p>
                  </div>
                </div>

                {/* ADDRESS */}

                <div className="flex gap-2.5">
                  <MapPin
                    size={15}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />

                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400">
                      Shipping Address
                    </p>

                    <p className="mt-0.5 text-xs leading-5 text-slate-600">
                      {formattedAddress ||
                        "N/A"}
                    </p>
                  </div>
                </div>

                {/* GUEST BADGE */}

                {order.guestId && (
                  <div className="pt-1">
                    <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
                      Guest Order
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* SUMMARY */}

            <div className="rounded-2xl bg-slate-900 p-5 text-white">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                  <Package size={16} />
                </div>

                <div>
                  <h3 className="text-sm font-bold">
                    Order Summary
                  </h3>

                  <p className="text-[11px] text-slate-400">
                    Order overview
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* PAYMENT */}

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">
                    Payment
                  </span>

                  <PaymentBadge
                    status={
                      order.paymentStatus
                    }
                  />
                </div>

                {/* STATUS */}

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">
                    Status
                  </span>

                  <BookingBadge
                    status={
                      order.bookingStatus
                    }
                  />
                </div>

                {/* CUSTOMER TYPE */}

                {order.customerType && (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-400">
                      Customer Type
                    </span>

                    <span className="text-xs font-semibold text-white">
                      {order.customerType}
                    </span>
                  </div>
                )}

                {/* TOTAL */}

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs text-slate-400">
                    Total
                  </span>

                  <span className="text-2xl font-bold">
                    $
                    {Number(
                      order.totalAmount || 0
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              PRODUCTS
          =================================================== */}

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Products
                </h3>

                <p className="mt-0.5 text-[11px] text-slate-400">
                  {order.items?.length || 0}{" "}
                  item(s)
                </p>
              </div>

              <ShoppingBag
                size={17}
                className="text-slate-400"
              />
            </div>

            <div className="divide-y divide-slate-100">
              {(order.items || []).map(
                (item, index) => {
                  const image =
                    item.image ||
                    item.product?.images?.main;

                  const itemTotal =
                    item.subtotal ??
                    Number(
                      item.price || 0
                    ) *
                      Number(
                        item.quantity || 0
                      );

                  return (
                    <motion.div
                      key={`${
                        item.product?._id ||
                        item.name ||
                        "product"
                      }-${index}`}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.04,
                      }}
                      className="flex gap-3 px-5 py-4"
                    >
                      {/* IMAGE */}

                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        {image ? (
                          <img
                            src={image}
                            alt={
                              item.name ||
                              item.product
                                ?.name ||
                              "Product"
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-400">
                            <Package
                              size={20}
                            />
                          </div>
                        )}
                      </div>

                      {/* INFO */}

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {item.name ||
                            item.product?.name ||
                            "Product"}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.color && (
                            <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] text-slate-500">
                              {item.color}
                            </span>
                          )}

                          {item.size && (
                            <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] text-slate-500">
                              Size:{" "}
                              {item.size}
                            </span>
                          )}

                          <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] text-slate-500">
                            Qty:{" "}
                            {item.quantity || 0}
                          </span>

                          {item.price !==
                            undefined && (
                            <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] text-slate-500">
                              $
                              {Number(
                                item.price
                              ).toFixed(2)}{" "}
                              each
                            </span>
                          )}
                        </div>
                      </div>

                      {/* PRICE */}

                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-slate-900">
                          $
                          {Number(
                            itemTotal || 0
                          ).toFixed(2)}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          Subtotal
                        </p>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>

          {/* ===================================================
              DATE
          =================================================== */}

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {/* CREATED */}

            <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-4 py-3.5">
              <CalendarDays
                size={15}
                className="text-slate-400"
              />

              <div>
                <p className="text-[10px] text-slate-400">
                  Created
                </p>

                <p className="text-xs font-semibold text-slate-600">
                  {formatDateTime(
                    order.createdAt
                  )}
                </p>
              </div>
            </div>

            {/* UPDATED */}

            <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-4 py-3.5">
              <Clock3
                size={15}
                className="text-slate-400"
              />

              <div>
                <p className="text-[10px] text-slate-400">
                  Last Updated
                </p>

                <p className="text-xs font-semibold text-slate-600">
                  {formatDateTime(
                    order.updatedAt
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* =========================================================
   MAIN
========================================================= */

const OrdersStats = () => {
  const [page, setPage] = useState(1);

  const [search, setSearch] =
    useState("");

  const [selectedOrder, setSelectedOrder] =
    useState<IOrder | null>(null);

  const limit = 10;

  /* =========================================================
     API
  ========================================================= */

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAllOrdersQuery({
    page,
    limit,
  });

  /* =========================================================
     NORMALIZE RESPONSE
  ========================================================= */

  const normalizedResponse =
    response as IOrdersResponse | undefined;

  let orders: IOrder[] = [];

  let meta: IOrdersMeta = {};

  if (
    Array.isArray(
      normalizedResponse?.data
    )
  ) {
    orders = normalizedResponse.data;

    meta =
      normalizedResponse.meta || {};
  } else if (
    normalizedResponse?.data &&
    typeof normalizedResponse.data ===
      "object"
  ) {
    const nested =
      normalizedResponse.data as IOrdersData;

    orders = Array.isArray(
      nested.data
    )
      ? nested.data
      : [];

    meta =
      nested.meta ||
      normalizedResponse.meta ||
      {};
  }

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredOrders = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return orders;
    }

    return orders.filter(
      (order) => {
        const customer =
          getCustomer(order);

        return (
          order._id
            ?.toLowerCase()
            .includes(query) ||
          customer.name
            ?.toLowerCase()
            .includes(query) ||
          customer.email
            ?.toLowerCase()
            .includes(query) ||
          customer.phone
            ?.toLowerCase()
            .includes(query) ||
          customer.address
            ?.toLowerCase()
            .includes(query)
        );
      }
    );
  }, [orders, search]);

  /* =========================================================
     STATS
  ========================================================= */

  const paidOrders =
    orders.filter((order) => {
      const status =
        order.paymentStatus
          ?.toLowerCase()
          .trim();

      return (
        status === "paid" ||
        status === "success" ||
        status === "successful" ||
        status === "completed" ||
        status === "succeeded"
      );
    }).length;

  const pendingOrders =
    orders.length - paidOrders;

  const pageRevenue =
    orders.reduce(
      (sum, order) =>
        sum +
        Number(
          order.totalAmount || 0
        ),
      0
    );

  const totalPages =
    Number(meta.totalPage || 0) ||
    Math.ceil(
      Number(meta.total || 0) /
        limit
    ) ||
    1;

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-44 animate-pulse rounded-2xl bg-slate-200" />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>

        <div className="h-[500px] animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-red-100 bg-white">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <AlertCircle size={28} />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-900">
            Failed to load orders
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Something went wrong. Please
            try again.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <RefreshCw size={15} />

            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="space-y-6 pb-10">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="relative overflow-hidden rounded-2xl bg-slate-950 px-5 py-6 text-white shadow-lg sm:px-7 sm:py-7"
      >
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/[0.04]" />

        <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-[11px] font-medium text-slate-400">
              <ShoppingBag size={13} />

              Admin Dashboard
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Orders
            </h1>

            <p className="mt-2 max-w-xl text-sm text-slate-400">
              Manage customer orders,
              payment status and order
              activity.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <Clock3 size={16} />
            </div>

            <div>
              <p className="text-[10px] text-slate-500">
                Current Page
              </p>

              <p className="text-sm font-semibold">
                Page {meta.page || page}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {/* TOTAL */}

        <motion.div
          variants={cardAnimation}
          whileHover={{
            y: -3,
          }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Total Orders
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {meta.total ??
                  orders.length}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <ShoppingBag size={18} />
            </div>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400">
            <ArrowUp size={12} />

            All orders
          </p>
        </motion.div>

        {/* PAID */}

        <motion.div
          variants={cardAnimation}
          whileHover={{
            y: -3,
          }}
          className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Paid Orders
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {paidOrders}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <DollarSign size={18} />
            </div>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-[11px] text-emerald-600">
            <ArrowUp size={12} />

            Successful payments
          </p>
        </motion.div>

        {/* PENDING */}

        <motion.div
          variants={cardAnimation}
          whileHover={{
            y: -3,
          }}
          className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Pending Orders
              </p>

              <p className="mt-2 text-2xl font-bold text-amber-600">
                {pendingOrders}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={18} />
            </div>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-[11px] text-amber-600">
            <ArrowDown size={12} />

            Awaiting payment
          </p>
        </motion.div>

        {/* REVENUE */}

        <motion.div
          variants={cardAnimation}
          whileHover={{
            y: -3,
          }}
          className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Page Revenue
              </p>

              <p className="mt-2 text-2xl font-bold text-blue-600">
                ${pageRevenue.toFixed(2)}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <DollarSign size={18} />
            </div>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-[11px] text-blue-600">
            <ArrowUp size={12} />

            Current page
          </p>
        </motion.div>
      </motion.div>

      {/* =====================================================
          ORDERS TABLE
      ===================================================== */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        {/* TOOLBAR */}

        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <FileText size={17} />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900">
                  All Orders
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  View and manage customer
                  orders
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
              {/* SEARCH */}

              <div className="relative w-full sm:w-[280px]">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search orders..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100"
                />
              </div>

              {/* REFRESH */}

              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                <RefreshCw
                  size={14}
                  className={
                    isFetching
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh
              </button>
            </div>
          </div>

          {/* FETCHING */}

          {isFetching && (
            <div className="mt-4 h-0.5 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                animate={{
                  x: [
                    "-100%",
                    "300%",
                  ],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="h-full w-1/3 rounded-full bg-slate-700"
              />
            </div>
          )}
        </div>

        {/* ===================================================
            DESKTOP
        =================================================== */}

        <div className="hidden overflow-x-auto lg:block">
          {filteredOrders.length >
          0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Order
                  </th>

                  <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Date
                  </th>

                  <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Payment
                  </th>

                  <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map(
                  (order) => {
                    const customer =
                      getCustomer(order);

                    return (
                      <motion.tr
                        key={order._id}
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="group border-b border-slate-100 transition-colors hover:bg-slate-50/70"
                      >
                        {/* ORDER */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition group-hover:bg-slate-900 group-hover:text-white">
                              <ShoppingBag
                                size={15}
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-[150px] truncate text-xs font-bold text-slate-800">
                                #
                                {
                                  order._id
                                }
                              </p>

                              <p className="mt-1 text-[10px] text-slate-400">
                                {order.items
                                  ?.length ||
                                  0}{" "}
                                item(s)
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* CUSTOMER */}

                        <td className="px-5 py-4">
                          <p className="max-w-[170px] truncate text-xs font-semibold text-slate-800">
                            {
                              customer.name
                            }
                          </p>

                          <p className="mt-1 max-w-[180px] truncate text-[10px] text-slate-400">
                            {
                              customer.email
                            }
                          </p>

                          <p className="mt-1 max-w-[180px] truncate text-[10px] text-slate-400">
                            {
                              customer.phone
                            }
                          </p>
                        </td>

                        {/* DATE */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <CalendarDays
                              size={13}
                              className="text-slate-400"
                            />

                            {formatDate(
                              order.createdAt
                            )}
                          </div>
                        </td>

                        {/* AMOUNT */}

                        <td className="px-5 py-4">
                          <span className="text-xs font-bold text-slate-800">
                            $
                            {Number(
                              order.totalAmount ||
                                0
                            ).toFixed(
                              2
                            )}
                          </span>
                        </td>

                        {/* PAYMENT */}

                        <td className="px-5 py-4">
                          <PaymentBadge
                            status={
                              order.paymentStatus
                            }
                          />
                        </td>

                        {/* STATUS */}

                        <td className="px-5 py-4">
                          <BookingBadge
                            status={
                              order.bookingStatus
                            }
                          />
                        </td>

                        {/* ACTION */}

                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() =>
                              setSelectedOrder(
                                order
                              )
                            }
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-slate-900 hover:text-white"
                          >
                            <Eye
                              size={
                                14
                              }
                            />
                          </button>
                        </td>
                      </motion.tr>
                    );
                  }
                )}
              </tbody>
            </table>
          ) : (
            <EmptyOrdersState
              search={search}
            />
          )}
        </div>

        {/* ===================================================
            MOBILE
        =================================================== */}

        <div className="space-y-3 p-4 lg:hidden sm:p-5">
          {filteredOrders.length >
          0 ? (
            filteredOrders.map(
              (order) => {
                const customer =
                  getCustomer(order);

                return (
                  <motion.div
                    key={order._id}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    {/* HEADER */}

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                          <ShoppingBag
                            size={15}
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold text-slate-800">
                            #
                            {
                              order._id
                            }
                          </p>

                          <p className="mt-1 text-[10px] text-slate-400">
                            {formatDate(
                              order.createdAt
                            )}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          setSelectedOrder(
                            order
                          )
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-slate-900 hover:text-white"
                      >
                        <Eye
                          size={14}
                        />
                      </button>
                    </div>

                    <div className="my-4 h-px bg-slate-100" />

                    {/* CUSTOMER */}

                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] text-slate-400">
                          Customer
                        </p>

                        <p className="mt-1 truncate text-xs font-semibold text-slate-700">
                          {
                            customer.name
                          }
                        </p>

                        <p className="mt-0.5 truncate text-[10px] text-slate-400">
                          {
                            customer.email
                          }
                        </p>

                        <p className="mt-0.5 truncate text-[10px] text-slate-400">
                          {
                            customer.phone
                          }
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] text-slate-400">
                          Amount
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-800">
                          $
                          {Number(
                            order.totalAmount ||
                              0
                          ).toFixed(
                            2
                          )}
                        </p>
                      </div>
                    </div>

                    {/* BADGES */}

                    <div className="mt-4 flex flex-wrap gap-2">
                      <PaymentBadge
                        status={
                          order.paymentStatus
                        }
                      />

                      <BookingBadge
                        status={
                          order.bookingStatus
                        }
                      />
                    </div>

                    {/* ADDRESS */}

                    {getFormattedAddress(
                      order
                    ) && (
                      <div className="mt-3 flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2.5">
                        <MapPin
                          size={13}
                          className="mt-0.5 shrink-0 text-slate-400"
                        />

                        <p className="text-[10px] leading-4 text-slate-500">
                          {getFormattedAddress(
                            order
                          )}
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              }
            )
          ) : (
            <EmptyOrdersState
              search={search}
            />
          )}
        </div>

        {/* ===================================================
            PAGINATION
        =================================================== */}

        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredOrders.length}
            </span>{" "}
            orders
          </p>

          <div className="flex items-center gap-1.5">
            {/* PREVIOUS */}

            <button
              disabled={page <= 1}
              onClick={() =>
                setPage((prev) =>
                  Math.max(
                    1,
                    prev - 1
                  )
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft
                size={15}
              />
            </button>

            {/* PAGES */}

            {Array.from(
              {
                length: Math.min(
                  totalPages,
                  5
                ),
              },
              (_, index) =>
                index + 1
            ).map(
              (pageNumber) => (
                <button
                  key={
                    pageNumber
                  }
                  onClick={() =>
                    setPage(
                      pageNumber
                    )
                  }
                  className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold transition ${
                    page ===
                    pageNumber
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {
                    pageNumber
                  }
                </button>
              )
            )}

            {/* NEXT */}

            <button
              disabled={
                page >=
                totalPages
              }
              onClick={() =>
                setPage((prev) =>
                  Math.min(
                    totalPages,
                    prev + 1
                  )
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight
                size={15}
              />
            </button>
          </div>
        </div>
      </motion.section>

      {/* =====================================================
          MODAL
      ===================================================== */}

      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailsModal
            order={
              selectedOrder
            }
            onClose={() =>
              setSelectedOrder(
                null
              )
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrdersStats;

