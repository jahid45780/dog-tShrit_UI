import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Info,
  Layers,
  MessageCircle,
  ShoppingBag,
  UserRound,
  LogOut,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "../theme/mode-toggle";
import Logo from "@/share/Logo";

import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";

import { useAppDispatch } from "@/redux/hooks";
import { role } from "@/constants/role";

const navLinks = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Shop",
    path: "/shop",
    icon: ShoppingBag,
  },
  {
    name: "Collections",
    path: "/collections",
    icon: Layers,
  },
  {
    name: "About",
    path: "/about",
    icon: Info,
  },
  {
    name: "Contact",
    path: "/contact",
    icon: MessageCircle,
  },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();

  const user = data?.data;
  

  const avatarLetter =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  // =========================
  // DASHBOARD NAVIGATION
  // =========================
  const handleDashboard = () => {
    if (user?.role === role.ADMIN) {
      navigate("/admin");
    } else if (user?.role === role.USER) {
      navigate("/user");
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();

      dispatch(authApi.util.resetApiState());

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* =========================
          ANNOUNCEMENT BAR
      ========================== */}
      <div className="relative z-[60] flex h-9 items-center justify-center border-b border-border bg-background px-4 text-center">
        <p className="flex items-center justify-center text-[11px] font-medium tracking-wide text-muted-foreground sm:text-xs">
          <Logo
            imageClassName="
              h-5
              w-auto
              rounded-none
              object-contain
            "
          />

          <span className="mx-2 text-muted-foreground">•</span>

          <span className="text-foreground">
            Wear Your Love for Dogs
          </span>

          <span className="mx-2 hidden text-muted-foreground sm:inline">
            •
          </span>

          <span className="hidden sm:inline">
            Free Shipping on Orders Over $50
          </span>
        </p>

        {/* Theme Toggle */}
        <div className="absolute right-3">
          <ModeToggle />
        </div>
      </div>

      {/* =========================
          DESKTOP NAVBAR
      ========================== */}
      <header
        className="
          sticky top-0 z-50 hidden w-full
          border-b border-border
          bg-background/90
          backdrop-blur-xl
          md:block
        "
      >
        <div
          className="
            mx-auto flex h-[76px]
            max-w-7xl
            items-center
            justify-between
            px-5 sm:px-8
          "
        >
          {/* =====================
              LOGO
          ====================== */}
          <Link
            to="/"
            className="group flex shrink-0 items-center"
            aria-label="Atnamira Home"
          >
            <Logo
              imageClassName="
                h-14
                w-auto
                rounded-none
                object-contain
              "
            />
          </Link>

          {/* =====================
              DESKTOP NAVIGATION
          ====================== */}
          <nav
            className="
              flex items-center gap-1
              rounded-full
              border border-border
              bg-muted/40
              p-1.5
              shadow-sm
            "
          >
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    group relative
                    rounded-full
                    px-5 py-2.5
                    text-sm font-medium
                    transition-all duration-300

                    ${
                      isActive
                        ? `
                          bg-foreground
                          text-background
                          shadow-sm
                        `
                        : `
                          text-muted-foreground
                          hover:bg-background
                          hover:text-foreground
                        `
                    }
                  `}
                >
                  {link.name}

                  {!isActive && (
                    <span
                      className="
                        absolute bottom-1
                        left-1/2
                        h-[2px] w-0
                        -translate-x-1/2
                        rounded-full
                        bg-foreground
                        transition-all duration-300
                        group-hover:w-5
                      "
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* =====================
              AUTH ACTIONS
          ====================== */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Avatar */}
                <button
                  type="button"
                  onClick={handleDashboard}
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-full
                    bg-foreground
                    text-background
                    text-sm font-bold
                    uppercase
                    shadow-sm
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:shadow-md
                    focus:outline-none
                    focus:ring-2
                    focus:ring-foreground
                    focus:ring-offset-2
                    focus:ring-offset-background
                  "
                  title="Dashboard"
                >
                  {avatarLetter}
                </button>

                {/* Profile */}
                <Button
                  variant="outline"
                  onClick={() => navigate("/profile")}
                  className="
                    h-11
                    rounded-full
                    border-border
                    bg-background
                    px-5
                    font-semibold
                    text-foreground
                    transition-all duration-300
                    hover:bg-muted
                  "
                >
                  <UserRound className="mr-2 h-4 w-4" />
                  Profile
                </Button>

                {/* Logout */}
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="
                    h-11
                    rounded-full
                    border-border
                    bg-background
                    px-5
                    font-semibold
                    text-foreground
                    transition-all duration-300
                    hover:bg-muted
                  "
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Login */}
                <Button
                  variant="outline"
                  className="
                    h-11
                    rounded-full
                    border-border
                    bg-background
                    px-5
                    font-semibold
                    text-foreground
                    transition-all duration-300
                    hover:bg-muted
                  "
                >
                  <Link to="/login">Login</Link>
                </Button>

                {/* Register */}
                <Button
                  className="
                    h-11
                    rounded-full
                    bg-foreground
                    px-5
                    font-semibold
                    text-background
                    transition-all duration-300
                    hover:opacity-90
                  "
                >
                  <Link
                    to="/register"
                    className="flex items-center"
                  >
                    Create Account
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* =========================
          MOBILE BOTTOM NAVBAR
      ========================== */}
      <nav
        className="
          fixed bottom-0 left-0 right-0
          z-50
          border-t border-border
          bg-background/95
          px-2
          pb-[env(safe-area-inset-bottom)]
          pt-2
          shadow-lg
          backdrop-blur-xl
          md:hidden
        "
      >
        <div className="mx-auto flex max-w-md items-center justify-around">
          {navLinks.map((link) => {
            const Icon = link.icon;

            const isActive =
              location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className="
                  flex flex-1
                  flex-col
                  items-center
                  justify-center
                "
              >
                <div
                  className={`
                    flex min-w-[58px]
                    flex-col items-center
                    justify-center
                    rounded-xl
                    px-2 py-2
                    transition-all duration-300

                    ${
                      isActive
                        ? `
                          bg-foreground
                          text-background
                          shadow-sm
                        `
                        : `
                          text-muted-foreground
                          hover:bg-muted
                          hover:text-foreground
                        `
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />

                  <span className="mt-1 text-[10px] font-medium">
                    {link.name}
                  </span>
                </div>
              </Link>
            );
          })}

          {/* =====================
              MOBILE USER
          ====================== */}
          {user ? (
            <button
              type="button"
              onClick={handleDashboard}
              className="flex flex-1 flex-col items-center justify-center"
            >
              <div
                className="
                  flex min-w-[58px]
                  flex-col items-center
                  justify-center
                  rounded-xl
                  px-2 py-2
                  text-muted-foreground
                  transition-all duration-300
                  hover:bg-muted
                  hover:text-foreground
                "
              >
                <div
                  className="
                    flex h-5 w-5
                    items-center justify-center
                    rounded-full
                    bg-foreground
                    text-[10px]
                    font-bold
                    text-background
                  "
                >
                  {avatarLetter}
                </div>

                <span className="mt-1 text-[10px] font-medium">
                  Dashboard
                </span>
              </div>
            </button>
          ) : (
            <Link
              to="/login"
              className="
                flex flex-1
                flex-col
                items-center
                justify-center
              "
            >
              <div
                className="
                  flex min-w-[58px]
                  flex-col items-center
                  justify-center
                  rounded-xl
                  px-2 py-2
                  text-muted-foreground
                  transition-all duration-300
                  hover:bg-muted
                  hover:text-foreground
                "
              >
                <UserRound className="h-5 w-5" />

                <span className="mt-1 text-[10px] font-medium">
                  Login
                </span>
              </div>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;