import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Package,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useGetAllProductQuery } from "@/redux/features/product/product.api";

const categories = [
  "All",
  "Dog Lovers",
  "Cat Lovers",
  "Paw Collection",
  "Custom",
];

const sortOptions = [
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Price: Low to High",
    value: "price-low",
  },
  {
    label: "Price: High to Low",
    value: "price-high",
  },
  {
    label: "Most Popular",
    value: "popular",
  },
];

const Collections = () => {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  // 6 products per page
  const limit = 6;

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isFetching, isError } =
    useGetAllProductQuery({
      search,
      category,
      sort,
      page,
      limit,
    });

  const products = data?.data ?? [];

  const total = data?.meta?.total ?? 0;
  const totalPage = data?.meta?.totalPage ?? 1;

  const hasFilters =
    searchInput.trim().length > 0 ||
    category !== "All" ||
    sort !== "newest";

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setCategory("All");
    setSort("newest");
    setPage(1);
  };

  const getDiscount = (price: number, oldPrice?: number) => {
    if (!oldPrice || oldPrice <= price) {
      return 0;
    }

    return Math.round(((oldPrice - price) / oldPrice) * 100);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPage - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPage - 2) {
      pages.push("...");
    }

    pages.push(totalPage);

    return pages;
  };

  return (
    <main className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-background to-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-flex rounded-full border bg-background/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
              AtNamira Collection
            </span>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Find Something Your
              <span className="block text-primary">
                Pet-Loving Heart Will Love
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Explore our collection of pet-inspired products made for people
              who love their furry friends.
            </p>
          </div>
        </div>
      </section>

      {/* ================= COLLECTION ================= */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ================= FILTER BOX ================= */}
        <div className="mb-8 rounded-2xl border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="h-11 w-full rounded-xl border bg-background pl-10 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
                <SlidersHorizontal className="h-4 w-4" />
                Sort:
              </div>

              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="h-11 min-w-[190px] rounded-xl border bg-background px-3 text-sm font-medium outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {sortOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCategory(item);
                  setPage(1);
                }}
                className={cn(
                  "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  category === item
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Active Filters */}
          {hasFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
              <span className="text-xs text-muted-foreground">
                Active filters:
              </span>

              {searchInput && (
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  Search: {searchInput}
                </span>
              )}

              {category !== "All" && (
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  {category}
                </span>
              )}

              {sort !== "newest" && (
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  {sortOptions.find(
                    (item) => item.value === sort,
                  )?.label}
                </span>
              )}

              <button
                type="button"
                onClick={clearFilters}
                className="ml-auto text-xs font-semibold text-destructive hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* ================= RESULT HEADER ================= */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Our Collections
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {isFetching
                ? "Updating products..."
                : `${total} products found`}
            </p>
          </div>

          {isFetching && (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          )}
        </div>

        {/* ================= LOADING ================= */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border bg-card"
              >
                <div className="aspect-[4/3] animate-pulse bg-muted" />

                <div className="space-y-3 p-3.5">
                  <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= ERROR ================= */}
        {!isLoading && isError && (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 px-6 text-center">
            <div className="mb-4 rounded-full bg-destructive/10 p-4">
              <Package className="h-8 w-8 text-destructive" />
            </div>

            <h3 className="text-lg font-semibold">
              Failed to load products
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Something went wrong while loading the collection.
              Please try again.
            </p>
          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!isLoading && !isError && products.length === 0 && (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border bg-card px-6 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>

            <h3 className="text-lg font-semibold">
              No products found
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              We couldn't find any products matching your search or
              filters.
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* ================= PRODUCTS ================= */}
        {!isLoading && !isError && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => {
                const discount = getDiscount(
                  product.price,
                  product.oldPrice,
                );

                return (
                  <article
                    key={product._id}
                    className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Product Image */}
                    <Link
                      to={`/product/${product._id}`}
                      className="relative block aspect-[4/3] overflow-hidden bg-muted"
                    >
                      {/* Main Image */}
                      <img
                        src={product.images.main}
                        alt={product.name}
                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
                      />

                      {/* Hover Image */}
                      {product.images.hover && (
                        <img
                          src={product.images.hover}
                          alt={`${product.name} hover`}
                          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                        />
                      )}

                      {/* Badge */}
                      {product.badge && (
                        <span className="absolute left-3 top-3 rounded-full bg-background/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wide shadow-sm backdrop-blur">
                          {product.badge}
                        </span>
                      )}

                      {/* Discount */}
                      {discount > 0 && (
                        <span className="absolute right-3 top-3 rounded-full bg-destructive px-3 py-1 text-[10px] font-bold text-destructive-foreground shadow-sm">
                          -{discount}%
                        </span>
                      )}

                      {/* Wishlist */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-muted-foreground opacity-0 shadow-md backdrop-blur transition-all duration-300 hover:text-destructive group-hover:opacity-100"
                        aria-label="Add to wishlist"
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                    </Link>

                    {/* Content */}
                    <div className="p-3.5">
                      {/* Category */}
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {product.category}
                      </p>

                      {/* Product Name */}
                      <Link
                        to={`/product/${product.slug}`}
                        className="line-clamp-1 text-base font-semibold transition-colors hover:text-primary"
                      >
                        {product.name}
                      </Link>

                      {/* Description */}
                      <p className="mt-1.5 line-clamp-1 text-xs leading-5 text-muted-foreground">
                        {product.description}
                      </p>

                      {/* Price */}
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xl font-bold">
                          ${product.price}
                        </span>

                        {product.oldPrice &&
                          product.oldPrice > product.price && (
                            <span className="text-xs text-muted-foreground line-through">
                              ${product.oldPrice}
                            </span>
                          )}
                      </div>

                      {/* Colors */}
                      {product.colors?.length > 0 && (
                        <div className="mt-3">
                          <p className="mb-1.5 text-[11px] font-semibold text-muted-foreground">
                            Colors
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {product.colors
                              .slice(0, 4)
                              .map((color) => (
                                <span
                                  key={color}
                                  className="rounded-md border bg-muted/40 px-1.5 py-0.5 text-[10px]"
                                >
                                  {color}
                                </span>
                              ))}

                            {product.colors.length > 4 && (
                              <span className="rounded-md border bg-muted/40 px-1.5 py-0.5 text-[10px]">
                                +{product.colors.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Sizes */}
                      {product.sizes?.length > 0 && (
                        <div className="mt-2.5">
                          <p className="mb-1.5 text-[11px] font-semibold text-muted-foreground">
                            Sizes
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {product.sizes
                              .slice(0, 5)
                              .map((size) => (
                                <span
                                  key={size}
                                  className="rounded-md border px-1.5 py-0.5 text-[10px] font-medium"
                                >
                                  {size}
                                </span>
                              ))}

                            {product.sizes.length > 5 && (
                              <span className="rounded-md border px-1.5 py-0.5 text-[10px]">
                                +{product.sizes.length - 5}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Bottom */}
                      <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3">
                        <div>
                          {product.stock > 0 ? (
                            <p className="text-[11px] font-medium text-green-600">
                              {product.stock} in stock
                            </p>
                          ) : (
                            <p className="text-[11px] font-medium text-destructive">
                              Out of stock
                            </p>
                          )}
                        </div>

                        <Link
                          to={`/product/${product._id}`}
                          className="rounded-lg bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground transition hover:bg-primary/90"
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* ================= PAGINATION ================= */}
            {totalPage > 1 && (
              <div className="mt-10 flex flex-col items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {/* Previous */}
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() =>
                      setPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background transition hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((item, index) =>
                    item === "..." ? (
                      <span
                        key={`dots-${index}`}
                        className="flex h-9 w-7 items-center justify-center text-sm text-muted-foreground"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setPage(item as number)}
                        className={cn(
                          "flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-xs font-medium transition",
                          page === item
                            ? "border-primary bg-primary text-primary-foreground"
                            : "bg-background hover:bg-muted",
                        )}
                      >
                        {item}
                      </button>
                    ),
                  )}

                  {/* Next */}
                  <button
                    type="button"
                    disabled={page === totalPage}
                    onClick={() =>
                      setPage((prev) =>
                        Math.min(prev + 1, totalPage),
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background transition hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-xs text-muted-foreground">
                  Page {page} of {totalPage}
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Collections;