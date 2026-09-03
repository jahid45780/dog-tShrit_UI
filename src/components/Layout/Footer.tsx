import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { FaTwitter, FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import Logo from "@/share/Logo";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
           
                 <Link
  to="/"
  className="group flex items-center shrink-0"
  aria-label="Pet Mark Home"
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

            <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
              Premium T-shirts inspired by the love, loyalty, and personality
              of our four-legged friends. Wear your passion. Wear PawMark.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:bg-foreground hover:text-background"
              >
                <FaInstagramSquare className="h-4 w-4" />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:bg-foreground hover:text-background"
              >
                <FaFacebookSquare className="h-4 w-4" />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:bg-foreground hover:text-background"
              >
                <FaTwitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-foreground">
              Shop
            </h3>

            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <Link
                to="/shop"
                className="transition-colors hover:text-foreground"
              >
                All Products
              </Link>

              <Link
                to="/collections"
                className="transition-colors hover:text-foreground"
              >
                Collections
              </Link>

              <Link
                to="/new-arrivals"
                className="transition-colors hover:text-foreground"
              >
                New Arrivals
              </Link>

              <Link
                to="/best-sellers"
                className="transition-colors hover:text-foreground"
              >
                Best Sellers
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-foreground">
              Company
            </h3>

            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <Link
                to="/about"
                className="transition-colors hover:text-foreground"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="transition-colors hover:text-foreground"
              >
                Contact
              </Link>

              <Link
                to="/privacy"
                className="transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="transition-colors hover:text-foreground"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-14 flex flex-col gap-5 rounded-2xl border border-border bg-muted/30 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              Stay in the PawMark family 🐾
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Get updates about new drops and exclusive offers.
            </p>
          </div>

          <div className="flex w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-11 w-full rounded-l-full border border-border bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground/30"
            />

            <button
              type="button"
              className="flex h-11 items-center gap-1 rounded-r-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-80"
            >
              Subscribe
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Atnamira. All rights reserved.
          </p>

          <p>Made with 🐾 for dog lovers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;