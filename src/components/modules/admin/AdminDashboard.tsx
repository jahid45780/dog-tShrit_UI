
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
  UserRound,
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

import {
  useGetAdminStatsQuery,
} from "@/redux/features/stats/adminStats/admin.stats.api";


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

const AdminDashboard = () => {
  /* =========================================================
     API
  ========================================================= */

  const {
    data: response,
    isLoading,
    isError,
  } = useGetAdminStatsQuery();


  /* =========================================================
     DATA
  ========================================================= */

  const stats = response?.data;


  /* =========================================================
     LOADING UI
  ========================================================= */

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fb]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          {/* Header Skeleton */}
          <div className="mb-6">
            <div className="h-9 w-64 animate-pulse rounded-lg bg-gray-200" />

            <div className="mt-3 h-4 w-96 animate-pulse rounded bg-gray-200" />
          </div>


          {/* Stats Skeleton */}
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


          {/* Chart Skeleton */}
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

  if (isError || !stats) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f8f9fb] px-4">

        <Card className="max-w-lg rounded-3xl border-0 shadow-xl">

          <CardContent className="p-10 text-center">

            <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />

            <h2 className="mt-5 text-2xl font-bold text-gray-950">
              Failed to load dashboard
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Dashboard statistics could not be loaded.
              Please try again.
            </p>

          </CardContent>

        </Card>

      </div>
    );
  }


  /* =========================================================
     ORDER STATUS CHART
  ========================================================= */

  const bookingStatusChartData = [
    {
      name: "Confirmed",
      value: stats.confirmedBookings,
    },
    {
      name: "Pending",
      value: stats.pendingBookings,
    },
    {
      name: "Cancelled",
      value: stats.cancelledBookings,
    },
  ];


  /* =========================================================
     PAYMENT STATUS CHART
  ========================================================= */

  const paymentStatusChartData = [
    {
      name: "Paid",
      value: stats.paidOrders,
    },
    {
      name: "Pending",
      value: stats.pendingPayments,
    },
    {
      name: "Failed",
      value: stats.failedPayments,
    },
  ];


  /* =========================================================
     MONTHLY CHART
  ========================================================= */

  const monthlyChartData =
    stats.monthlyStats?.map((item) => ({
      name: `${item.month}/${item.year}`,
      orders: item.orders,
      revenue: item.revenue,
    })) || [];


  /* =========================================================
     CURRENCY
  ========================================================= */

  const formatCurrency = (
    value: number,
  ) => {
    return `$${Number(value || 0).toFixed(2)}`;
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
     CUSTOMER TYPE
  ========================================================= */

  const getCustomerName = (
    customer: any,
  ) => {
    return (
      customer?.name ||
      customer?.email ||
      "Unknown Customer"
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
                    {stats.totalUsers}
                  </h2>

                  <p className="mt-2 flex items-center text-xs text-blue-600">
                    Registered users
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
                    {stats.totalProducts}
                  </h2>

                  <p className="mt-2 text-xs text-gray-500">
                    Active products
                  </p>

                </div>


                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">

                  <Package className="h-5 w-5 text-orange-600" />

                </div>

              </div>

            </CardContent>

          </Card>


          {/* ORDERS */}

          <Card className="group rounded-3xl border-0 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

            <CardContent className="p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Total Orders
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-950">
                    {stats.totalBookings}
                  </h2>

                  <p className="mt-2 text-xs text-gray-500">
                    All customer orders
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
                      stats.totalRevenue,
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
            CUSTOMER + PAYMENT STATS
        =================================================== */}

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">


          {/* UNIQUE CUSTOMERS */}

          <Card className="rounded-3xl border-0 shadow-sm">

            <CardContent className="p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">

                  <UserRound className="h-5 w-5 text-blue-600" />

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Unique Customers
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-950">
                    {stats.uniqueCustomers}
                  </p>

                </div>

              </div>

            </CardContent>

          </Card>


          {/* GUEST CUSTOMERS */}

          <Card className="rounded-3xl border-0 shadow-sm">

            <CardContent className="p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">

                  <Users className="h-5 w-5 text-orange-600" />

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Guest Customers
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-950">
                    {stats.guestCustomers}
                  </p>

                </div>

              </div>

            </CardContent>

          </Card>


          {/* REGISTERED CUSTOMERS */}

          <Card className="rounded-3xl border-0 shadow-sm">

            <CardContent className="p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">

                  <CheckCircle2 className="h-5 w-5 text-green-600" />

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Registered Customers
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-950">
                    {stats.registeredCustomers}
                  </p>

                </div>

              </div>

            </CardContent>

          </Card>


          {/* PAID ORDERS */}

          <Card className="rounded-3xl border-0 shadow-sm">

            <CardContent className="p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">

                  <CreditCard className="h-5 w-5 text-purple-600" />

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Paid Orders
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-950">
                    {stats.paidOrders}
                  </p>

                </div>

              </div>

            </CardContent>

          </Card>

        </div>


        {/* ===================================================
            ORDER + PAYMENT CHARTS
        =================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">


          {/* ORDER STATUS */}

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


          {/* PAYMENT STATUS */}

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
            MONTHLY SALES
        =================================================== */}

        <Card className="mt-6 rounded-3xl border-0 shadow-sm">

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <TrendingUp className="h-5 w-5 text-green-600" />

              Monthly Sales Overview

            </CardTitle>

            <p className="text-sm text-gray-500">
              Orders and revenue for the recent months
            </p>

          </CardHeader>


          <CardContent>

            <div className="h-[350px]">

              {monthlyChartData.length === 0 ? (

                <div className="flex h-full items-center justify-center">

                  <p className="text-sm text-gray-500">
                    No monthly sales data available.
                  </p>

                </div>

              ) : (

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={monthlyChartData}
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
                      yAxisId="left"
                      allowDecimals={false}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip />

                    <Legend />

                    <Bar
                      yAxisId="left"
                      dataKey="orders"
                      name="Orders"
                      fill="#3b82f6"
                      radius={[
                        8,
                        8,
                        0,
                        0,
                      ]}
                    />

                    <Bar
                      yAxisId="right"
                      dataKey="revenue"
                      name="Revenue"
                      fill="#22c55e"
                      radius={[
                        8,
                        8,
                        0,
                        0,
                      ]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              )}

            </div>

          </CardContent>

        </Card>


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
                  {stats.paidOrders}
                </p>

              </div>


              {/* PENDING */}

              <div className="rounded-2xl bg-yellow-50 p-5">

                <p className="text-sm font-medium text-yellow-700">
                  Pending Payments
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-950">
                  {stats.pendingPayments}
                </p>

              </div>


              {/* FAILED */}

              <div className="rounded-2xl bg-red-50 p-5">

                <p className="text-sm font-medium text-red-700">
                  Failed Payments
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-950">
                  {stats.failedPayments}
                </p>

              </div>


              {/* AVERAGE */}

              <div className="rounded-2xl bg-blue-50 p-5">

                <p className="text-sm font-medium text-blue-700">
                  Average Payment
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-950">
                  {formatCurrency(
                    stats.averagePaymentAmount,
                  )}
                </p>

              </div>

            </div>

          </CardContent>

        </Card>


        {/* ===================================================
            CUSTOMER LIST
        =================================================== */}

        <Card className="mt-6 rounded-3xl border-0 shadow-sm">

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <Users className="h-5 w-5 text-blue-600" />

              Customers

            </CardTitle>

            <p className="text-sm text-gray-500">
              Registered and guest customers who placed orders
            </p>

          </CardHeader>


          <CardContent>

            {stats.customers.length === 0 ? (

              <div className="py-10 text-center">

                <Users className="mx-auto h-10 w-10 text-gray-300" />

                <p className="mt-3 text-sm text-gray-500">
                  No customers found.
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[900px]">

                  <thead>

                    <tr className="border-b border-gray-100 text-left">

                      <th className="px-4 py-4 text-xs font-semibold uppercase text-gray-500">
                        Customer
                      </th>

                      <th className="px-4 py-4 text-xs font-semibold uppercase text-gray-500">
                        Contact
                      </th>

                      <th className="px-4 py-4 text-xs font-semibold uppercase text-gray-500">
                        Type
                      </th>

                      <th className="px-4 py-4 text-xs font-semibold uppercase text-gray-500">
                        Orders
                      </th>

                      <th className="px-4 py-4 text-xs font-semibold uppercase text-gray-500">
                        Paid
                      </th>

                      <th className="px-4 py-4 text-xs font-semibold uppercase text-gray-500">
                        Spent
                      </th>

                      <th className="px-4 py-4 text-xs font-semibold uppercase text-gray-500">
                        Last Order
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {stats.customers.map(
                      (customer) => (

                        <tr
                          key={customer.email}
                          className="border-b border-gray-50 transition hover:bg-gray-50"
                        >

                          {/* CUSTOMER */}

                          <td className="px-4 py-4">

                            <div>

                              <p className="font-semibold text-gray-950">
                                {getCustomerName(customer)}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                {customer.email}
                              </p>

                            </div>

                          </td>


                          {/* CONTACT */}

                          <td className="px-4 py-4">

                            <p className="text-sm text-gray-700">
                              {customer.phone || "N/A"}
                            </p>

                            <p className="mt-1 max-w-[220px] truncate text-xs text-gray-500">
                              {customer.address || "N/A"}
                            </p>

                          </td>


                          {/* TYPE */}

                          <td className="px-4 py-4">

                            {customer.customerType ===
                            "GUEST" ? (

                              <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                                Guest
                              </span>

                            ) : (

                              <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                Registered
                              </span>

                            )}

                          </td>


                          {/* ORDERS */}

                          <td className="px-4 py-4">

                            <span className="font-semibold text-gray-950">
                              {customer.totalOrders}
                            </span>

                          </td>


                          {/* PAID */}

                          <td className="px-4 py-4">

                            <span className="font-semibold text-green-600">
                              {customer.paidOrders}
                            </span>

                          </td>


                          {/* SPENT */}

                          <td className="px-4 py-4">

                            <span className="font-semibold text-gray-950">
                              {formatCurrency(
                                customer.totalSpent,
                              )}
                            </span>

                          </td>


                          {/* LAST ORDER */}

                          <td className="px-4 py-4">

                            <span className="text-sm text-gray-500">
                              {formatDate(
                                customer.lastOrderAt,
                              )}
                            </span>

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

            {stats.recentBookings.length === 0 ? (

              <div className="py-10 text-center">

                <ShoppingBag className="mx-auto h-10 w-10 text-gray-300" />

                <p className="mt-3 text-sm text-gray-500">
                  No orders yet.
                </p>

              </div>

            ) : (

              <div className="space-y-3">

                {stats.recentBookings.map(
                  (booking) => (

                    <div
                      key={booking._id}
                      className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                    >

                      {/* LEFT */}

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


                          <p className="mt-1 text-sm text-gray-700">

                            {booking.customer?.name ||
                              booking.customer?.email ||
                              booking.user?.name ||
                              "Customer"}

                          </p>


                          <p className="mt-1 text-xs text-gray-500">

                            {booking.customer?.email ||
                              booking.user?.email ||
                              "No email"}

                            {" • "}

                            {booking.customerType ===
                            "GUEST"
                              ? "Guest"
                              : "Registered"}

                            {" • "}

                            {formatDate(
                              booking.createdAt,
                            )}

                          </p>

                        </div>

                      </div>


                      {/* RIGHT */}

                      <div className="flex items-center gap-5">

                        <div className="text-right">

                          <p className="font-bold text-gray-950">

                            {formatCurrency(
                              booking.totalAmount,
                            )}

                          </p>


                          <div className="mt-1 flex items-center justify-end gap-2">

                            <span className="text-xs text-gray-500">
                              {booking.bookingStatus}
                            </span>

                          </div>

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
