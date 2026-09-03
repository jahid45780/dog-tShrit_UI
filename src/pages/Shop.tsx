
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Eye,
  Heart,
  PawPrint,
  Search,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  Truck,
  X,
  RotateCcw,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Product } from "@/types/shopType";




/* =====================================================
   MOCK PRODUCTS
===================================================== */

const products: Product[] = [
  {
    id: 1,
    name: "Dog Dad Classic T-Shirt",
    category: "Dog Lovers",
    price: 24.99,
    oldPrice: 29.99,
    rating: 4.9,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    hoverImage:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800",
    badge: "Trending",
    colors: ["#111827", "#ffffff", "#9ca3af"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Cute Cat Lover T-Shirt",
    category: "Cat Lovers",
    price: 22.99,
    oldPrice: 27.99,
    rating: 4.8,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800",
    hoverImage:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
    badge: "New",
    colors: ["#ffffff", "#111827", "#f5d0fe"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Paw Print Premium Tee",
    category: "Paw Collection",
    price: 26.99,
    oldPrice: 32.99,
    rating: 4.9,
    reviews: 87,
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800",
    hoverImage:
      "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=800",
    badge: "Popular",
    colors: ["#111827", "#ffffff", "#d1d5db"],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 4,
    name: "My Dog Is My Best Friend",
    category: "Dog Lovers",
    price: 23.99,
    oldPrice: 29.99,
    rating: 4.7,
    reviews: 76,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=800",
    hoverImage:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800",
    badge: "Sale",
    colors: ["#111827", "#ffffff"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Cat Mom Minimal T-Shirt",
    category: "Cat Lovers",
    price: 24.99,
    oldPrice: 29.99,
    rating: 4.8,
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
    hoverImage:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800",
    badge: "New",
    colors: ["#ffffff", "#111827", "#f9a8d4"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 6,
    name: "Paws & Love T-Shirt",
    category: "Paw Collection",
    price: 25.99,
    oldPrice: 30.99,
    rating: 4.9,
    reviews: 112,
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800",
    hoverImage:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    badge: "Trending",
    colors: ["#111827", "#ffffff", "#a7f3d0"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 7,
    name: "Best Dog Mom Ever",
    category: "Dog Lovers",
    price: 21.99,
    oldPrice: 26.99,
    rating: 4.8,
    reviews: 91,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
    hoverImage:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800",
    badge: "Popular",
    colors: ["#ffffff", "#111827", "#fecdd3"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 8,
    name: "Paw Lover Oversized Tee",
    category: "Paw Collection",
    price: 27.99,
    rating: 4.9,
    reviews: 58,
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800",
    hoverImage:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    badge: "New",
    colors: ["#111827", "#ffffff"],
    sizes: ["M", "L", "XL", "XXL"],
  },
];

/* =====================================================
   CATEGORIES
===================================================== */

const categories = [
  "All",
  "Dog Lovers",
  "Cat Lovers",
  "Paw Collection",
];

/* =====================================================
   SHOP PAGE
===================================================== */

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Popular");

  const [quickViewProduct, setQuickViewProduct] =
    useState<Product | null>(null);

  /* -------------------------------------------------
     FILTER + SEARCH + SORT
  ------------------------------------------------- */

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sortBy === "Price: Low to High") {
      result = [...result].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortBy === "Price: High to Low") {
      result = [...result].sort(
        (a, b) => b.price - a.price
      );
    }

    if (sortBy === "Rating") {
      result = [...result].sort(
        (a, b) => b.rating - a.rating
      );
    }

    return result;
  }, [activeCategory, search, sortBy]);

  return (
    <main className="min-h-screen bg-background">
      {/* =================================================
          SHOP HERO
      ================================================= */}

      <section className="relative overflow-hidden border-b bg-muted/30">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="container relative mx-auto px-4 py-16 text-center md:py-20">
          <Badge className="mb-5 rounded-full px-4 py-1.5">
            <PawPrint className="mr-2 h-4 w-4" />
            Made for Pet Lovers
          </Badge>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Find Something
            <span className="block text-primary">
              You’ll Love ❤️
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground md:text-lg">
            Discover unique T-shirts made for dog lovers,
            cat lovers, and everyone who believes pets make
            life better.
          </p>
        </div>
      </section>

      {/* =================================================
          TRENDING
      ================================================= */}

      <section className="container mx-auto px-4 py-12">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-primary">
              <span>🔥</span>

              <span className="text-sm font-bold uppercase tracking-wider">
                Customer Favorites
              </span>
            </div>

            <h2 className="text-2xl font-bold md:text-3xl">
              Trending Now
            </h2>
          </div>

          <Button
            variant="ghost"
            className="hidden sm:flex"
            onClick={() => setActiveCategory("All")}
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={() =>
                setQuickViewProduct(product)
              }
            />
          ))}
        </div>
      </section>

      {/* =================================================
          COLLECTIONS
      ================================================= */}

      <section className="container mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            Explore
          </p>

          <h2 className="mt-2 text-2xl font-bold md:text-3xl">
            Shop by Collection
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Find the perfect design for your favorite
            four-legged friend.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CollectionCard
            emoji="🐶"
            title="Dog Lovers"
            description="For proud dog parents"
            onClick={() =>
              setActiveCategory("Dog Lovers")
            }
          />

          <CollectionCard
            emoji="🐱"
            title="Cat Lovers"
            description="Made for cat people"
            onClick={() =>
              setActiveCategory("Cat Lovers")
            }
          />

          <CollectionCard
            emoji="🐾"
            title="Paw Collection"
            description="Simple paw designs"
            onClick={() =>
              setActiveCategory("Paw Collection")
            }
          />

          <CollectionCard
            emoji="✨"
            title="Custom"
            description="Create your own T-shirt"
            onClick={() => {}}
          />
        </div>
      </section>

      {/* =================================================
          SHOP PRODUCTS
      ================================================= */}

      <section className="container mx-auto px-4 py-14">
        {/* Search / Filter */}
        <div className="mb-8 rounded-2xl border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search T-shirts..."
                className="h-11 rounded-xl pl-10"
              />
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="rounded-xl"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter
              </Button>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="
                  h-10 rounded-xl border
                  bg-background px-3 text-sm
                  outline-none
                  focus:ring-2 focus:ring-primary
                "
              >
                <option>Popular</option>
                <option>Rating</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <Button
                key={category}
                variant={
                  activeCategory === category
                    ? "default"
                    : "outline"
                }
                className="shrink-0 rounded-full"
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Heading */}
        <div className="mb-7 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              All Products
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Showing {filteredProducts.length} products
            </p>
          </div>
        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={() =>
                  setQuickViewProduct(product)
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed">
            <Search className="mb-4 h-10 w-10 text-muted-foreground" />

            <h3 className="text-lg font-bold">
              No products found
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Try another search or category.
            </p>

            <Button
              className="mt-5 rounded-full"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* =================================================
          CUSTOM T-SHIRT
      ================================================= */}

      <section className="container mx-auto px-4 py-12">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground md:px-12">
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10" />

          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10" />

          <div className="relative mx-auto max-w-2xl">
            <PawPrint className="mx-auto mb-5 h-10 w-10" />

            <h2 className="text-3xl font-black md:text-4xl">
              Create Your Own T-Shirt
            </h2>

            <p className="mt-4 text-primary-foreground/80">
              Put your favorite pet, name, or special
              message on a T-shirt made just for you.
            </p>

            <Button
              size="lg"
              variant="secondary"
              className="mt-7 rounded-full px-8"
            >
              Create Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* =================================================
          TRUST SECTION
      ================================================= */}

      <section className="border-y bg-muted/30">
        <div className="container mx-auto grid gap-7 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <TrustItem
            icon={<Truck />}
            title="Fast Delivery"
            description="Quick & reliable shipping"
          />

          <TrustItem
            icon={<ShieldCheck />}
            title="Secure Payment"
            description="100% secure checkout"
          />

          <TrustItem
            icon={<RotateCcw />}
            title="Easy Returns"
            description="Simple return process"
          />

          <TrustItem
            icon={<Heart />}
            title="Made with Love"
            description="For true pet lovers"
          />
        </div>
      </section>

      {/* =================================================
          QUICK VIEW MODAL
      ================================================= */}

      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </main>
  );
};

/* =====================================================
   PRODUCT CARD
===================================================== */

const ProductCard = ({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView: () => void;
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount =
    product.oldPrice &&
    Math.round(
      ((product.oldPrice - product.price) /
        product.oldPrice) *
        100
    );

  const handleAddToCart = () => {
    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 1800);
  };

  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        border bg-card
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-2xl
      "
    >
      {/* ================= IMAGE ================= */}

      <div className="relative aspect-square overflow-hidden bg-muted">
        {/* Main Image */}
        <img
          src={product.image}
          alt={product.name}
          className={`
            absolute inset-0 h-full w-full
            object-cover
            transition-all duration-700
            ${
              product.hoverImage
                ? "group-hover:scale-105 group-hover:opacity-0"
                : "group-hover:scale-105"
            }
          `}
        />

        {/* Hover Image */}
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} alternate`}
            className="
              absolute inset-0 h-full w-full
              object-cover opacity-0
              transition-all duration-700
              group-hover:scale-105
              group-hover:opacity-100
            "
          />
        )}

        {/* Badge */}
        {product.badge && (
          <Badge className="absolute left-3 top-3 rounded-full px-3 py-1">
            {product.badge}
          </Badge>
        )}

        {/* Discount */}
        {discount && discount > 0 && (
          <span className="
            absolute left-3 top-12
            rounded-full bg-destructive
            px-2.5 py-1
            text-xs font-bold
            text-destructive-foreground
          ">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={() =>
            setIsFavorite(!isFavorite)
          }
          className="
            absolute right-3 top-3
            flex h-10 w-10
            items-center justify-center
            rounded-full
            border
            bg-background/90
            backdrop-blur-sm
            shadow-sm
            transition-all duration-300
            hover:scale-110
          "
        >
          <Heart
            className={`
              h-5 w-5 transition-all
              ${
                isFavorite
                  ? "fill-current text-red-500"
                  : ""
              }
            `}
          />
        </button>

        {/* Quick View */}
        <button
          type="button"
          onClick={onQuickView}
          className="
            absolute bottom-20 left-1/2
            flex -translate-x-1/2 translate-y-5
            items-center gap-2
            rounded-full
            bg-background/95
            px-4 py-2
            text-sm font-semibold
            shadow-lg
            opacity-0
            backdrop-blur
            transition-all duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <Eye className="h-4 w-4" />
          Quick View
        </button>

        {/* Add Cart */}
        <div
          className="
            absolute bottom-3 left-3 right-3
            translate-y-16 opacity-0
            transition-all duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <Button
            onClick={handleAddToCart}
            className="w-full rounded-xl shadow-lg"
          >
            {addedToCart ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ================= INFO ================= */}

      <div className="p-4">
        {/* Category */}
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="line-clamp-1 font-bold transition-colors group-hover:text-primary">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current" />

            <span className="text-sm font-semibold">
              {product.rating}
            </span>
          </div>

          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xl font-black">
            ${product.price.toFixed(2)}
          </span>

          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors &&
          product.colors.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Colors:
              </span>

              <div className="flex gap-1.5">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="h-4 w-4 rounded-full border shadow-sm"
                    style={{
                      backgroundColor: color,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

        {/* Sizes */}
        {product.sizes &&
          product.sizes.length > 0 && (
            <div className="mt-3 flex gap-1.5">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="
                    rounded-md border
                    px-2 py-1
                    text-[10px]
                    font-semibold
                    text-muted-foreground
                  "
                >
                  {size}
                </span>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

/* =====================================================
   COLLECTION CARD
===================================================== */

const CollectionCard = ({
  emoji,
  title,
  description,
  onClick,
}: {
  emoji: string;
  title: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group rounded-2xl border
        bg-card p-6 text-left
        transition-all duration-300
        hover:-translate-y-1
        hover:border-primary
        hover:shadow-xl
      "
    >
      <div
        className="
          mb-5 flex h-14 w-14
          items-center justify-center
          rounded-2xl bg-primary/10
          text-3xl
          transition-transform duration-300
          group-hover:scale-110
        "
      >
        {emoji}
      </div>

      <h3 className="text-lg font-bold">
        {title}
      </h3>

      <p className="mt-1 text-sm text-muted-foreground">
        {description}
      </p>

      <div className="mt-4 flex items-center text-sm font-bold text-primary">
        Explore
        <ArrowRight
          className="
            ml-1 h-4 w-4
            transition-transform
            group-hover:translate-x-1
          "
        />
      </div>
    </button>
  );
};

/* =====================================================
   TRUST ITEM
===================================================== */

const TrustItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-center gap-4">
      <div
        className="
          flex h-12 w-12 shrink-0
          items-center justify-center
          rounded-full
          bg-primary/10
          text-primary
        "
      >
        {icon}
      </div>

      <div>
        <h3 className="font-bold">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

/* =====================================================
   QUICK VIEW
===================================================== */

const QuickView = ({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) => {
  const [selectedSize, setSelectedSize] =
    useState(product.sizes?.[0] || "");

  const [selectedColor, setSelectedColor] =
    useState(product.colors?.[0] || "");

  const [added, setAdded] = useState(false);

  const discount =
    product.oldPrice &&
    Math.round(
      ((product.oldPrice - product.price) /
        product.oldPrice) *
        100
    );

  const handleAdd = () => {
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60
        p-4 backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className="
          relative max-h-[90vh]
          w-full max-w-4xl
          overflow-y-auto
          rounded-3xl
          bg-background
          shadow-2xl
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute right-4 top-4 z-20
            flex h-10 w-10
            items-center justify-center
            rounded-full
            bg-background/90
            shadow-md
            transition
            hover:scale-110
          "
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-muted md:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />

            {product.badge && (
              <Badge className="absolute left-5 top-5 rounded-full">
                {product.badge}
              </Badge>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-9">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {product.category}
            </p>

            <h2 className="mt-2 text-2xl font-black md:text-3xl">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-current" />

                <span className="font-bold">
                  {product.rating}
                </span>
              </div>

              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-center gap-3">
              <span className="text-3xl font-black">
                ${product.price.toFixed(2)}
              </span>

              {product.oldPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.oldPrice.toFixed(2)}
                  </span>

                  {discount && (
                    <Badge variant="destructive">
                      Save {discount}%
                    </Badge>
                  )}
                </>
              )}
            </div>

            {/* Divider */}
            <div className="my-6 border-t" />

            {/* Colors */}
            {product.colors &&
              product.colors.length > 0 && (
                <div>
                  <p className="mb-3 text-sm font-bold">
                    Color
                  </p>

                  <div className="flex gap-3">
                    {product.colors.map(
                      (color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() =>
                            setSelectedColor(color)
                          }
                          className={`
                            flex h-9 w-9
                            items-center justify-center
                            rounded-full border-2
                            ${
                              selectedColor === color
                                ? "border-primary"
                                : "border-transparent"
                            }
                          `}
                        >
                          <span
                            className="
                              h-7 w-7
                              rounded-full
                              border
                            "
                            style={{
                              backgroundColor:
                                color,
                            }}
                          />
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* Sizes */}
            {product.sizes &&
              product.sizes.length > 0 && (
                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-bold">
                      Size
                    </p>

                    <button className="text-xs font-semibold text-primary hover:underline">
                      Size Guide
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(
                      (size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() =>
                            setSelectedSize(size)
                          }
                          className={`
                            min-w-12 rounded-lg
                            border px-4 py-2
                            text-sm font-semibold
                            transition
                            ${
                              selectedSize === size
                                ? "border-primary bg-primary text-primary-foreground"
                                : "hover:border-primary"
                            }
                          `}
                        >
                          {size}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* Add */}
            <Button
              size="lg"
              onClick={handleAdd}
              className="mt-8 h-12 w-full rounded-xl"
            >
              {added ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </>
              )}
            </Button>

            {/* Benefits */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                Fast & reliable delivery
              </div>

              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Secure checkout
              </div>

              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-4 w-4 text-primary" />
                Easy returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

