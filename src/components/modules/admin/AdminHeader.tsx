

import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";


interface AdminHeaderProps {
  notificationCount?: number;
  onMenuClick?: () => void;
  onLogout?: () => void;
}

const AdminHeader = ({
  notificationCount = 0,
  onMenuClick,
  onLogout,
}: AdminHeaderProps) => {
  const navigate = useNavigate();

  // ==========================================
  // GET LOGGED-IN USER
  // ==========================================

  const {
    data: userResponse,
    isLoading,
  } = useUserInfoQuery(undefined);

  const user = userResponse?.data;

  // ==========================================
  // USER DATA
  // ==========================================

  const userName = user?.name || "Admin";

  const userEmail = user?.email || "";

  const userRole = user?.role || "ADMIN";

  // আপনার backend field যদি profileImage হয়
  const userAvatar = user?.profileImage || "";

  const initials =
    userName
      ?.split(" ")
      .map((name: string) => name.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "A";

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      return;
    }

    // আপনার logout API এখানে connect করবেন
    // await logoutApi();

    localStorage.removeItem("accessToken");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 mb-6 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">

        {/* ==========================================
            MOBILE MENU
        =========================================== */}

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* ==========================================
            LOGO
        =========================================== */}

        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="flex shrink-0 items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white shadow-sm">
            <LayoutDashboard className="h-5 w-5" />
          </div>

          <div className="hidden text-left sm:block">
            <h1 className="text-base font-bold leading-none tracking-tight text-gray-950">
              Atnamira
            </h1>

            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">
              Admin Panel
            </p>
          </div>
        </button>

        {/* ==========================================
            DIVIDER
        =========================================== */}

        <div className="hidden h-8 w-px bg-gray-200 md:block" />

        {/* ==========================================
            PAGE TITLE
        =========================================== */}

        <div className="hidden md:block">
          <h2 className="text-sm font-semibold text-gray-900">
            Dashboard
          </h2>

          <p className="text-xs text-gray-500">
            Manage your store
          </p>
        </div>

        {/* ==========================================
            SEARCH
        =========================================== */}

        <div className="ml-auto hidden w-full max-w-md lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <Input
              type="search"
              placeholder="Search products, orders..."
              className="h-9 rounded-xl border-gray-200 bg-gray-50 pl-9 text-sm"
            />
          </div>
        </div>

        {/* ==========================================
            NOTIFICATION
        =========================================== */}

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative shrink-0 rounded-xl"
          onClick={() =>
            navigate("/admin/notifications")
          }
        >
          <Bell className="h-5 w-5 text-gray-600" />

          {notificationCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
              {notificationCount > 99
                ? "99+"
                : notificationCount}
            </span>
          )}
        </Button>

        {/* ==========================================
            ADMIN PROFILE
        =========================================== */}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              type="button"
              variant="ghost"
              className="h-10 gap-2 rounded-xl px-1.5 sm:px-2"
            >
              <Avatar className="h-8 w-8 border">
                <AvatarImage
                  src={userAvatar}
                  alt={userName}
                />

                <AvatarFallback className="bg-gray-100 text-xs font-semibold text-gray-700">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="hidden max-w-32 text-left sm:block">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {isLoading ? "Loading..." : userName}
                </p>

                <p className="truncate text-[11px] text-gray-500">
                  {userRole}
                </p>
              </div>

              <ChevronDown className="hidden h-4 w-4 text-gray-400 sm:block" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-64 rounded-2xl border-gray-200 p-2 shadow-xl"
          >
            {/* USER INFO */}

            <DropdownMenuLabel className="px-3 py-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 border">
                  <AvatarImage
                    src={userAvatar}
                    alt={userName}
                  />

                  <AvatarFallback className="bg-gray-100 font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {userName}
                  </p>

                  <p className="truncate text-xs font-normal text-gray-500">
                    {userEmail}
                  </p>

                  <Badge
                    variant="secondary"
                    className="mt-1 h-5 text-[9px] font-semibold"
                  >
                    {userRole}
                  </Badge>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* PROFILE */}

            <DropdownMenuItem
              className="cursor-pointer gap-2 rounded-lg px-3 py-2.5"
              onClick={() =>
                navigate("/admin/profile")
              }
            >
              <User className="h-4 w-4" />

              <span>My Profile</span>
            </DropdownMenuItem>

            {/* SETTINGS */}

            <DropdownMenuItem
              className="cursor-pointer gap-2 rounded-lg px-3 py-2.5"
              onClick={() =>
                navigate("/admin/settings")
              }
            >
              <Settings className="h-4 w-4" />

              <span>Settings</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* LOGOUT */}

            <DropdownMenuItem
              className="cursor-pointer gap-2 rounded-lg px-3 py-2.5 text-red-600 focus:bg-red-50 focus:text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />

              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;

