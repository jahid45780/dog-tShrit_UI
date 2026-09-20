
import {
  AlertTriangle,
  ArrowUpRight,
  Box,
  CheckCircle2,
  Clock3,
  CreditCard,
  Package,
  ShoppingBag,
  Star,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetBookingStatsQuery, useGetPaymentStatsQuery, useGetProductStatsQuery, useGetUserOverviewStatsQuery } from "@/redux/features/stats/adminStats/admin.stats.api";





const AdminDashboard = () => {

  /* =========================================================
     API
  ========================================================= */

  const {
    data: userResponse,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserOverviewStatsQuery();


  const {
    data: productResponse,
    isLoading: productLoading,
    isError: productError,
  } = useGetProductStatsQuery();


  const {
    data: bookingResponse,
    isLoading: bookingLoading,
    isError: bookingError,
  } = useGetBookingStatsQuery();


  const {
    data: paymentResponse,
    isLoading: paymentLoading,
    isError: paymentError,
  } = useGetPaymentStatsQuery();


  /* =========================================================
     LOADING
  ========================================================= */

  const isLoading =
    userLoading ||
    productLoading ||
    bookingLoading ||
    paymentLoading;


  /* =========================================================
     ERROR
  ========================================================= */

  const hasError =
    userError ||
    productError ||
    bookingError ||
    paymentError;


  /* =========================================================
     DATA
  ========================================================= */

  const users =
    userResponse?.data;

  const products =
    productResponse?.data;

  const bookings =
    bookingResponse?.data;

  const payments =
    paymentResponse?.data;


  /* =========================================================
     LOADING UI
  ========================================================= */

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fb]">

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          

          <div className="mb-6">

            <div className="h-9 w-64 animate-pulse rounded-lg bg-gray-200" />

            <div className="mt-3 h-4 w-96 animate-pulse rounded bg-gray-200" />

          </div>


          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {Array.from({ length: 8 }).map(
              (_, index) => (

                <Card
                  key={index}
                  className="rounded-3xl border-0 shadow-sm"
                >

                  <CardContent className="p-6">

                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

                    <div className="mt-4 h-9 w-24 animate-pulse rounded bg-gray-200" />

                    <div className="mt-3 h-3 w-32 animate-pulse rounded bg-gray-200" />

                  </CardContent>

                </Card>

              ),
            )}

          </div>


          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            <div className="h-[380px] animate-pulse rounded-3xl bg-gray-200" />

            <div className="h-[380px] animate-pulse rounded-3xl bg-gray-200" />

          </div>

        </div>

      </div>
    );
  }


  /* =========================================================
     ERROR UI
  ========================================================= */

  if (
    hasError ||
    !users ||
    !products ||
    !bookings ||
    !payments
  ) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f8f9fb] px-4">

        <Card className="max-w-lg rounded-3xl border-0 shadow-xl">

          <CardContent className="p-10 text-center">

            <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />

            <h2 className="mt-5 text-2xl font-bold text-gray-950">
              Failed to load dashboard
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Some dashboard statistics could not be loaded.
            </p>

          </CardContent>

        </Card>

      </div>
    );
  }


  /* =========================================================
     USER ROLE CHART
  ========================================================= */

  const userRoleChartData =
    users.usersByRole.map(
      (item:any) => ({
        name: item._id,
        value: item.count,
      }),
    );


  /* =========================================================
     PRODUCT CATEGORY CHART
  ========================================================= */

  const productCategoryChartData =
    products.productsByCategory.map(
      (item:any) => ({
        name: item._id || "Unknown",
        value: item.count,
      }),
    );


  /* =========================================================
     BOOKING STATUS CHART
  ========================================================= */

  const bookingStatusChartData = [
    {
      name: "Confirmed",
      value: bookings.confirmedBookings,
    },
    {
      name: "Pending",
      value: bookings.pendingBookings,
    },
    {
      name: "Cancelled",
      value: bookings.cancelledBookings,
    },
  ];


  /* =========================================================
     PAYMENT STATUS CHART
  ========================================================= */

  const paymentStatusChartData = [
    {
      name: "Paid",
      value: payments.paidPayments,
    },
    {
      name: "Pending",
      value: payments.pendingPayments,
    },
    {
      name: "Failed",
      value: payments.failedPayments,
    },
  ];


  /* =========================================================
     CURRENCY
  ========================================================= */

  const formatCurrency = (
    value: number,
  ) => {
    return `$${Number(value).toFixed(2)}`;
  };


  /* =========================================================
     DATE
  ========================================================= */

  const formatDate = (
    date?: string,
  ) => {

    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    );
  };


  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#f8f9fb]">

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">


        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="mb-7">

          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
            Admin Panel
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Overview of your AtNamira Pet Shop.
          </p>

        </div>


        {/* ===================================================
            TOP STATS
        =================================================== */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">


          {/* USERS */}

          <Card className="group rounded-3xl border-0 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

            <CardContent className="p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Total Users
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-950">
                    {users.totalUsers}
                  </h2>

                  <p className="mt-2 flex items-center text-xs text-green-600">

                    <ArrowUpRight className="mr-1 h-3.5 w-3.5" />

                    +{users.newUsersLast7Days} last 7 days

                  </p>

                </div>


                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">

                  <Users className="h-5 w-5 text-blue-600" />

                </div>

              </div>

            </CardContent>

          </Card>


          {/* PRODUCTS */}

          <Card className="group rounded-3xl border-0 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

            <CardContent className="p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Total Products
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-950">
                    {products.totalProducts}
                  </h2>

                  <p className="mt-2 text-xs text-gray-500">
                    {products.activeProducts} active products
                  </p>

                </div>


                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">

                  <Package className="h-5 w-5 text-orange-600" />

                </div>

              </div>

            </CardContent>

          </Card>


          {/* BOOKINGS */}

          <Card className="group rounded-3xl border-0 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

            <CardContent className="p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Total Orders
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-950">
                    {bookings.totalBookings}
                  </h2>

                  <p className="mt-2 text-xs text-gray-500">
                    {bookings.bookingsLast30Days} in last 30 days
                  </p>

                </div>


                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50">

                  <ShoppingBag className="h-5 w-5 text-purple-600" />

                </div>

              </div>

            </CardContent>

          </Card>


          {/* REVENUE */}

          <Card className="group rounded-3xl border-0 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

            <CardContent className="p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Total Revenue
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-950">
                    {formatCurrency(
                      payments.totalRevenue,
                    )}
                  </h2>

                  <p className="mt-2 text-xs text-green-600">
                    From paid orders
                  </p>

                </div>


                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">

                  <TrendingUp className="h-5 w-5 text-green-600" />

                </div>

              </div>

            </CardContent>

          </Card>

        </div>


        {/* ===================================================
            SECOND STATS
        =================================================== */}

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">


          {/* ACTIVE USERS */}

          <Card className="rounded-3xl border-0 shadow-sm">

            <CardContent className="p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">

                  <CheckCircle2 className="h-5 w-5 text-green-600" />

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Active Users
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-950">
                    {users.totalActiveUsers}
                  </p>

                </div>

              </div>

            </CardContent>

          </Card>


          {/* LOW STOCK */}

          <Card className="rounded-3xl border-0 shadow-sm">

            <CardContent className="p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50">

                  <AlertTriangle className="h-5 w-5 text-yellow-600" />

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Low Stock
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-950">
                    {products.lowStockProducts}
                  </p>

                </div>

              </div>

            </CardContent>

          </Card>


          {/* OUT OF STOCK */}

          <Card className="rounded-3xl border-0 shadow-sm">

            <CardContent className="p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">

                  <Box className="h-5 w-5 text-red-600" />

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Out of Stock
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-950">
                    {products.outOfStockProducts}
                  </p>

                </div>

              </div>

            </CardContent>

          </Card>


          {/* CUSTOMERS */}

          <Card className="rounded-3xl border-0 shadow-sm">

            <CardContent className="p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">

                  <Users className="h-5 w-5 text-blue-600" />

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Unique Customers
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-950">
                    {bookings.uniqueCustomers}
                  </p>

                </div>

              </div>

            </CardContent>

          </Card>

        </div>


        {/* ===================================================
            CHARTS
        =================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">


          {/* BOOKING STATUS */}

          <Card className="rounded-3xl border-0 shadow-sm">

            <CardHeader>

              <CardTitle className="flex items-center gap-2">

                <ShoppingBag className="h-5 w-5 text-orange-600" />

                Order Overview

              </CardTitle>

              <p className="text-sm text-gray-500">
                Current order status
              </p>

            </CardHeader>


            <CardContent>

              <div className="h-[330px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={bookingStatusChartData}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      allowDecimals={false}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      name="Orders"
                      fill="#f97316"
                      radius={[
                        8,
                        8,
                        0,
                        0,
                      ]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </CardContent>

          </Card>


          {/* PAYMENT */}

          <Card className="rounded-3xl border-0 shadow-sm">

            <CardHeader>

              <CardTitle className="flex items-center gap-2">

                <CreditCard className="h-5 w-5 text-orange-600" />

                Payment Overview

              </CardTitle>

              <p className="text-sm text-gray-500">
                Payment status distribution
              </p>

            </CardHeader>


            <CardContent>

              <div className="h-[330px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={paymentStatusChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="45%"
                      innerRadius={70}
                      outerRadius={105}
                      paddingAngle={4}
                    >

                      {paymentStatusChartData.map(
                        (_, index) => (

                          <Cell
                            key={index}
                            fill={
                              [
                                "#22c55e",
                                "#eab308",
                                "#ef4444",
                              ][index]
                            }
                          />

                        ),
                      )}

                    </Pie>

                    <Tooltip />

                    <Legend
                      verticalAlign="bottom"
                    />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </CardContent>

          </Card>

        </div>


        {/* ===================================================
            USER + PRODUCT CHARTS
        =================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">


          {/* USER ROLES */}

          <Card className="rounded-3xl border-0 shadow-sm">

            <CardHeader>

              <CardTitle className="flex items-center gap-2">

                <Users className="h-5 w-5 text-blue-600" />

                Users by Role

              </CardTitle>

            </CardHeader>


            <CardContent>

              <div className="h-[300px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={userRoleChartData}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      allowDecimals={false}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      name="Users"
                      fill="#3b82f6"
                      radius={[
                        8,
                        8,
                        0,
                        0,
                      ]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </CardContent>

          </Card>


          {/* PRODUCT CATEGORY */}

          <Card className="rounded-3xl border-0 shadow-sm">

            <CardHeader>

              <CardTitle className="flex items-center gap-2">

                <Package className="h-5 w-5 text-orange-600" />

                Products by Category

              </CardTitle>

            </CardHeader>


            <CardContent>

              <div className="h-[300px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={productCategoryChartData}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      allowDecimals={false}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      name="Products"
                      fill="#f97316"
                      radius={[
                        8,
                        8,
                        0,
                        0,
                      ]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </CardContent>

          </Card>

        </div>


        {/* ===================================================
            PAYMENT SUMMARY
        =================================================== */}

        <Card className="mt-6 rounded-3xl border-0 shadow-sm">

          <CardHeader>

            <CardTitle>
              Payment Summary
            </CardTitle>

          </CardHeader>


          <CardContent>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


              {/* PAID */}

              <div className="rounded-2xl bg-green-50 p-5">

                <p className="text-sm font-medium text-green-700">
                  Paid Payments
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-950">
                  {payments.paidPayments}
                </p>

              </div>


              {/* PENDING */}

              <div className="rounded-2xl bg-yellow-50 p-5">

                <p className="text-sm font-medium text-yellow-700">
                  Pending Payments
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-950">
                  {payments.pendingPayments}
                </p>

              </div>


              {/* FAILED */}

              <div className="rounded-2xl bg-red-50 p-5">

                <p className="text-sm font-medium text-red-700">
                  Failed Payments
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-950">
                  {payments.failedPayments}
                </p>

              </div>


              {/* AVERAGE */}

              <div className="rounded-2xl bg-blue-50 p-5">

                <p className="text-sm font-medium text-blue-700">
                  Average Payment
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-950">
                  {formatCurrency(
                    payments.averagePaymentAmount,
                  )}
                </p>

              </div>

            </div>

          </CardContent>

        </Card>


        {/* ===================================================
            INVENTORY SUMMARY
        =================================================== */}

        <Card className="mt-6 rounded-3xl border-0 shadow-sm">

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <Package className="h-5 w-5 text-orange-600" />

              Inventory Summary

            </CardTitle>

          </CardHeader>


          <CardContent>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


              <div className="rounded-2xl bg-gray-50 p-5">

                <p className="text-sm text-gray-500">
                  Total Stock
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-950">
                  {products.totalStock}
                </p>

              </div>


              <div className="rounded-2xl bg-green-50 p-5">

                <p className="text-sm text-green-700">
                  Active Products
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-950">
                  {products.activeProducts}
                </p>

              </div>


              <div className="rounded-2xl bg-yellow-50 p-5">

                <p className="text-sm text-yellow-700">
                  Low Stock
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-950">
                  {products.lowStockProducts}
                </p>

              </div>


              <div className="rounded-2xl bg-red-50 p-5">

                <p className="text-sm text-red-700">
                  Out of Stock
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-950">
                  {products.outOfStockProducts}
                </p>

              </div>

            </div>

          </CardContent>

        </Card>


        {/* ===================================================
            TOP PRODUCTS
        =================================================== */}

        <Card className="mt-6 rounded-3xl border-0 shadow-sm">

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <Star className="h-5 w-5 text-orange-500" />

              Top Products

            </CardTitle>

            <p className="text-sm text-gray-500">
              Highest rated active products
            </p>

          </CardHeader>


          <CardContent>

            {products.topProducts.length === 0 ? (

              <div className="py-10 text-center">

                <Package className="mx-auto h-10 w-10 text-gray-300" />

                <p className="mt-3 text-sm text-gray-500">
                  No products available.
                </p>

              </div>

            ) : (

              <div className="space-y-3">

                {products.topProducts.map(
                  (product:any) => (

                    <div
                      key={product._id}
                      className="flex items-center justify-between rounded-2xl border border-gray-100 p-4"
                    >

                      <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gray-100">

                          {product.images?.main ? (

                            <img
                              src={product.images.main}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />

                          ) : (

                            <Package className="h-5 w-5 text-gray-400" />

                          )}

                        </div>


                        <div>

                          <h3 className="font-semibold text-gray-950">
                            {product.name}
                          </h3>

                          <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">

                            <span className="flex items-center gap-1">

                              <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />

                              {product.rating ?? 0}

                            </span>

                            <span>
                              {product.reviews ?? 0} reviews
                            </span>

                            <span>
                              Stock: {product.stock}
                            </span>

                          </div>

                        </div>

                      </div>


                      <p className="font-bold text-gray-950">

                        {formatCurrency(
                          product.price,
                        )}

                      </p>

                    </div>

                  ),
                )}

              </div>

            )}

          </CardContent>

        </Card>


        {/* ===================================================
            RECENT ORDERS
        =================================================== */}

        <Card className="mt-6 rounded-3xl border-0 shadow-sm">

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <Clock3 className="h-5 w-5 text-orange-600" />

              Recent Orders

            </CardTitle>

            <p className="text-sm text-gray-500">
              Latest customer orders
            </p>

          </CardHeader>


          <CardContent>

            {bookings.recentBookings.length === 0 ? (

              <div className="py-10 text-center">

                <ShoppingBag className="mx-auto h-10 w-10 text-gray-300" />

                <p className="mt-3 text-sm text-gray-500">
                  No orders yet.
                </p>

              </div>

            ) : (

              <div className="space-y-3">

                {bookings.recentBookings.map(
                  (booking:any) => (

                    <div
                      key={booking._id}
                      className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                    >

                      <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">

                          <ShoppingBag className="h-5 w-5 text-orange-600" />

                        </div>


                        <div>

                          <p className="font-semibold text-gray-950">

                            Order #
                            {booking._id
                              .slice(-8)
                              .toUpperCase()}

                          </p>

                          <p className="mt-1 text-xs text-gray-500">

                            {typeof booking.user === "object"
                              ? booking.user.name
                              : "Customer"}

                            {" • "}

                            {formatDate(
                              booking.createdAt,
                            )}

                          </p>

                        </div>

                      </div>


                      <div className="flex items-center gap-4">

                        <div className="text-right">

                          <p className="font-bold text-gray-950">
                            {formatCurrency(
                              booking.totalAmount,
                            )}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {booking.bookingStatus}
                          </p>

                        </div>


                        {booking.paymentStatus ===
                        "PAID" ? (

                          <CheckCircle2 className="h-5 w-5 text-green-500" />

                        ) : booking.paymentStatus ===
                          "PENDING" ? (

                          <Clock3 className="h-5 w-5 text-yellow-500" />

                        ) : (

                          <XCircle className="h-5 w-5 text-red-500" />

                        )}

                      </div>

                    </div>

                  ),
                )}

              </div>

            )}

          </CardContent>

        </Card>


      </main>

    </div>
  );
};


export default AdminDashboard;