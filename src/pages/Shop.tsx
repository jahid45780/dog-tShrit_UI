
import { useEffect, useMemo, useState } from "react";
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
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Change this import according to your actual ProductApi file
import {
  useGetAllProductQuery,
  useGetBestSellingTodayQuery,
} from "@/redux/features/product/product.api";


import { toast } from "sonner";
import type { IProduct } from "@/types";
import { useAddToCartMutation } from "@/redux/features/addCard/add.card.api";

/* =====================================================
   TYPES
===================================================== */

type SortValue =
  | "newest"
  | "price-low"
  | "price-high"
  | "rating"
  | "popular"
  | "size"
  | "size-desc";

interface ProductCardProps {
  product: IProduct;
  onQuickView: () => void;
  onAddToCart: (
    product: IProduct,
    size?: string,
    color?: string
  ) => void;
}

interface QuickViewProps {
  product: IProduct;
  onClose: () => void;
  onAddToCart: (
    product: IProduct,
    size: string,
    color: string
  ) => void;
}

/* =====================================================
   COLOR HELPER

   Backend colors are usually names like:
   White / Black / Navy / Pink

   This converts names to UI colors.
===================================================== */

const getColorValue = (color: string) => {
  const colorMap: Record<string, string> = {
    white: "#ffffff",
    black: "#111111",
    navy: "#172554",
    blue: "#2563eb",
    red: "#ef4444",
    green: "#22c55e",
    yellow: "#eab308",
    orange: "#f97316",
    pink: "#ec4899",
    purple: "#a855f7",
    gray: "#9ca3af",
    grey: "#9ca3af",
    brown: "#92400e",
    beige: "#f5f5dc",
  };

  return colorMap[color.toLowerCase()] || color;
};

/* =====================================================
   SHOP PAGE
===================================================== */

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const [sortBy, setSortBy] =
    useState<SortValue>("newest");

  const [activeBadge, setActiveBadge] =
    useState("All");

  const [page, setPage] = useState(1);

  const limit = 12;

  const [quickViewProduct, setQuickViewProduct] =
    useState<IProduct | null>(null);

  /* =====================================================
     API
  ===================================================== */

  const {
    data: productResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAllProductQuery({
    search,
    category: activeCategory,
    badge: activeBadge,
    sort: sortBy,
    page,
    limit,
  });

  const {
    data: bestSellingResponse,
    isLoading: bestSellingLoading,
  } = useGetBestSellingTodayQuery();

  const [addToCart, { isLoading: addingToCart }] =
    useAddToCartMutation();


  const products: IProduct[] = useMemo(() => {
    const response = productResponse as any;

    if (!response) return [];

    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (Array.isArray(response?.data?.data)) {
      return response.data.data;
    }

    return [];
  }, [productResponse]);

  const meta = useMemo(() => {
    const response = productResponse as any;

    return (
      response?.meta ||
      response?.data?.meta || {
        total: 0,
        page: 1,
        limit,
        totalPage: 1,
      }
    );
  }, [productResponse, limit]);

  /* =====================================================
     BEST SELLING PRODUCTS
  ===================================================== */

  const bestSellingProducts: IProduct[] =
    useMemo(() => {
      const response =
        bestSellingResponse as any;

      if (!response) return [];

      if (Array.isArray(response?.products)) {
        return response.products;
      }

      if (Array.isArray(response?.data?.products)) {
        return response.data.products;
      }

      if (Array.isArray(response?.data)) {
        return response.data;
      }

      return [];
    }, [bestSellingResponse]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);



  const handleCategoryChange = (
    category: string
  ) => {
    setActiveCategory(category);
    setPage(1);
  };



  const handleSortChange = (
    value: SortValue
  ) => {
    setSortBy(value);
    setPage(1);
  };

  /* =====================================================
     BADGE
  ===================================================== */

  const handleBadgeChange = (
    badge: string
  ) => {
    setActiveBadge(badge);
    setPage(1);
  };


  const handleAddToCart = async (
    product: IProduct,
    size?: string,
    color?: string
  ) => {
    try {
      if (!product?._id) {
        toast.error("Product ID not found");
        return;
      }

      const selectedSize =
        size || product.sizes?.[0];

      const selectedColor =
        color || product.colors?.[0];

      if (
        product.sizes?.length &&
        !selectedSize
      ) {
        toast.error("Please select a size");
        return;
      }

      if (
        product.colors?.length &&
        !selectedColor
      ) {
        toast.error("Please select a color");
        return;
      }

      await addToCart({
        product: product._id,
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
      } as any).unwrap();

      toast.success("Added to cart!", {
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Failed to add product to cart"
      );
    }
  };

  /* =====================================================
     RESET FILTER
  ===================================================== */

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setActiveCategory("All");
    setActiveBadge("All");
    setSortBy("newest");
    setPage(1);
  };

  /* =====================================================
     CATEGORIES
  ===================================================== */

  const categories = [
    "All",
    "Dog Lovers",
    "Cat Lovers",
    "Paw Collection",
    "Custom",
  ];

  /* =====================================================
     BADGES
  ===================================================== */

  const badges = [
    "All",
    "Trending",
    "Best Seller",
    "New",
    "Popular",
    "Sale",
  ];

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main className="min-h-screen bg-background">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden border-b bg-muted/30">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="container relative mx-auto px-4 py-16 text-center md:py-24">
          <Badge className="mb-5 rounded-full px-4 py-1.5">
            <PawPrint className="mr-2 h-4 w-4" />
            Made for Pet Lovers
          </Badge>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Wear Your
            <span className="block text-primary">
              Love for Pets ❤️
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground md:text-lg">
            Premium T-shirts designed for dog
            lovers, cat lovers and everyone who
            believes pets make life better.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={searchInput}
                onChange={(e) =>
                  setSearchInput(e.target.value)
                }
                placeholder="Search your favorite T-shirt..."
                className="h-12 rounded-full bg-background pl-12 shadow-sm"
              />
            </div>

            <Button
              className="h-12 rounded-full px-6"
              onClick={() => {
                setSearch(searchInput);
                setPage(1);
              }}
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* =================================================
          BEST SELLING TODAY
      ================================================= */}

      {!bestSellingLoading &&
        bestSellingProducts.length > 0 && (
          <section className="container mx-auto px-4 py-14">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <span className="text-xl">🔥</span>

                  <span className="text-sm font-bold uppercase tracking-wider">
                    Customer Favorites
                  </span>
                </div>

                <h2 className="text-2xl font-black md:text-3xl">
                  Best Selling Today
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Loved by pet parents everywhere
                </p>
              </div>

              <Button
                variant="ghost"
                className="hidden sm:flex"
                onClick={() => {
                  setActiveBadge("Best Seller");
                  setPage(1);
                }}
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {bestSellingProducts
                .slice(0, 4)
                .map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onQuickView={() =>
                      setQuickViewProduct(product)
                    }
                    onAddToCart={
                      handleAddToCart
                    }
                  />
                ))}
            </div>
          </section>
        )}

      {/* =================================================
          COLLECTIONS
      ================================================= */}

      <section className="container mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            Explore
          </p>

          <h2 className="mt-2 text-2xl font-black md:text-3xl">
            Shop by Collection
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Find a T-shirt that perfectly
            represents your love for your pet.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CollectionCard
            emoji="🐶"
            title="Dog Lovers"
            description="For proud dog parents"
            onClick={() =>
              handleCategoryChange(
                "Dog Lovers"
              )
            }
          />

          <CollectionCard
            emoji="🐱"
            title="Cat Lovers"
            description="Made for cat people"
            onClick={() =>
              handleCategoryChange(
                "Cat Lovers"
              )
            }
          />

          <CollectionCard
            emoji="🐾"
            title="Paw Collection"
            description="Simple paw designs"
            onClick={() =>
              handleCategoryChange(
                "Paw Collection"
              )
            }
          />

          <CollectionCard
            emoji="✨"
            title="Custom"
            description="Create your own T-shirt"
            onClick={() =>
              handleCategoryChange("Custom")
            }
          />
        </div>
      </section>

      {/* =================================================
          SHOP SECTION
      ================================================= */}

      <section
        id="products"
        className="container mx-auto px-4 py-14"
      >
        {/* FILTER BAR */}

        <div className="mb-8 rounded-2xl border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* SEARCH */}

            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={searchInput}
                onChange={(e) =>
                  setSearchInput(e.target.value)
                }
                placeholder="Search T-shirts..."
                className="h-11 rounded-xl pl-10"
              />
            </div>

            {/* SORT */}

            <div className="flex flex-wrap gap-2">
              <select
                value={sortBy}
                onChange={(e) =>
                  handleSortChange(
                    e.target.value as SortValue
                  )
                }
                className="h-10 rounded-xl border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="newest">
                  Newest
                </option>

                <option value="popular">
                  Most Popular
                </option>

                <option value="rating">
                  Top Rated
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="size">
                  Size
                </option>

                <option value="size-desc">
                  Size Descending
                </option>
              </select>

              {(search ||
                activeCategory !== "All" ||
                activeBadge !== "All" ||
                sortBy !== "newest") && (
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={clearFilters}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* CATEGORIES */}

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
                  handleCategoryChange(
                    category
                  )
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* BADGES */}

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {badges.map((badge) => (
              <Button
                key={badge}
                size="sm"
                variant={
                  activeBadge === badge
                    ? "secondary"
                    : "ghost"
                }
                className="shrink-0 rounded-full"
                onClick={() =>
                  handleBadgeChange(badge)
                }
              >
                {badge}
              </Button>
            ))}
          </div>
        </div>

        {/* HEADER */}

        <div className="mb-7 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-black">
              All Products
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {meta.total || 0} products available
            </p>
          </div>

          {isFetching && !isLoading && (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          )}
        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {isLoading ? (
          <ProductSkeleton />
        ) : isError ? (
          /* =================================================
             ERROR
          ================================================= */

          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed">
            <div className="mb-4 rounded-full bg-destructive/10 p-4">
              <X className="h-8 w-8 text-destructive" />
            </div>

            <h3 className="text-lg font-bold">
              Failed to load products
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Something went wrong while loading
              products.
            </p>

            <Button
              className="mt-5 rounded-full"
              onClick={() => refetch()}
            >
              Try Again
            </Button>
          </div>
        ) : products.length > 0 ? (
          <>
            {/* =================================================
                PRODUCTS
            ================================================= */}

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onQuickView={() =>
                    setQuickViewProduct(product)
                  }
                  onAddToCart={
                    handleAddToCart
                  }
                />
              ))}
            </div>

            {/* =================================================
                PAGINATION
            ================================================= */}

            {meta.totalPage > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page <= 1}
                  onClick={() =>
                    setPage((prev) =>
                      Math.max(prev - 1, 1)
                    )
                  }
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from(
                  {
                    length: meta.totalPage,
                  },
                  (_, index) => index + 1
                )
                  .slice(
                    Math.max(page - 3, 0),
                    Math.min(
                      page + 2,
                      meta.totalPage
                    )
                  )
                  .map((pageNumber) => (
                    <Button
                      key={pageNumber}
                      variant={
                        pageNumber === page
                          ? "default"
                          : "outline"
                      }
                      className="h-10 w-10"
                      onClick={() =>
                        setPage(pageNumber)
                      }
                    >
                      {pageNumber}
                    </Button>
                  ))}

                <Button
                  variant="outline"
                  size="icon"
                  disabled={
                    page >= meta.totalPage
                  }
                  onClick={() =>
                    setPage((prev) =>
                      Math.min(
                        prev + 1,
                        meta.totalPage
                      )
                    )
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          /* =================================================
             EMPTY
          ================================================= */

          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed">
            <div className="mb-4 rounded-full bg-muted p-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>

            <h3 className="text-lg font-bold">
              No products found
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Try another search or category.
            </p>

            <Button
              className="mt-5 rounded-full"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* =================================================
          CUSTOM T-SHIRT
      ================================================= */}

      {/* <section className="container mx-auto px-4 py-12">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground md:px-12">
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10" />

          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10" />

          <div className="relative mx-auto max-w-2xl">
            <PawPrint className="mx-auto mb-5 h-10 w-10" />

            <h2 className="text-3xl font-black md:text-4xl">
              Create Your Own T-Shirt
            </h2>

            <p className="mt-4 text-primary-foreground/80">
              Put your favorite pet, name, or
              special message on a T-shirt made
              just for you.
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
      </section> */}
ll
      {/* =================================================
          TRUST
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
          QUICK VIEW
      ================================================= */}

      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          onClose={() =>
            setQuickViewProduct(null)
          }
          onAddToCart={handleAddToCart}
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
  onAddToCart,
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] =
    useState(false);

  const discount =
    product.oldPrice &&
    Math.round(
      ((product.oldPrice - product.price) /
        product.oldPrice) *
        100
    );

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
      {/* IMAGE */}

      <div className="relative aspect-square overflow-hidden bg-muted">
        {/* MAIN IMAGE */}

        <img
          src={product.images?.main}
          alt={product.name}
          className={`
            absolute inset-0 h-full w-full
            object-cover
            transition-all duration-700
            ${
              product.images?.hover
                ? "group-hover:scale-105 group-hover:opacity-0"
                : "group-hover:scale-105"
            }
          `}
        />

        {/* HOVER IMAGE */}

        {product.images?.hover && (
          <img
            src={product.images.hover}
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

        {/* BADGE */}

        {product.badge && (
          <Badge className="absolute left-3 top-3 rounded-full px-3 py-1">
            {product.badge}
          </Badge>
        )}

        {/* DISCOUNT */}

        {discount && discount > 0 && (
          <span
            className="
              absolute left-3 top-12
              rounded-full bg-destructive
              px-2.5 py-1
              text-xs font-bold
              text-destructive-foreground
            "
          >
            -{discount}%
          </span>
        )}

        {/* WISHLIST */}

        <button
          type="button"
          onClick={() =>
            setIsFavorite(!isFavorite)
          }
          className="
            absolute right-3 top-3
            flex h-10 w-10 items-center justify-center
            rounded-full border
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

        {/* QUICK VIEW */}

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

        {/* ADD CART */}

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
            onClick={() =>
              onAddToCart(product)
            }
            className="w-full rounded-xl shadow-lg"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* INFO */}

      <div className="p-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {product.category}
        </p>

        <h3 className="line-clamp-1 font-bold transition-colors group-hover:text-primary">
          {product.name}
        </h3>

        {/* RATING */}

        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current" />

            <span className="text-sm font-semibold">
              {product.rating ?? 0}
            </span>
          </div>

          <span className="text-xs text-muted-foreground">
            ({product.reviews ?? 0})
          </span>
        </div>

        {/* PRICE */}

        <div className="mt-3 flex items-center gap-2">
          <span className="text-xl font-black">
            ${Number(product.price).toFixed(2)}
          </span>

          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              $
              {Number(
                product.oldPrice
              ).toFixed(2)}
            </span>
          )}
        </div>

        {/* COLORS */}

        {product.colors?.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Colors:
            </span>

            <div className="flex gap-1.5">
              {product.colors
                .slice(0, 5)
                .map((color) => (
                  <span
                    key={color}
                    title={color}
                    className="h-4 w-4 rounded-full border shadow-sm"
                    style={{
                      backgroundColor:
                        getColorValue(color),
                    }}
                  />
                ))}
            </div>
          </div>
        )}

        {/* SIZES */}

        {product.sizes?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.sizes
              .slice(0, 5)
              .map((size) => (
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

        {/* STOCK */}

        <div className="mt-3">
          {product.stock > 0 ? (
            <span className="text-xs font-medium text-green-600">
              ✓ In Stock
            </span>
          ) : (
            <span className="text-xs font-medium text-destructive">
              Out of Stock
            </span>
          )}
        </div>
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
          rounded-full bg-primary/10
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
   PRODUCT SKELETON
===================================================== */

const ProductSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map(
        (_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border bg-card"
          >
            <div className="aspect-square animate-pulse bg-muted" />

            <div className="space-y-3 p-4">
              <div className="h-3 w-20 animate-pulse rounded bg-muted" />

              <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />

              <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />

              <div className="h-6 w-24 animate-pulse rounded bg-muted" />
            </div>
          </div>
        )
      )}
    </div>
  );
};

/* =====================================================
   QUICK VIEW
===================================================== */

const QuickView = ({
  product,
  onClose,
  onAddToCart,
}: QuickViewProps) => {
  const [selectedSize, setSelectedSize] =
    useState(product.sizes?.[0] || "");

  const [selectedColor, setSelectedColor] =
    useState(product.colors?.[0] || "");

  const [quantity, setQuantity] = useState(1);

  const discount =
    product.oldPrice &&
    Math.round(
      ((product.oldPrice - product.price) /
        product.oldPrice) *
        100
    );

  const handleAdd = async () => {
    for (let i = 0; i < quantity; i++) {
      await onAddToCart(
        product,
        selectedSize,
        selectedColor
      );
    }
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
          w-full max-w-5xl
          overflow-y-auto
          rounded-3xl
          bg-background
          shadow-2xl
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* CLOSE */}

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
          {/* IMAGE */}

          <div className="relative aspect-square overflow-hidden bg-muted md:aspect-auto">
            <img
              src={product.images?.main}
              alt={product.name}
              className="h-full w-full object-cover"
            />

            {product.badge && (
              <Badge className="absolute left-5 top-5 rounded-full">
                {product.badge}
              </Badge>
            )}
          </div>

          {/* DETAILS */}

          <div className="p-6 md:p-9">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {product.category}
            </p>

            <h2 className="mt-2 text-2xl font-black md:text-3xl">
              {product.name}
            </h2>

            {/* RATING */}

            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-current" />

                <span className="font-bold">
                  {product.rating ?? 0}
                </span>
              </div>

              <span className="text-sm text-muted-foreground">
                ({product.reviews ?? 0} reviews)
              </span>
            </div>

            {/* PRICE */}

            <div className="mt-5 flex items-center gap-3">
              <span className="text-3xl font-black">
                $
                {Number(
                  product.price
                ).toFixed(2)}
              </span>

              {product.oldPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    $
                    {Number(
                      product.oldPrice
                    ).toFixed(2)}
                  </span>

                  {discount && (
                    <Badge variant="destructive">
                      Save {discount}%
                    </Badge>
                  )}
                </>
              )}
            </div>

            {/* DESCRIPTION */}

            {product.description && (
              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                {product.description}
              </p>
            )}

            <div className="my-6 border-t" />

            {/* COLORS */}

            {product.colors?.length > 0 && (
              <div>
                <p className="mb-3 text-sm font-bold">
                  Color
                </p>

                <div className="flex flex-wrap gap-3">
                  {product.colors.map(
                    (color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() =>
                          setSelectedColor(
                            color
                          )
                        }
                        title={color}
                        className={`
                          flex h-10 w-10
                          items-center justify-center
                          rounded-full border-2
                          ${
                            selectedColor ===
                            color
                              ? "border-primary"
                              : "border-transparent"
                          }
                        `}
                      >
                        <span
                          className="
                            h-8 w-8
                            rounded-full border
                          "
                          style={{
                            backgroundColor:
                              getColorValue(
                                color
                              ),
                          }}
                        />
                      </button>
                    )
                  )}
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  Selected: {selectedColor}
                </p>
              </div>
            )}

            {/* SIZE */}

            {product.sizes?.length > 0 && (
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
                          setSelectedSize(
                            size
                          )
                        }
                        className={`
                          min-w-12 rounded-lg
                          border px-4 py-2
                          text-sm font-semibold
                          transition
                          ${
                            selectedSize ===
                            size
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

            {/* QUANTITY */}

            <div className="mt-6">
              <p className="mb-3 text-sm font-bold">
                Quantity
              </p>

              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity((q) =>
                      Math.max(q - 1, 1)
                    )
                  }
                >
                  -
                </Button>

                <span className="w-12 text-center font-bold">
                  {quantity}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity((q) =>
                      Math.min(
                        q + 1,
                        product.stock || 99
                      )
                    )
                  }
                >
                  +
                </Button>
              </div>
            </div>

            {/* ADD CART */}

            <Button
              size="lg"
              disabled={product.stock <= 0}
              onClick={handleAdd}
              className="mt-8 h-12 w-full rounded-xl"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />

              {product.stock > 0
                ? "Add to Cart"
                : "Out of Stock"}
            </Button>

            {/* BENEFITS */}

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

