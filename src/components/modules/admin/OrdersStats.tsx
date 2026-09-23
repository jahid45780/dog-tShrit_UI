
import { useMemo, useState } from "react";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  Search,
  ShoppingBag,
  Truck,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";

import { useGetAllOrdersQuery } from "@/redux/features/orders/orderApi";


// =====================================
// TYPES
// =====================================

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const PAYMENT_STATUSES = [
  "ALL",
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
];

const ORDER_STATUSES = [
  "ALL",
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];


// =====================================
// PAYMENT BADGE
// =====================================

const getPaymentBadge = (status: string) => {
  switch (status) {
    case "PAID":
      return (
        <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">
          Paid
        </Badge>
      );

    case "FAILED":
      return (
        <Badge variant="destructive">
          Failed
        </Badge>
      );

    case "REFUNDED":
      return (
        <Badge className="bg-purple-500/10 text-purple-600 hover:bg-purple-500/20">
          Refunded
        </Badge>
      );

    default:
      return (
        <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20">
          Pending
        </Badge>
      );
  }
};


// =====================================
// ORDER BADGE
// =====================================

const getOrderBadge = (status: string) => {
  switch (status) {
    case "DELIVERED":
      return (
        <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">
          Delivered
        </Badge>
      );

    case "SHIPPED":
      return (
        <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">
          Shipped
        </Badge>
      );

    case "PROCESSING":
      return (
        <Badge className="bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20">
          Processing
        </Badge>
      );

    case "CONFIRMED":
      return (
        <Badge className="bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500/20">
          Confirmed
        </Badge>
      );

    case "CANCELLED":
      return (
        <Badge variant="destructive">
          Cancelled
        </Badge>
      );

    default:
      return (
        <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20">
          Pending
        </Badge>
      );
  }
};


// =====================================
// DATE FORMAT
// =====================================

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );
};


// =====================================
// TIME FORMAT
// =====================================

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );
};


// =====================================
// ORDERS STATS
// =====================================

const OrdersStats = () => {
  // =====================================
  // PAGINATION
  // =====================================

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);


  // =====================================
  // FILTERS
  // =====================================

  const [searchInput, setSearchInput] =
    useState("");

  const [search, setSearch] = useState("");

  const [paymentStatus, setPaymentStatus] =
    useState("ALL");

  const [bookingStatus, setBookingStatus] =
    useState("ALL");


  // =====================================
  // API
  // =====================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAllOrdersQuery({
    page,
    limit,
    search,
    paymentStatus,
    bookingStatus,
  });


  // =====================================
  // DATA
  // =====================================

  const orders = data?.data ?? [];

  const meta = data?.meta;

  const totalPages = meta?.totalPages ?? 1;


  // =====================================
  // STATISTICS
  // =====================================

  const statistics = useMemo(() => {
    const paid = orders.filter(
      (order) =>
        order.paymentStatus === "PAID",
    ).length;

    const pending = orders.filter(
      (order) =>
        order.paymentStatus === "PENDING",
    ).length;

    const revenue = orders.reduce(
      (sum, order) =>
        sum + Number(order.totalAmount || 0),
      0,
    );

    return {
      paid,
      pending,
      revenue,
    };
  }, [orders]);


  // =====================================
  // SEARCH
  // =====================================

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput.trim());
  };


  // =====================================
  // SEARCH ENTER
  // =====================================

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };


  // =====================================
  // CLEAR FILTERS
  // =====================================

  const handleClearFilters = () => {
    setSearchInput("");
    setSearch("");
    setPaymentStatus("ALL");
    setBookingStatus("ALL");
    setPage(1);
  };


  // =====================================
  // PAGE SIZE
  // =====================================

  const handleLimitChange = (
    value: number,
  ) => {
    setLimit(value);
    setPage(1);
  };


  // =====================================
  // PAYMENT FILTER
  // =====================================

  const handlePaymentStatusChange = (
    value: string,
  ) => {
    setPaymentStatus(value);
    setPage(1);
  };


  // =====================================
  // ORDER FILTER
  // =====================================

  const handleBookingStatusChange = (
    value: string,
  ) => {
    setBookingStatus(value);
    setPage(1);
  };


  // =====================================
  // PREVIOUS PAGE
  // =====================================

  const handlePrevious = () => {
    setPage((current) =>
      Math.max(current - 1, 1),
    );
  };


  // =====================================
  // NEXT PAGE
  // =====================================

  const handleNext = () => {
    setPage((current) =>
      Math.min(
        current + 1,
        totalPages,
      ),
    );
  };


  // =====================================
  // REFRESH
  // =====================================

  const handleRefresh = () => {
    refetch();
  };


  // =====================================
  // LOADING
  // =====================================

  if (isLoading) {
    return (
      <div className="space-y-6 p-5">

        <div>
          <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />

          <div className="mt-2 h-4 w-72 animate-pulse rounded-md bg-muted" />
        </div>


        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item}>
              <CardContent className="p-6">
                <div className="h-16 animate-pulse rounded-md bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>


        <Card>
          <CardContent className="p-6">
            <div className="h-12 animate-pulse rounded-md bg-muted" />
          </CardContent>
        </Card>


        {[1, 2, 3].map((item) => (
          <Card key={item}>
            <CardContent className="p-6">
              <div className="h-40 animate-pulse rounded-md bg-muted" />
            </CardContent>
          </Card>
        ))}

      </div>
    );
  }


  // =====================================
  // ERROR
  // =====================================

  if (isError) {
    return (
      <div className="flex min-h-[500px] items-center justify-center p-5">

        <Card className="w-full max-w-md">

          <CardContent className="flex flex-col items-center py-12 text-center">

            <div className="mb-4 rounded-full bg-destructive/10 p-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>


            <h2 className="text-xl font-semibold">
              Failed to load orders
            </h2>


            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong while loading
              customer orders.
            </p>


            <Button
              onClick={handleRefresh}
              className="mt-6"
            >
              <RefreshCw className="mr-2 h-4 w-4" />

              Try Again
            </Button>

          </CardContent>

        </Card>

      </div>
    );
  }


  // =====================================
  // PAGE
  // =====================================

  return (
    <div className="space-y-6 p-5 pb-8">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-primary/10 p-2.5">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>


            <div>

              <h1 className="text-2xl font-bold tracking-tight">
                Orders
              </h1>

              <p className="text-sm text-muted-foreground">
                Manage and monitor customer orders.
              </p>

            </div>

          </div>

        </div>


        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={isFetching}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${
              isFetching
                ? "animate-spin"
                : ""
            }`}
          />

          Refresh
        </Button>

      </div>


      {/* ================================= */}
      {/* STATISTICS */}
      {/* ================================= */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total */}

        <Card>
          <CardContent className="p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">
                  Total Orders
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {meta?.total ?? 0}
                </p>

              </div>


              <div className="rounded-xl bg-primary/10 p-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>

            </div>

          </CardContent>
        </Card>


        {/* Paid */}

        <Card>
          <CardContent className="p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">
                  Paid Orders
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {statistics.paid}
                </p>

              </div>


              <div className="rounded-xl bg-emerald-500/10 p-3">
                <Package className="h-5 w-5 text-emerald-600" />
              </div>

            </div>

          </CardContent>
        </Card>


        {/* Pending */}

        <Card>
          <CardContent className="p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">
                  Pending Payment
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {statistics.pending}
                </p>

              </div>


              <div className="rounded-xl bg-amber-500/10 p-3">
                <Clock3 className="h-5 w-5 text-amber-600" />
              </div>

            </div>

          </CardContent>
        </Card>


        {/* Revenue */}

        <Card>
          <CardContent className="p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">
                  Current Page Revenue
                </p>

                <p className="mt-1 text-2xl font-bold">
                  ${statistics.revenue.toFixed(2)}
                </p>

              </div>


              <div className="rounded-xl bg-blue-500/10 p-3">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>

            </div>

          </CardContent>
        </Card>

      </div>


      {/* ================================= */}
      {/* FILTERS */}
      {/* ================================= */}

      <Card>

        <CardContent className="p-4">

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center">

            {/* SEARCH */}

            <div className="flex flex-1 gap-2">

              <div className="relative flex-1">

                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={searchInput}
                  onChange={(event) =>
                    setSearchInput(
                      event.target.value,
                    )
                  }
                  onKeyDown={
                    handleSearchKeyDown
                  }
                  placeholder="Search customer, email or phone..."
                  className="pl-9"
                />

              </div>


              <Button
                onClick={handleSearch}
                disabled={isFetching}
              >
                Search
              </Button>

            </div>


            {/* PAYMENT */}

            <select
              value={paymentStatus}
              onChange={(event) =>
                handlePaymentStatusChange(
                  event.target.value,
                )
              }
              className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {PAYMENT_STATUSES.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    Payment: {status}
                  </option>
                ),
              )}
            </select>


            {/* ORDER STATUS */}

            <select
              value={bookingStatus}
              onChange={(event) =>
                handleBookingStatusChange(
                  event.target.value,
                )
              }
              className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {ORDER_STATUSES.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    Order: {status}
                  </option>
                ),
              )}
            </select>


            {/* CLEAR */}

            {(search ||
              paymentStatus !== "ALL" ||
              bookingStatus !== "ALL") && (
              <Button
                variant="outline"
                onClick={handleClearFilters}
              >
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            )}

          </div>

        </CardContent>

      </Card>


      {/* ================================= */}
      {/* FETCHING INDICATOR */}
      {/* ================================= */}

      {isFetching && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">

          <RefreshCw className="h-4 w-4 animate-spin" />

          Updating orders...

        </div>
      )}


      {/* ================================= */}
      {/* NO ORDERS */}
      {/* ================================= */}

      {orders.length === 0 ? (

        <Card>

          <CardContent className="flex min-h-[350px] flex-col items-center justify-center text-center">

            <div className="rounded-full bg-muted p-5">
              <Package className="h-10 w-10 text-muted-foreground" />
            </div>


            <h3 className="mt-5 text-lg font-semibold">
              No orders found
            </h3>


            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              No customer orders match your
              current search or filters.
            </p>


            {(search ||
              paymentStatus !== "ALL" ||
              bookingStatus !== "ALL") && (
              <Button
                variant="outline"
                className="mt-5"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            )}

          </CardContent>

        </Card>

      ) : (

        /* ================================= */
        /* ORDERS */
        /* ================================= */

        <div className="space-y-4">

          {orders.map((order) => (

            <Card
              key={order._id}
              className="overflow-hidden transition-shadow hover:shadow-md"
            >

              {/* ORDER HEADER */}

              <CardHeader className="border-b bg-muted/20 px-5 py-4">

                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

                  <div className="flex items-center gap-3">

                    <div className="rounded-lg bg-primary/10 p-2">
                      <Package className="h-5 w-5 text-primary" />
                    </div>


                    <div>

                      <CardTitle className="text-base">
                        Order #
                        {order._id
                          .slice(-8)
                          .toUpperCase()}
                      </CardTitle>


                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(
                          order.createdAt,
                        )}{" "}
                        •{" "}
                        {formatTime(
                          order.createdAt,
                        )}
                      </p>

                    </div>

                  </div>


                  <div className="flex flex-wrap gap-2">

                    {getPaymentBadge(
                      order.paymentStatus,
                    )}

                    {getOrderBadge(
                      order.bookingStatus,
                    )}

                  </div>

                </div>

              </CardHeader>


              {/* ORDER BODY */}

              <CardContent className="p-5">

                <div className="grid gap-6 lg:grid-cols-[1fr_1fr_auto]">

                  {/* ================================= */}
                  {/* CUSTOMER */}
                  {/* ================================= */}

                  <div>

                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Customer
                    </p>


                    <div className="space-y-3">

                      {/* NAME */}

                      <div className="flex items-center gap-3">

                        <div className="rounded-full bg-muted p-2">
                          <User className="h-4 w-4" />
                        </div>


                        <div>

                          <p className="text-sm font-medium">
                            {order.user?.name ??
                              order.shippingAddress
                                ?.name ??
                              "Unknown Customer"}
                          </p>


                          <p className="text-xs text-muted-foreground">
                            Customer
                          </p>

                        </div>

                      </div>


                      {/* EMAIL */}

                      {order.user?.email && (
                        <div className="flex items-center gap-3 text-sm">

                          <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />

                          <span className="truncate">
                            {order.user.email}
                          </span>

                        </div>
                      )}


                      {/* PHONE */}

                      {(order.user?.phone ||
                        order.shippingAddress
                          ?.phone) && (

                        <div className="flex items-center gap-3 text-sm">

                          <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />

                          <span>
                            {order.user?.phone ||
                              order.shippingAddress
                                ?.phone}
                          </span>

                        </div>
                      )}

                    </div>

                  </div>


                  {/* ================================= */}
                  {/* DELIVERY */}
                  {/* ================================= */}

                  <div>

                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Delivery Address
                    </p>


                    <div className="flex gap-3">

                      <div className="rounded-full bg-muted p-2">
                        <MapPin className="h-4 w-4" />
                      </div>


                      <div className="text-sm">

                        <p className="font-medium">
                          {order.shippingAddress
                            ?.address ||
                            "Address not available"}
                        </p>


                        {order.shippingAddress
                          ?.city && (

                          <p className="mt-1 text-muted-foreground">
                            {
                              order.shippingAddress
                                .city
                            }

                            {order
                              .shippingAddress
                              .postalCode &&
                              ` - ${order.shippingAddress.postalCode}`}
                          </p>
                        )}


                        {order.shippingAddress
                          ?.country && (

                          <p className="text-muted-foreground">
                            {
                              order
                                .shippingAddress
                                .country
                            }
                          </p>
                        )}

                      </div>

                    </div>

                  </div>


                  {/* ================================= */}
                  {/* AMOUNT */}
                  {/* ================================= */}

                  <div className="rounded-xl border bg-muted/20 p-4 lg:min-w-[180px]">

                    <p className="text-xs text-muted-foreground">
                      Order Total
                    </p>


                    <p className="mt-1 text-2xl font-bold">
                      $
                      {Number(
                        order.totalAmount || 0,
                      ).toFixed(2)}
                    </p>


                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">

                      <ShoppingBag className="h-3.5 w-3.5" />

                      {order.items?.length ?? 0}{" "}

                      {order.items?.length === 1
                        ? "product"
                        : "products"}

                    </div>

                  </div>

                </div>


                {/* ================================= */}
                {/* PRODUCTS */}
                {/* ================================= */}

                {order.items?.length > 0 && (

                  <div className="mt-6 border-t pt-5">

                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Ordered Products
                    </p>


                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">

                      {order.items.map(
                        (item, index) => (

                          <div
                            key={`${order._id}-${index}`}
                            className="flex gap-3 rounded-xl border p-3"
                          >

                            {/* IMAGE */}

                            {item.image ? (

                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-16 w-16 shrink-0 rounded-lg object-cover"
                              />

                            ) : (

                              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted">

                                <Package className="h-6 w-6 text-muted-foreground" />

                              </div>
                            )}


                            {/* INFO */}

                            <div className="min-w-0 flex-1">

                              <p className="truncate text-sm font-medium">
                                {item.name}
                              </p>


                              <p className="mt-1 text-xs text-muted-foreground">
                                Qty:{" "}
                                {item.quantity}
                              </p>


                              {(item.size ||
                                item.color) && (

                                <p className="text-xs text-muted-foreground">

                                  {item.size &&
                                    `Size: ${item.size}`}

                                  {item.size &&
                                    item.color &&
                                    " • "}

                                  {item.color &&
                                    `Color: ${item.color}`}

                                </p>
                              )}


                              <p className="mt-1 text-sm font-semibold">
                                $
                                {Number(
                                  item.subtotal ??
                                    item.price *
                                      item.quantity,
                                ).toFixed(2)}
                              </p>

                            </div>

                          </div>

                        ),
                      )}

                    </div>

                  </div>
                )}

              </CardContent>

            </Card>

          ))}

        </div>
      )}


      {/* ================================= */}
      {/* PAGINATION */}
      {/* ================================= */}

      {meta && meta.total > 0 && (

        <Card>

          <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">

            {/* RESULT INFO */}

            <div className="text-sm text-muted-foreground">

              Showing{" "}

              <span className="font-medium text-foreground">
                {(page - 1) * limit + 1}
              </span>

              {" "} - {" "}

              <span className="font-medium text-foreground">
                {Math.min(
                  page * limit,
                  meta.total,
                )}
              </span>

              {" "} of {" "}

              <span className="font-medium text-foreground">
                {meta.total}
              </span>

              {" "} orders

            </div>


            {/* PAGINATION CONTROLS */}

            <div className="flex flex-wrap items-center gap-2">

              {/* PAGE SIZE */}

              <select
                value={limit}
                onChange={(event) =>
                  handleLimitChange(
                    Number(
                      event.target.value,
                    ),
                  )
                }
                className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >

                {PAGE_SIZE_OPTIONS.map(
                  (size) => (
                    <option
                      key={size}
                      value={size}
                    >
                      {size} / page
                    </option>
                  ),
                )}

              </select>


              {/* PREVIOUS */}

              <Button
                variant="outline"
                size="icon"
                onClick={
                  handlePrevious
                }
                disabled={
                  page === 1 ||
                  isFetching
                }
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>


              {/* CURRENT PAGE */}

              <div className="flex h-9 min-w-10 items-center justify-center rounded-md border px-3 text-sm font-medium">
                {page}
              </div>


              <span className="text-sm text-muted-foreground">
                of {totalPages}
              </span>


              {/* NEXT */}

              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={
                  page >= totalPages ||
                  isFetching
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

            </div>

          </CardContent>

        </Card>
      )}

    </div>
  );
};


export default OrdersStats;

