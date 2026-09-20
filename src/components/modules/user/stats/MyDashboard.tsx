import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  Package,
  ShoppingBag,
  TrendingUp,
  UserRound,
  XCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

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

import { Button } from "@/components/ui/button";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

import {
  useGetUserStatsQuery,
} from "@/redux/features/stats/stats.api";


const MyDashboard = () => {
  // =========================================================
  // USER INFO
  // =========================================================

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useUserInfoQuery(undefined);


  // =========================================================
  // USER STATS
  // =========================================================

  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
    refetch,
  } = useGetUserStatsQuery(undefined);


  const user = userData?.data;
  const stats = statsData?.data;


  // =========================================================
  // LOADING
  // =========================================================

  const isLoading =
    userLoading || statsLoading;


  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fb]">

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          {/* Header Skeleton */}

          <div className="overflow-hidden rounded-3xl bg-gray-900 p-6 shadow-xl sm:p-8">

            <div className="flex items-center gap-5">

              <div className="h-16 w-16 animate-pulse rounded-2xl bg-gray-700" />

              <div className="space-y-3">

                <div className="h-4 w-32 animate-pulse rounded bg-gray-700" />

                <div className="h-8 w-64 animate-pulse rounded bg-gray-700" />

                <div className="h-4 w-48 animate-pulse rounded bg-gray-700" />

              </div>

            </div>

          </div>


          {/* Stats Skeleton */}

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {Array.from({ length: 4 }).map(
              (_, index) => (
                <Card
                  key={index}
                  className="rounded-3xl border-0 shadow-sm"
                >
                  <CardContent className="p-6">

                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

                    <div className="mt-4 h-9 w-20 animate-pulse rounded bg-gray-200" />

                    <div className="mt-3 h-3 w-32 animate-pulse rounded bg-gray-200" />

                  </CardContent>
                </Card>
              ),
            )}

          </div>


          {/* Chart Skeleton */}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            <Card className="rounded-3xl border-0 shadow-sm">
              <CardContent className="h-[360px] animate-pulse rounded-3xl bg-gray-100" />
            </Card>

            <Card className="rounded-3xl border-0 shadow-sm">
              <CardContent className="h-[360px] animate-pulse rounded-3xl bg-gray-100" />
            </Card>

          </div>

        </div>

      </div>
    );
  }


  // =========================================================
  // ERROR
  // =========================================================

  if (
    statsError ||
    userError ||
    !stats ||
    !user
  ) {
    return (
      <div className="min-h-screen bg-[#f8f9fb]">

        <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-4">

          <Card className="w-full rounded-3xl border-0 shadow-xl">

            <CardContent className="flex flex-col items-center justify-center p-10 text-center">

              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">

                <AlertCircle className="h-8 w-8 text-red-500" />

              </div>

              <h2 className="text-2xl font-bold text-gray-950">
                Unable to load dashboard
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                Something went wrong while loading your
                account information or dashboard statistics.
              </p>

              <Button
                onClick={() => refetch()}
                className="mt-6 rounded-xl bg-gray-950 px-6 hover:bg-orange-600"
              >
                Try Again
              </Button>

            </CardContent>

          </Card>

        </div>

      </div>
    );
  }


  // =========================================================
  // VALUES
  // =========================================================

  const totalBookings =
    stats.totalBookings ?? 0;

  const pendingBookings =
    stats.pendingBookings ?? 0;

  const confirmedBookings =
    stats.confirmedBookings ?? 0;

  const cancelledBookings =
    stats.cancelledBookings ?? 0;

  const totalSpent =
    stats.totalSpent ?? 0;

  const paidPayments =
    stats.payments?.paid ?? 0;

  const pendingPayments =
    stats.payments?.pending ?? 0;

  const failedPayments =
    stats.payments?.failed ?? 0;

  const bookings =
    stats.bookings ?? [];

  const productHistory =
    stats.productHistory ?? [];

  const recentBookings =
    bookings.slice(0, 5);

  const recentProducts =
    productHistory.slice(0, 5);


  // =========================================================
  // USER INFO
  // =========================================================

  const userName =
    user?.name ?? "User";

  const userEmail =
    user?.email ?? "No email available";

  const userRole =
    user?.role ?? "USER";

  const accountCreatedAt =
    user?.createdAt;


  // =========================================================
  // HELPERS
  // =========================================================

  const formatDate = (
    date?: string,
  ) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    );
  };


  const formatCurrency = (
    amount: number,
  ) => {
    return `$${Number(amount).toFixed(2)}`;
  };


  // =========================================================
  // ORDER CHART DATA
  // =========================================================

  const orderChartData = [
    {
      name: "Confirmed",
      value: confirmedBookings,
    },
    {
      name: "Pending",
      value: pendingBookings,
    },
    {
      name: "Cancelled",
      value: cancelledBookings,
    },
  ];


  // =========================================================
  // PAYMENT CHART DATA
  // =========================================================

  const paymentChartData = [
    {
      name: "Paid",
      value: paidPayments,
    },
    {
      name: "Pending",
      value: pendingPayments,
    },
    {
      name: "Failed",
      value: failedPayments,
    },
  ];


  // =========================================================
  // PAYMENT BADGE
  // =========================================================

  const getPaymentBadge = (
    status: string,
  ) => {

    switch (status) {

      case "PAID":
        return (
          <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">

            <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />

            Paid

          </span>
        );


      case "PENDING":
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700">

            <Clock3 className="mr-1.5 h-3.5 w-3.5" />

            Pending

          </span>
        );


      case "FAILED":
        return (
          <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">

            <XCircle className="mr-1.5 h-3.5 w-3.5" />

            Failed

          </span>
        );


      default:
        return null;
    }
  };


  // =========================================================
  // BOOKING BADGE
  // =========================================================

  const getBookingBadge = (
    status: string,
  ) => {

    switch (status) {

      case "CONFIRMED":
        return (
          <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
            Confirmed
          </span>
        );


      case "PENDING":
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700">
            Pending
          </span>
        );


      case "CANCELLED":
        return (
          <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
            Cancelled
          </span>
        );


      default:
        return null;
    }
  };


  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-[#f8f9fb]">

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">


        {/* ===================================================
            PREMIUM USER HEADER
        =================================================== */}

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-orange-950 p-6 text-white shadow-xl sm:p-8">

          {/* Decorative circles */}

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />


          <div className="relative z-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-center">


            {/* USER */}

            <div className="flex items-center gap-4 sm:gap-5">

              {/* Avatar */}

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-2xl font-bold text-white shadow-lg sm:h-20 sm:w-20 sm:text-3xl">

                {userName
                  .charAt(0)
                  .toUpperCase()}

              </div>


              {/* User Details */}

              <div>

                <div className="flex flex-wrap items-center gap-2">

                  <p className="text-sm font-medium text-orange-300">
                    Atnamira Pet Shop
                  </p>

                  <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-300">
                    {userRole}
                  </span>

                </div>


                <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                  Welcome back, {userName} 👋
                </h1>


                <p className="mt-1 text-sm text-gray-300">
                  {userEmail}
                </p>


                <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">

                  <UserRound className="h-3.5 w-3.5" />

                  Member since{" "}

                  {formatDate(
                    accountCreatedAt,
                  )}

                </p>

              </div>

            </div>


            {/* ACTIONS */}

            <div className="flex flex-wrap gap-3">

              <Link to="/user/my-card">

                <Button
                  variant="outline"
                  className="rounded-xl border-white/20 bg-white/10 text-white hover:bg-white hover:text-gray-950"
                >

                  <ShoppingBag className="mr-2 h-4 w-4" />

                  My Cart

                </Button>

              </Link>


              <Link to="/my-bookings">

                <Button className="rounded-xl bg-orange-500 text-white shadow-lg hover:bg-orange-600">

                  My Orders

                  <ArrowRight className="ml-2 h-4 w-4" />

                </Button>

              </Link>

            </div>

          </div>

        </section>


        {/* ===================================================
            USER INFORMATION CARD
        =================================================== */}

        <Card className="mt-6 rounded-3xl border-0 shadow-sm">

          <CardContent className="p-5 sm:p-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">


              {/* Avatar */}

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-xl font-bold text-orange-600">

                {userName
                  .charAt(0)
                  .toUpperCase()}

              </div>


              {/* Name */}

              <div className="flex-1">

                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Account
                </p>

                <h2 className="mt-1 text-lg font-bold text-gray-950">
                  {userName}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {userEmail}
                </p>

              </div>


              {/* Account Info */}

              <div className="grid grid-cols-2 gap-8">

                <div>

                  <p className="text-xs text-gray-400">
                    Account Type
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {userRole}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-gray-400">
                    Member Since
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {formatDate(
                      accountCreatedAt,
                    )}
                  </p>

                </div>

              </div>

            </div>

          </CardContent>

        </Card>


        {/* ===================================================
            STAT CARDS
        =================================================== */}

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">


          {/* Total Orders */}

          <Card className="group rounded-3xl border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <CardContent className="p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Total Orders
                  </p>

                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950">
                    {totalBookings}
                  </h2>

                  <p className="mt-2 text-xs text-gray-400">
                    All your orders
                  </p>

                </div>


                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 transition-transform duration-300 group-hover:scale-110">

                  <Package className="h-5 w-5 text-orange-600" />

                </div>

              </div>

            </CardContent>

          </Card>


          {/* Total Spent */}

          <Card className="group rounded-3xl border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <CardContent className="p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Total Spent
                  </p>

                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950">
                    {formatCurrency(totalSpent)}
                  </h2>

                  <p className="mt-2 text-xs text-gray-400">
                    Successfully paid
                  </p>

                </div>


                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 transition-transform duration-300 group-hover:scale-110">

                  <TrendingUp className="h-5 w-5 text-green-600" />

                </div>

              </div>

            </CardContent>

          </Card>


          {/* Confirmed */}

          <Card className="group rounded-3xl border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <CardContent className="p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Confirmed Orders
                  </p>

                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950">
                    {confirmedBookings}
                  </h2>

                  <p className="mt-2 text-xs text-gray-400">
                    Successfully confirmed
                  </p>

                </div>


                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 transition-transform duration-300 group-hover:scale-110">

                  <CheckCircle2 className="h-5 w-5 text-purple-600" />

                </div>

              </div>

            </CardContent>

          </Card>


          {/* Pending */}

          <Card className="group rounded-3xl border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <CardContent className="p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Pending Orders
                  </p>

                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950">
                    {pendingBookings}
                  </h2>

                  <p className="mt-2 text-xs text-gray-400">
                    Waiting for processing
                  </p>

                </div>


                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 transition-transform duration-300 group-hover:scale-110">

                  <Clock3 className="h-5 w-5 text-yellow-600" />

                </div>

              </div>

            </CardContent>

          </Card>

        </div>


        {/* ===================================================
            CHARTS
        =================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">


          {/* ORDER ACTIVITY */}

          <Card className="rounded-3xl border-0 shadow-sm">

            <CardHeader className="pb-2">

              <CardTitle className="flex items-center gap-2 text-lg">

                <Package className="h-5 w-5 text-orange-600" />

                Order Activity

              </CardTitle>

              <p className="text-sm text-gray-500">
                Overview of your order status
              </p>

            </CardHeader>


            <CardContent>

              <div className="h-[320px] w-full">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={orderChartData}
                    margin={{
                      top: 20,
                      right: 10,
                      left: -20,
                      bottom: 5,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#eeeeee"
                    />

                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 12,
                      }}
                    />

                    <YAxis
                      allowDecimals={false}
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 12,
                      }}
                    />

                    <Tooltip
                      cursor={{
                        fill: "rgba(249,115,22,0.04)",
                      }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #eeeeee",
                        boxShadow:
                          "0 10px 30px rgba(0,0,0,0.08)",
                      }}
                    />

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
                      barSize={45}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </CardContent>

          </Card>


          {/* PAYMENT OVERVIEW */}

          <Card className="rounded-3xl border-0 shadow-sm">

            <CardHeader className="pb-2">

              <CardTitle className="flex items-center gap-2 text-lg">

                <CreditCard className="h-5 w-5 text-orange-600" />

                Payment Overview

              </CardTitle>

              <p className="text-sm text-gray-500">
                Your payment activity
              </p>

            </CardHeader>


            <CardContent>

              <div className="h-[320px] w-full">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={paymentChartData}
                      cx="50%"
                      cy="45%"
                      innerRadius={75}
                      outerRadius={105}
                      paddingAngle={4}
                      dataKey="value"
                      nameKey="name"
                    >

                      {paymentChartData.map(
                        (_, index) => (
                          <Cell
                            key={`cell-${index}`}
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

                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #eeeeee",
                        boxShadow:
                          "0 10px 30px rgba(0,0,0,0.08)",
                      }}
                    />

                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                    />

                  </PieChart>

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

            <CardTitle className="flex items-center gap-2">

              <CreditCard className="h-5 w-5 text-orange-600" />

              Payment Summary

            </CardTitle>

          </CardHeader>


          <CardContent>

            <div className="grid gap-4 sm:grid-cols-3">


              {/* Paid */}

              <div className="rounded-2xl bg-green-50 p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-green-700">
                      Paid
                    </p>

                    <p className="mt-2 text-3xl font-bold text-gray-950">
                      {paidPayments}
                    </p>

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">

                    <CheckCircle2 className="h-5 w-5 text-green-600" />

                  </div>

                </div>

              </div>


              {/* Pending */}

              <div className="rounded-2xl bg-yellow-50 p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-yellow-700">
                      Pending
                    </p>

                    <p className="mt-2 text-3xl font-bold text-gray-950">
                      {pendingPayments}
                    </p>

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">

                    <Clock3 className="h-5 w-5 text-yellow-600" />

                  </div>

                </div>

              </div>


              {/* Failed */}

              <div className="rounded-2xl bg-red-50 p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-red-700">
                      Failed
                    </p>

                    <p className="mt-2 text-3xl font-bold text-gray-950">
                      {failedPayments}
                    </p>

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">

                    <XCircle className="h-5 w-5 text-red-600" />

                  </div>

                </div>

              </div>

            </div>


            {/* Total */}

            <div className="mt-5 flex flex-col justify-between gap-3 rounded-2xl bg-gray-50 p-5 sm:flex-row sm:items-center">

              <div>

                <p className="text-sm text-gray-500">
                  Total Paid Amount
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Amount spent on successful orders
                </p>

              </div>

              <p className="text-2xl font-bold text-gray-950">
                {formatCurrency(totalSpent)}
              </p>

            </div>

          </CardContent>

        </Card>


        {/* ===================================================
            RECENT ORDERS
        =================================================== */}

        <Card className="mt-6 rounded-3xl border-0 shadow-sm">

          <CardHeader>

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <div>

                <CardTitle className="flex items-center gap-2">

                  <ShoppingBag className="h-5 w-5 text-orange-600" />

                  Recent Orders

                </CardTitle>

                <p className="mt-1 text-sm text-gray-500">
                  Your latest shopping activity
                </p>

              </div>


              <Link to="/my-bookings">

                <Button
                  variant="ghost"
                  className="rounded-xl text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                >

                  View All

                  <ArrowRight className="ml-2 h-4 w-4" />

                </Button>

              </Link>

            </div>

          </CardHeader>


          <CardContent>

            {recentBookings.length === 0 ? (

              <div className="rounded-2xl border border-dashed p-10 text-center">

                <Package className="mx-auto h-10 w-10 text-gray-300" />

                <h3 className="mt-4 font-semibold text-gray-900">
                  No orders yet
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Your orders will appear here.
                </p>


                {/* GO TO SHOP */}

                <Link to="/shop">

                  <Button className="mt-5 rounded-xl bg-gray-950 hover:bg-orange-600">
                    Start Shopping
                  </Button>

                </Link>

              </div>

            ) : (

              <div className="space-y-3">

                {recentBookings.map(
                  (booking) => (

                    <div
                      key={booking._id}
                      className="group flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 transition-all hover:border-orange-100 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                    >

                      {/* Order Info */}

                      <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50">

                          <Package className="h-5 w-5 text-orange-600" />

                        </div>


                        <div>

                          <p className="font-semibold text-gray-950">

                            Order #

                            {booking._id
                              .slice(-8)
                              .toUpperCase()}

                          </p>

                          <p className="mt-1 text-xs text-gray-500">

                            {formatDate(
                              booking.createdAt,
                            )}

                          </p>

                          <p className="mt-1 text-xs text-gray-500">

                            {booking.items?.length ?? 0} item(s)

                          </p>

                        </div>

                      </div>


                      {/* Order Status */}

                      <div className="flex flex-wrap items-center gap-2 sm:justify-end">

                        {getPaymentBadge(
                          booking.paymentStatus,
                        )}

                        {getBookingBadge(
                          booking.bookingStatus,
                        )}

                        <p className="ml-1 font-bold text-gray-950">

                          {formatCurrency(
                            booking.totalAmount,
                          )}

                        </p>


                        <Link
                          to={`/my-bookings/${booking._id}`}
                        >

                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl"
                          >

                            View

                            <ArrowRight className="ml-2 h-3.5 w-3.5" />

                          </Button>

                        </Link>

                      </div>

                    </div>

                  ),
                )}

              </div>

            )}

          </CardContent>

        </Card>


        {/* ===================================================
            PURCHASE HISTORY
        =================================================== */}

        <Card className="mt-6 rounded-3xl border-0 shadow-sm">

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <TrendingUp className="h-5 w-5 text-orange-600" />

              Purchase History

            </CardTitle>

            <p className="mt-1 text-sm text-gray-500">
              Your most purchased products
            </p>

          </CardHeader>


          <CardContent>

            {recentProducts.length === 0 ? (

              <div className="rounded-2xl border border-dashed p-8 text-center">

                <Package className="mx-auto h-9 w-9 text-gray-300" />

                <p className="mt-3 text-sm text-gray-500">
                  No paid product history yet.
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[600px]">

                  <thead>

                    <tr className="border-b text-left">

                      <th className="pb-4 text-sm font-semibold text-gray-600">
                        Product
                      </th>

                      <th className="pb-4 text-sm font-semibold text-gray-600">
                        Quantity
                      </th>

                      <th className="pb-4 text-sm font-semibold text-gray-600">
                        Total Spent
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {recentProducts.map(
                      (product) => (

                        <tr
                          key={product._id}
                          className="border-b last:border-0"
                        >

                          <td className="py-4">

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">

                                <Package className="h-4 w-4 text-orange-600" />

                              </div>

                              <span className="font-medium text-gray-900">
                                {product.productName}
                              </span>

                            </div>

                          </td>


                          <td className="py-4 text-sm text-gray-600">

                            {product.totalQuantity}

                          </td>


                          <td className="py-4 font-semibold text-gray-900">

                            {formatCurrency(
                              product.totalSpent,
                            )}

                          </td>

                        </tr>

                      ),
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </CardContent>

        </Card>


        {/* ===================================================
            QUICK ACTIONS
        =================================================== */}

        <div className="mt-6 grid gap-5 sm:grid-cols-3">


          {/* My Orders */}

          <Link to="/my-bookings">

            <Card className="group h-full rounded-3xl border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              <CardContent className="p-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">

                  <Package className="h-5 w-5 text-orange-600" />

                </div>


                <h3 className="mt-5 font-bold text-gray-950">
                  My Orders
                </h3>


                <p className="mt-1 text-sm leading-6 text-gray-500">
                  View and track all your orders.
                </p>


                <div className="mt-4 flex items-center text-sm font-semibold text-orange-600">

                  View Orders

                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />

                </div>

              </CardContent>

            </Card>

          </Link>


          {/* My Cart */}

          <Link to="/user/my-card">

            <Card className="group h-full rounded-3xl border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              <CardContent className="p-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">

                  <ShoppingBag className="h-5 w-5 text-orange-600" />

                </div>


                <h3 className="mt-5 font-bold text-gray-950">
                  My Cart
                </h3>


                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Review your products before checkout.
                </p>


                <div className="mt-4 flex items-center text-sm font-semibold text-orange-600">

                  Open Cart

                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />

                </div>

              </CardContent>

            </Card>

          </Link>


          {/* Continue Shopping → SHOP */}

          <Link to="/shop">

            <Card className="group h-full rounded-3xl border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              <CardContent className="p-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">

                  <CreditCard className="h-5 w-5 text-orange-600" />

                </div>


                <h3 className="mt-5 font-bold text-gray-950">
                  Continue Shopping
                </h3>


                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Explore more products from our shop.
                </p>


                <div className="mt-4 flex items-center text-sm font-semibold text-orange-600">

                  Explore Products

                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />

                </div>

              </CardContent>

            </Card>

          </Link>

        </div>


      </main>

    </div>
  );
};


export default MyDashboard;