
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  Package,
  RefreshCw,
  ShoppingBag,
  TrendingUp,
  XCircle,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Wallet,
  ShoppingCart,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
import { useGetUserStatsQuery } from "@/redux/features/stats/stats.api";

type Order = {
  _id: string;
  totalAmount?: number;
  paymentStatus?: string;
  bookingStatus?: string;
  createdAt?: string;
  items?: Array<{
    product?: string | {
      name?: string;
      productName?: string;
      images?: string[];
    };
    productName?: string;
    name?: string;
    quantity?: number;
    price?: number;
    image?: string;
    color?: string;
    size?: string;
  }>;
};

const PAGE_SIZE = 5;

const money = (value: number = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value) || 0);

const dateFormat = (value?: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const statusStyle = (status?: string) => {
  switch (status?.toUpperCase()) {
    case "PAID":
    case "CONFIRMED":
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
    case "PENDING":
      return "bg-amber-50 text-amber-700 ring-amber-600/20";
    case "FAILED":
    case "CANCELLED":
      return "bg-rose-50 text-rose-700 ring-rose-600/20";
    default:
      return "bg-gray-100 text-gray-600 ring-gray-500/10";
  }
};

function StatusBadge({
  status,
}: {
  status?: string;
}) {
  if (!status) return null;
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyle(status)}`}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  iconClass: string;
}) {
  return (
    <Card className="group rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-500">
              {title}
            </p>
            <p className="mt-3 break-words text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              {value}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              {description}
            </p>
          </div>
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass} transition-transform group-hover:scale-110`}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const MyDashboard = () => {
  const [page, setPage] = useState(1);

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    refetch: refetchUser,
  } = useUserInfoQuery(undefined);

  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
    refetch: refetchStats,
  } = useGetUserStatsQuery(undefined);

  const user = userData?.data;
  const stats = statsData?.data;

  const orders: Order[] = useMemo(
    () => stats?.recentOrders ?? [],
    [stats?.recentOrders]
  );

  const totalOrders = stats?.totalOrders ?? 0;
  const pendingOrders = stats?.pendingOrders ?? 0;
  const confirmedOrders = stats?.confirmedOrders ?? 0;
  const cancelledOrders = stats?.cancelledOrders ?? 0;
  const paidOrders = stats?.paidOrders ?? 0;
  const pendingPayments = stats?.pendingPayments ?? 0;
  const failedPayments = stats?.failedPayments ?? 0;
  const totalSpent = Number(stats?.totalSpent ?? 0);

  const totalPages = Math.max(
    1,
    Math.ceil(orders.length / PAGE_SIZE)
  );

  const currentPage = Math.min(page, totalPages);

  const visibleOrders = orders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const orderChart = [
    { name: "Confirmed", value: confirmedOrders },
    { name: "Pending", value: pendingOrders },
    { name: "Cancelled", value: cancelledOrders },
  ];

  const paymentChart = [
    { name: "Paid", value: paidOrders },
    { name: "Pending", value: pendingPayments },
    { name: "Failed", value: failedPayments },
  ];

  const refreshAll = () => {
    refetchUser();
    refetchStats();
  };

  if (userLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] px-4 py-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="h-44 animate-pulse rounded-3xl bg-gray-200" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="h-80 animate-pulse rounded-2xl bg-gray-200" />
            <div className="h-80 animate-pulse rounded-2xl bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (userError || statsError || !user || !stats) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center bg-[#f8f9fb] px-4">
        <Card className="w-full max-w-md rounded-3xl">
          <CardContent className="flex flex-col items-center p-8 text-center">
            <div className="rounded-2xl bg-rose-50 p-4 text-rose-600">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h2 className="mt-5 text-xl font-bold">
              Dashboard unavailable
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              We couldn't load your account information.
              Please check your connection and try again.
            </p>
            <Button
              onClick={refreshAll}
              className="mt-6 rounded-xl bg-gray-950"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userName = user.name ?? "Customer";
  const userEmail = user.email ?? "";
  const memberSince = dateFormat(user.createdAt);

  return (
    <main className="min-h-screen bg-[#f8f9fb] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Welcome header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-orange-950 p-6 text-white shadow-xl sm:p-9">
          <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-2xl font-bold shadow-lg sm:h-20 sm:w-20 sm:text-3xl">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-orange-300">
                    Atnamira Pet Shop
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-gray-200">
                    CUSTOMER
                  </span>
                </div>
                <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                  Welcome back, {userName}!
                </h1>
                <p className="mt-2 break-all text-sm text-gray-300">
                  {userEmail}
                </p>
                <p className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Member since {memberSince}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={refreshAll}
                className="rounded-xl border-white/20 bg-white/10 text-white hover:bg-white hover:text-gray-950"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button
               
                className="rounded-xl bg-orange-500 text-white hover:bg-orange-600"
              >
                <Link to="/shop">
                  Shop now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Account shortcuts */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            to="/my-bookings"
            className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">My orders</p>
                <p className="text-xs text-gray-500">
                  Track your purchases
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-orange-600" />
          </Link>

          <Link
            to="/user/my-card"
            className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">My cart</p>
                <p className="text-xs text-gray-500">
                  Review your shopping bag
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-orange-600" />
          </Link>
        </div>

        {/* Stats */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-950">
              Your overview
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              A quick look at your shopping activity.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total orders"
              value={totalOrders}
              description="All your orders"
              icon={ShoppingBag}
              iconClass="bg-orange-50 text-orange-600"
            />
            <StatCard
              title="Total spent"
              value={money(totalSpent)}
              description="Successfully paid orders"
              icon={Wallet}
              iconClass="bg-emerald-50 text-emerald-600"
            />
            <StatCard
              title="Confirmed"
              value={confirmedOrders}
              description="Orders confirmed"
              icon={CheckCircle2}
              iconClass="bg-violet-50 text-violet-600"
            />
            <StatCard
              title="Pending"
              value={pendingOrders}
              description="Waiting for processing"
              icon={Clock3}
              iconClass="bg-amber-50 text-amber-600"
            />
          </div>
        </section>

        {/* Charts */}
        <section className="grid gap-5 lg:grid-cols-2">
          <Card className="rounded-2xl border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Package className="h-5 w-5 text-orange-600" />
                Order activity
              </CardTitle>
              <p className="text-sm text-gray-500">
                Your orders by current status
              </p>
            </CardHeader>
            <CardContent>
              {totalOrders === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center text-center">
                  <Package className="h-10 w-10 text-gray-300" />
                  <p className="mt-3 font-semibold text-gray-700">
                    No order activity yet
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Your order chart will appear here.
                  </p>
                </div>
              ) : (
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={orderChart}
                      margin={{ top: 10, right: 8, left: -22, bottom: 0 }}
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
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        allowDecimals={false}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip />
                      <Bar
                        dataKey="value"
                        name="Orders"
                        fill="#f97316"
                        radius={[8, 8, 0, 0]}
                        barSize={42}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="h-5 w-5 text-orange-600" />
                Payment overview
              </CardTitle>
              <p className="text-sm text-gray-500">
                The status of your payments
              </p>
            </CardHeader>
            <CardContent>
              {paidOrders + pendingPayments + failedPayments === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center text-center">
                  <CreditCard className="h-10 w-10 text-gray-300" />
                  <p className="mt-3 font-semibold text-gray-700">
                    No payments yet
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Payment activity will appear here.
                  </p>
                </div>
              ) : (
                <div className="relative h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentChart}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="46%"
                        innerRadius={62}
                        outerRadius={92}
                        paddingAngle={4}
                      >
                        {paymentChart.map((item, index) => (
                          <Cell
                            key={item.name}
                            fill={["#16a34a", "#eab308", "#ef4444"][index]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pb-5">
                    <span className="text-xs text-gray-500">
                      Payments
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      {paidOrders + pendingPayments + failedPayments}
                    </span>
                  </div>
                </div>
              )}
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[
                  { label: "Paid", value: paidOrders, color: "bg-emerald-500" },
                  { label: "Pending", value: pendingPayments, color: "bg-amber-400" },
                  { label: "Failed", value: failedPayments, color: "bg-rose-500" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className={`h-2 w-2 rounded-full ${item.color}`} />
                      {item.label}
                    </div>
                    <p className="mt-2 text-xl font-bold text-gray-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Status summary */}
        <Card className="rounded-2xl border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">
              Order status summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  title: "Confirmed",
                  value: confirmedOrders,
                  icon: CheckCircle2,
                  style: "bg-emerald-50 text-emerald-700",
                },
                {
                  title: "Pending",
                  value: pendingOrders,
                  icon: Clock3,
                  style: "bg-amber-50 text-amber-700",
                },
                {
                  title: "Cancelled",
                  value: cancelledOrders,
                  icon: XCircle,
                  style: "bg-rose-50 text-rose-700",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                >
                  <div>
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      {item.value}
                    </p>
                  </div>
                  <div className={`rounded-xl p-3 ${item.style}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent orders */}
        <Card className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <CardHeader>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShoppingBag className="h-5 w-5 text-orange-600" />
                  Recent orders
                </CardTitle>
                <p className="mt-1 text-sm text-gray-500">
                  Your latest {orders.length} orders
                </p>
              </div>
              <Button  variant="outline" className="rounded-xl">
                <Link to="/my-bookings">
                  View all orders
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {orders.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 px-5 py-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                  <ShoppingBag className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">
                  Your order list is empty
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Find something your pet will love.
                </p>
                <Button className="mt-5 rounded-xl bg-orange-500 hover:bg-orange-600">
                  <Link to="/shop">Explore products</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {visibleOrders.map((order) => (
                    <div
                      key={order._id}
                      className="flex flex-col gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-orange-200 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                          <Package className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {dateFormat(order.createdAt)}
                            {" · "}
                            {order.items?.length ?? 0} item(s)
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <StatusBadge status={order.paymentStatus} />
                            <StatusBadge status={order.bookingStatus} />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <p className="font-bold text-gray-950">
                          {money(order.totalAmount)}
                        </p>
                        <Button size="sm" variant="outline" className="rounded-lg">
                          <Link to={`/my-bookings/${order._id}`}>
                            Details
                            <ArrowRight className="ml-2 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Client-side pagination of returned orders */}
                <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-gray-500">
                    Showing{" "}
                    {orders.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}
                    {"–"}
                    {Math.min(currentPage * PAGE_SIZE, orders.length)}
                    {" of "}
                    {orders.length} recent orders
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="rounded-lg"
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      Previous
                    </Button>
                    <span className="min-w-16 text-center text-sm font-medium text-gray-600">
                      {currentPage} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage >= totalPages}
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      className="rounded-lg"
                    >
                      Next
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Footer hint */}
        <div className="flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
          <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Your shopping, all in one place
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Check your payment status and order progress here.
              For full order history, open My Orders.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyDashboard;
