import { useState } from "react";
import { ChevronDown, PawPrint } from "lucide-react";
import { Link } from "react-router-dom";

interface NavItem {
  title: string;
  url: string;
}


interface NavMainProps {
  items: {
    title: string;
    items?: NavItem[];
  }[];
}

export function NavMain({ items }: NavMainProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    Transactions: true,
  });

  const toggleDropdown = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="w-full space-y-3 px-2">

      {/* ================= HEADER ================= */}
      <div
        className="
          group relative overflow-hidden rounded-2xl
          border border-white/10
          bg-gradient-to-br from-slate-800 via-slate-900 to-black
          px-4 py-4
          shadow-[0_8px_30px_rgba(0,0,0,0.35)]
        "
      >
        {/* 3D Glow */}
        <div
          className="
            absolute -right-8 -top-8
            h-24 w-24 rounded-full
            bg-cyan-400/20 blur-2xl
            transition-all duration-500
            group-hover:bg-cyan-400/30
          "
        />

        <div className="relative flex items-center gap-3">

          {/* 3D Logo */}
          <div
            className="
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-xl
              border border-white/20
              bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600
              shadow-[0_6px_0_#172554,0_10px_20px_rgba(0,0,0,0.4)]
              transition-transform duration-300
              group-hover:-translate-y-1
            "
          >
            <PawPrint
              size={23}
              strokeWidth={2.5}
              className="text-white drop-shadow-md"
            />
          </div>

          {/* Brand */}
          <div className="min-w-0">
            <h2
              className="
                truncate text-base font-extrabold tracking-wide
                text-white
                drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]
              "
            >
              Atnamira
            </h2>

            <p className="text-[11px] font-medium tracking-[0.18em] text-cyan-300">
              PET SHOP
            </p>
          </div>

        </div>

        {/* Bottom shine */}
        <div
          className="
            absolute bottom-0 left-4 right-4 h-px
            bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent
          "
        />
      </div>


      {/* ================= NAVIGATION ================= */}

      {items.map((item) => {
        const isOpen = openItems[item.title];

        return (
          <div key={item.title} className="w-full">

            {/* Main Dropdown Button */}
            <button
              type="button"
              onClick={() => toggleDropdown(item.title)}
              className="
                group flex w-full items-center justify-between
                rounded-xl px-4 py-2.5
                text-left text-sm font-semibold
                text-white/90
                transition-all duration-200
                hover:bg-white/[0.07]
                hover:text-white
              "
            >
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                {item.title}
              </span>

              <div
                className="
                  flex h-7 w-7 items-center justify-center
                  rounded-lg
                  bg-white/[0.06]
                  shadow-inner
                "
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </div>
            </button>

            {/* Dropdown Items */}
            {isOpen && item.items && (
              <div
                className="
                  ml-5 mt-1
                  border-l border-white/10
                  pl-4
                  animate-in fade-in slide-in-from-top-1
                  duration-200
                "
              >
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.title}
                    to={subItem.url}
                    className="
                      group relative block
                      rounded-lg
                      px-3 py-2
                      text-sm text-white/70
                      transition-all duration-200
                      hover:bg-white/[0.05]
                      hover:text-cyan-300
                    "
                  >
                    <span className="transition-all duration-200 group-hover:ml-1">
                      {subItem.title}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}