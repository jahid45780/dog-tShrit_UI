import {
  ArrowLeft,
  ChevronRight,
  Clock3,
  Package,
  ShoppingBag,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  useGetMyBookingsQuery,
} from "@/redux/features/booking/booking.api";

const MyOrders = () => {
  const {
    data,
    isLoading,
    isError,
  } = useGetMyBookingsQuery(undefined);

  const bookings = data?.data ?? [];

  // =========================
  // LOADING
  // =========================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafaf9]">
        <MyOrdersHeader />

        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="mb-8 h-10 w-48 rounded-lg bg-gray-200" />

            <div className="space-y-5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-48 rounded-2xl bg-gray-200"
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (isError) {
    return (
      <div className="min-h-screen bg-[#fafaf9]">
        <MyOrdersHeader />

        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
              <Package className="h-9 w-9 text-red-500" />
            </div>

            <h2 className="mt-5 text-2xl font-black text-gray-950">
              Unable to load orders
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Something went wrong while loading
              your orders. Please try again.
            </p>

            <Link to="/collections">
              <Button className="mt-6 rounded-xl bg-gray-950 hover:bg-orange-600">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* ================= HEADER ================= */}

      <MyOrdersHeader />

      {/* ================= BREADCRUMB ================= */}

      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-gray-500 transition hover:text-orange-600"
            >
              Home
            </Link>

            <ChevronRight className="h-4 w-4 text-gray-400" />

            <span className="font-semibold text-gray-900">
              My Orders
            </span>
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        {/* PAGE TITLE */}

        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600">
            <ShoppingBag className="h-3.5 w-3.5" />
            Atnamira Pet Shop
          </div>

          <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View your orders and check your payment
            status.
          </p>
        </div>

        {/* ================= EMPTY ================= */}

        {bookings.length === 0 ? (
          <Card className="rounded-3xl border-0 bg-white shadow-sm">
            <CardContent className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-50">
                  <ShoppingBag className="h-12 w-12 text-orange-500" />
                </div>

                <div className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
                  🐾
                </div>
              </div>

              <h2 className="mt-7 text-2xl font-black text-gray-950">
                No orders yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                You haven't placed any orders yet.
                Explore our collection and find
                something special for your pet.
              </p>

              <Link to="/collections">
                <Button className="mt-7 h-12 rounded-xl bg-gray-950 px-7 hover:bg-orange-600">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          /* ================= ORDERS ================= */

          <div className="space-y-5">
            {bookings.map((booking) => (
              <OrderCard
                key={booking._id}
                booking={booking}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// ========================================
// ORDER CARD
// ========================================

const OrderCard = ({
  booking,
}: {
  booking: any;
}) => {
  return (
    <Card className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      <CardContent className="p-5 sm:p-6">
        {/* TOP */}

        <div className="flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
              Order ID
            </p>

            <p className="mt-1 break-all text-sm font-bold text-gray-900">
              #{booking._id}
            </p>

            {booking.createdAt && (
              <p className="mt-1 text-xs text-gray-400">
                {new Date(
                  booking.createdAt
                ).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </p>
            )}
          </div>

          {/* STATUS */}

          <div className="flex flex-wrap gap-2">
            <PaymentStatus
              status={booking.paymentStatus}
            />

            <BookingStatus
              status={booking.bookingStatus}
            />
          </div>
        </div>

        {/* ================= ITEMS ================= */}

        <div className="py-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
            Products
          </p>

          <div className="space-y-4">
            {booking.items
              ?.slice(0, 3)
              .map(
                (
                  item: any,
                  index: number
                ) => (
                  <div
                    key={`${item.product}-${index}`}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                        <Package className="h-5 w-5 text-orange-500" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-gray-900">
                          {item.name}
                        </p>

                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                          <span>
                            Qty: {item.quantity}
                          </span>

                          {item.color && (
                            <span>
                              Color: {item.color}
                            </span>
                          )}

                          {item.size && (
                            <span>
                              Size: {item.size}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="shrink-0 text-sm font-bold text-gray-900">
                      $
                      {Number(
                        item.subtotal
                      ).toFixed(2)}
                    </p>
                  </div>
                )
              )}

            {booking.items?.length > 3 && (
              <p className="text-xs font-bold text-orange-600">
                +{" "}
                {booking.items.length - 3}{" "}
                more product(s)
              </p>
            )}
          </div>
        </div>

        {/* ================= BOTTOM ================= */}

        <div className="flex flex-col justify-between gap-4 border-t pt-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs text-gray-400">
              Total Amount
            </p>

            <p className="mt-0.5 text-2xl font-black text-orange-600">
              $
              {Number(
                booking.totalAmount
              ).toFixed(2)}
            </p>
          </div>

          {/* Details later */}
         <Link to={`/my-bookings/${booking._id}`}>
  <Button
    variant="outline"
    className="rounded-xl"
  >
    View Order
    <ChevronRight className="ml-2 h-4 w-4" />
  </Button>
</Link>
        </div>
      </CardContent>
    </Card>
  );
};

// ========================================
// PAYMENT STATUS
// ========================================

const PaymentStatus = ({
  status,
}: {
  status: string;
}) => {
  if (status === "PAID") {
    return (
      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
        ✓ Payment Paid
      </span>
    );
  }

  if (status === "FAILED") {
    return (
      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
        Payment Failed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1 text-xs font-bold text-yellow-700">
      <Clock3 className="mr-1 h-3 w-3" />
      Payment Pending
    </span>
  );
};

// ========================================
// BOOKING STATUS
// ========================================

const BookingStatus = ({
  status,
}: {
  status: string;
}) => {
  if (status === "CONFIRMED") {
    return (
      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
        Confirmed
      </span>
    );
  }

  if (status === "CANCELLED") {
    return (
      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
        Cancelled
      </span>
    );
  }

  return (
    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
      Pending
    </span>
  );
};

// ========================================
// HEADER
// ========================================

const MyOrdersHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[70px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}

        <Link
          to="/"
          className="group flex items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-lg shadow-sm transition group-hover:scale-105">
            🐾
          </div>

          <div>
            <p className="text-lg font-black tracking-tight text-gray-950">
              Atnamira
            </p>

            <p className="-mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-orange-500">
              Pet Shop
            </p>
          </div>
        </Link>

        {/* NAV */}

        <div className="flex items-center gap-2">
          <Link
            to="/collections"
            className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-orange-600 sm:block"
          >
            Shop
          </Link>

          <Link
            to="/my-cart"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
          >
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MyOrders;