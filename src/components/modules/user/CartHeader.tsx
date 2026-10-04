
import { useGetMyCartQuery } from "@/redux/features/addCard/add.card.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const AtnamiraHeader = () => {
  const { data: userInfo, isLoading: isUserLoading } =
    useUserInfoQuery(undefined);

  // userInfo is still called because the cart request
  // waits until authentication state is checked.
  void userInfo;

  // Guest + Logged-in both use backend cart
  const {
    data: backendCart,
    isLoading: isCartLoading,
  } = useGetMyCartQuery(undefined, {
    skip: isUserLoading,
  });

  // Calculate total quantity
  const cartCount =
    backendCart?.data?.items?.reduce(
      (total, item) => total + Number(item.quantity || 0),
      0
    ) ?? 0;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

        {/* NAVIGATION */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-semibold text-gray-600 transition hover:text-orange-600"
          >
            Home
          </Link>

          <Link
            to="/collections"
            className="text-sm font-semibold text-gray-600 transition hover:text-orange-600"
          >
            Shop
          </Link>

          <Link
            to="/collections"
            className="text-sm font-semibold text-gray-600 transition hover:text-orange-600"
          >
            Collections
          </Link>

          <Link
            to="/about"
            className="text-sm font-semibold text-gray-600 transition hover:text-orange-600"
          >
            About
          </Link>
        </nav>

        {/* CART */}
        <Link
          to="/user/my-card"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
        >
          <ShoppingBag className="h-5 w-5" />

          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-black text-white">
            {isUserLoading || isCartLoading
              ? "..."
              : cartCount > 99
              ? "99+"
              : cartCount}
          </span>
        </Link>
      </div>
    </header>
  );
};
