
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  useGetBookingByIdQuery,
} from "@/redux/features/booking/booking.api";

const MyOrderDetails = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data,
    isLoading,
    isError,
  } = useGetBookingByIdQuery(id as string, {
    skip: !id,
  });

  const booking = data?.data;

  // ========================================
  // LOADING
  // ========================================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafaf9]">
        <OrderHeader />

        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="mb-8 h-8 w-40 rounded-lg bg-gray-200" />

            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              <div className="space-y-5">
                <div className="h-44 rounded-2xl bg-gray-200" />
                <div className="h-80 rounded-2xl bg-gray-200" />
                <div className="h-56 rounded-2xl bg-gray-200" />
              </div>

              <div className="h-[500px] rounded-2xl bg-gray-200" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (isError || !booking) {
    return (
      <div className="min-h-screen bg-[#fafaf9]">
        <OrderHeader />

        <div className="flex min-h-[65vh] items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
              <Package className="h-9 w-9 text-red-500" />
            </div>

            <h2 className="mt-6 text-2xl font-black text-gray-950">
              Order Not Found
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              We couldn't find this order. Please
              check the order ID and try again.
            </p>

            <Link to="/my-bookings">
              <Button className="mt-6 rounded-xl bg-gray-950 hover:bg-orange-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to My Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const items = booking.items ?? [];

  const totalQuantity = items.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  const subtotal = items.reduce(
    (total, item) =>
      total + Number(item.subtotal || 0),
    0
  );

  const isPaid =
    booking.paymentStatus === "PAID";

  const isFailed =
    booking.paymentStatus === "FAILED";

  const isConfirmed =
    booking.bookingStatus === "CONFIRMED";

  const isCancelled =
    booking.bookingStatus === "CANCELLED";

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* ========================================
          HEADER
      ======================================== */}

      <OrderHeader />

      {/* ========================================
          BREADCRUMB
      ======================================== */}

      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-gray-500 transition hover:text-orange-600"
            >
              Home
            </Link>

            <span className="text-gray-300">
              /
            </span>

            <Link
              to="/my-bookings"
              className="text-gray-500 transition hover:text-orange-600"
            >
              My Orders
            </Link>

            <span className="text-gray-300">
              /
            </span>

            <span className="font-semibold text-gray-900">
              Order Details
            </span>
          </div>
        </div>
      </div>

      {/* ========================================
          MAIN
      ======================================== */}

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* BACK BUTTON */}

        <Link
          to="/my-bookings"
          className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-gray-600 transition hover:text-orange-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Orders
        </Link>

        {/* ========================================
            PAGE TITLE
        ======================================== */}

        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600">
              <ShoppingBag className="h-3.5 w-3.5" />
              Atnamira Pet Shop
            </div>

            <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Order Details
            </h1>

            <p className="mt-2 break-all text-sm text-gray-500">
              Order ID: #{booking._id}
            </p>

            {booking.createdAt && (
              <p className="mt-1 text-xs text-gray-400">
                Placed on{" "}
                {new Date(
                  booking.createdAt
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <PaymentStatus
              status={booking.paymentStatus}
            />

            <BookingStatus
              status={booking.bookingStatus}
            />
          </div>
        </div>

        {/* ========================================
            CONTENT GRID
        ======================================== */}

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
          {/* ======================================
              LEFT SIDE
          ====================================== */}

          <div className="space-y-6">
            {/* ====================================
                ORDER INFORMATION
            ==================================== */}

            <Card className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                    <Package className="h-5 w-5 text-orange-600" />
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-gray-950">
                      Order Information
                    </h2>

                    <p className="text-xs text-gray-400">
                      Your order summary
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <InfoBox
                    label="Payment Status"
                    value={booking.paymentStatus}
                  />

                  <InfoBox
                    label="Order Status"
                    value={booking.bookingStatus}
                  />

                  <InfoBox
                    label="Products"
                    value={`${items.length} ${
                      items.length === 1
                        ? "product"
                        : "products"
                    }`}
                  />

                  <InfoBox
                    label="Total Quantity"
                    value={String(totalQuantity)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* ====================================
                ORDER ITEMS
            ==================================== */}

            <Card className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black text-gray-950">
                      Order Items
                    </h2>

                    <p className="mt-1 text-xs text-gray-400">
                      Products included in this order
                    </p>
                  </div>

                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                    {items.length}{" "}
                    {items.length === 1
                      ? "item"
                      : "items"}
                  </span>
                </div>

                <div className="mt-6 divide-y">
                  {items.map((item, index) => (
                    <div
                      key={`${item.product}-${index}`}
                      className="flex gap-4 py-5 first:pt-0 last:pb-0"
                    >
                      {/* PRODUCT ICON */}

                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                        <Package className="h-8 w-8 text-orange-500" />
                      </div>

                      {/* PRODUCT INFO */}

                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-gray-950">
                          {item.name}
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs text-gray-600">
                            Qty:{" "}
                            <strong className="text-gray-900">
                              {item.quantity}
                            </strong>
                          </span>

                          {item.color && (
                            <span className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs text-gray-600">
                              Color:{" "}
                              <strong className="text-gray-900">
                                {item.color}
                              </strong>
                            </span>
                          )}

                          {item.size && (
                            <span className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs text-gray-600">
                              Size:{" "}
                              <strong className="text-gray-900">
                                {item.size}
                              </strong>
                            </span>
                          )}
                        </div>

                        <p className="mt-3 text-xs text-gray-400">
                          $
                          {Number(
                            item.price
                          ).toFixed(2)}{" "}
                          each
                        </p>
                      </div>

                      {/* ITEM TOTAL */}

                      <div className="shrink-0 text-right">
                        <p className="text-base font-black text-gray-950">
                          $
                          {Number(
                            item.subtotal
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ====================================
                SHIPPING ADDRESS
            ==================================== */}

            <Card className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                    <MapPin className="h-5 w-5 text-orange-600" />
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-gray-950">
                      Shipping Address
                    </h2>

                    <p className="text-xs text-gray-400">
                      Your delivery information
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-gray-50 p-5">
                  <p className="font-bold text-gray-950">
                    {booking.shippingAddress?.name ||
                      "N/A"}
                  </p>

                  <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />

                    <span>
                      {booking.shippingAddress?.phone ||
                        "N/A"}
                    </span>
                  </div>

                  <div className="mt-2 flex items-start gap-2 text-sm leading-6 text-gray-600">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-orange-500" />

                    <span>
                      {booking.shippingAddress?.address ||
                        "N/A"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ======================================
              RIGHT SIDE
          ====================================== */}

          <aside className="space-y-6 lg:sticky lg:top-24">
            {/* ====================================
                ORDER SUMMARY
            ==================================== */}

            <Card className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-black text-gray-950">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Total Products
                    </span>

                    <span className="font-bold text-gray-900">
                      {items.length}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Total Quantity
                    </span>

                    <span className="font-bold text-gray-900">
                      {totalQuantity}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span className="font-bold text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Shipping
                    </span>

                    <span className="font-bold text-gray-900">
                      Included
                    </span>
                  </div>

                  <div className="border-t border-dashed pt-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="font-bold text-gray-950">
                          Total
                        </p>

                        <p className="mt-1 text-[11px] text-gray-400">
                          Final order amount
                        </p>
                      </div>

                      <p className="text-2xl font-black text-orange-600">
                        $
                        {Number(
                          booking.totalAmount
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ====================================
                PAYMENT
            ==================================== */}

            <Card className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      isPaid
                        ? "bg-green-50"
                        : isFailed
                        ? "bg-red-50"
                        : "bg-yellow-50"
                    }`}
                  >
                    <CreditCard
                      className={`h-5 w-5 ${
                        isPaid
                          ? "text-green-600"
                          : isFailed
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    />
                  </div>

                  <div>
                    <h2 className="font-black text-gray-950">
                      Payment
                    </h2>

                    <p className="text-xs text-gray-400">
                      Stripe payment status
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  {isPaid && (
                    <div className="flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-700">
                      <CheckCircle2 className="h-5 w-5" />
                      Payment completed
                    </div>
                  )}

                  {isFailed && (
                    <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
                      <XCircle className="h-5 w-5" />
                      Payment failed
                    </div>
                  )}

                  {!isPaid && !isFailed && (
                    <div className="flex items-center gap-2 rounded-xl bg-yellow-50 p-4 text-sm font-semibold text-yellow-700">
                      <Clock3 className="h-5 w-5" />
                      Payment is pending
                    </div>
                  )}
                </div>

                {booking.stripePaymentIntentId && (
                  <div className="mt-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Payment ID
                    </p>

                    <p className="mt-1 break-all text-xs text-gray-500">
                      {booking.stripePaymentIntentId}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ====================================
                ORDER STATUS
            ==================================== */}

            <Card className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                    <Truck className="h-5 w-5 text-orange-600" />
                  </div>

                  <div>
                    <h2 className="font-black text-gray-950">
                      Order Status
                    </h2>

                    <p className="text-xs text-gray-400">
                      Current order progress
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  {isConfirmed && (
                    <div className="rounded-xl bg-blue-50 p-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-600" />

                        <p className="font-bold text-blue-700">
                          Order Confirmed
                        </p>
                      </div>

                      <p className="mt-2 text-xs leading-5 text-blue-600">
                        Your payment has been confirmed
                        and your order is being prepared.
                      </p>
                    </div>
                  )}

                  {isCancelled && (
                    <div className="rounded-xl bg-red-50 p-4">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-600" />

                        <p className="font-bold text-red-700">
                          Order Cancelled
                        </p>
                      </div>

                      <p className="mt-2 text-xs leading-5 text-red-600">
                        This order has been cancelled.
                      </p>
                    </div>
                  )}

                  {!isConfirmed &&
                    !isCancelled && (
                      <div className="rounded-xl bg-yellow-50 p-4">
                        <div className="flex items-center gap-2">
                          <Clock3 className="h-5 w-5 text-yellow-600" />

                          <p className="font-bold text-yellow-700">
                            Order Pending
                          </p>
                        </div>

                        <p className="mt-2 text-xs leading-5 text-yellow-600">
                          Your order is waiting for
                          payment confirmation.
                        </p>
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>

            {/* CONTINUE SHOPPING */}

            <Link
              to="/collections"
              className="block"
            >
              <Button
                variant="outline"
                className="h-12 w-full rounded-xl"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </aside>
        </div>
      </main>
    </div>
  );
};

// ========================================
// INFO BOX
// ========================================

const InfoBox = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-bold text-gray-900">
        {value}
      </p>
    </div>
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
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Payment Paid
      </span>
    );
  }

  if (status === "FAILED") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
        <XCircle className="h-3.5 w-3.5" />
        Payment Failed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-bold text-yellow-700">
      <Clock3 className="h-3.5 w-3.5" />
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
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Confirmed
      </span>
    );
  }

  if (status === "CANCELLED") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
        <XCircle className="h-3.5 w-3.5" />
        Cancelled
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">
      <Clock3 className="h-3.5 w-3.5" />
      Pending
    </span>
  );
};

// ========================================
// HEADER
// ========================================

const OrderHeader = () => {
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
            to="/my-bookings"
            className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-orange-600 sm:block"
          >
            My Orders
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

export default MyOrderDetails;