import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Home,
  Info,
  Layers,
  MessageCircle,
  ShoppingBag
} from "lucide-react";
import { ModeToggle } from "../theme/mode-toggle";
import Logo from "@/share/Logo";

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
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">

          {/* =====================
              LOGO
          ====================== */}
         <Link
  to="/"
  className="group flex items-center shrink-0"
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
              const isActive = location.pathname === link.path;

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

                  {/* Hover underline */}
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
              SHOP NOW
          ====================== */}
        {/* =====================
    CTA BUTTONS
====================== */}
<div className="flex items-center gap-3">
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
    <Link to="/login">
      Login
    </Link>
  </Button>

  {/* Shop Now */}
  <Button

    className="
      group
      h-11
      rounded-full
      bg-foreground
      px-5
      font-semibold
      text-background
      shadow-sm
      transition-all duration-300
      hover:bg-foreground/90
      hover:shadow-md
    "
  >
    <Link to="/shop">
      Shop Now

      <ArrowUpRight
        className="
          ml-1 h-4 w-4
          transition-transform duration-300
          group-hover:-translate-y-0.5
          group-hover:translate-x-0.5
        "
      />
    </Link>
  </Button>
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
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className="flex flex-1 flex-col items-center justify-center"
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
        </div>
      </nav>
    </>
  );
};

export default Navbar;