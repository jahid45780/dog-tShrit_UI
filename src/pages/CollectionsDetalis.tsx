import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { useGetSingleProductQuery } from "@/redux/features/product/product.api";

const CollectionsDetalis = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetSingleProductQuery(id!, {
    skip: !id,
  });

  const product = data?.data;

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError || !product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Package className="h-7 w-7 text-muted-foreground" />
          </div>

          <h2 className="text-2xl font-bold">
            Product Not Found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Sorry, we couldn't find the product you're looking for.
          </p>

          <Button className="mt-6">
            <Link to="/collections">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Collections
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const images = [
    product.images?.main,
    product.images?.hover,
  ].filter(Boolean) as string[];

  const activeImage = selectedImage || images[0];

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) /
            product.oldPrice) *
            100
        )
      : 0;

  const isOutOfStock = product.stock <= 0;

  const handleQuantityIncrease = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              to="/"
              className="transition-colors hover:text-foreground"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              to="/collections"
              className="transition-colors hover:text-foreground"
            >
              Collections
            </Link>

            <span>/</span>

            <span className="max-w-50 truncate text-foreground">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          {/* ================= IMAGE SECTION ================= */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="group relative overflow-hidden rounded-2xl border bg-muted/20">
              {product.badge && (
                <div className="absolute left-4 top-4 z-10">
                  <span className="rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background shadow-sm">
                    {product.badge}
                  </span>
                </div>
              )}

              {discount > 0 && (
                <div className="absolute right-4 top-4 z-10">
                  <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                    -{discount}%
                  </span>
                </div>
              )}

              <img
                src={activeImage}
                alt={product.name}
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-2 gap-3">
                {images.map((image, index) => {
                  const isActive = activeImage === image;

                  return (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                        isActive
                          ? "border-foreground ring-2 ring-foreground/10"
                          : "border-transparent hover:border-border"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="aspect-square w-full object-cover"
                      />

                      {isActive && (
                        <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ================= PRODUCT INFO ================= */}
          <div className="flex flex-col">
            {/* Category */}
            <div className="mb-3">
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-bold">
                ${product.price}
              </span>

              {product.oldPrice &&
                product.oldPrice > product.price && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.oldPrice}
                    </span>

                    <span className="rounded-md bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 dark:bg-red-950/30 dark:text-red-400">
                      Save {discount}%
                    </span>
                  </>
                )}
            </div>

            {/* Stock */}
            <div className="mt-5 flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isOutOfStock
                    ? "bg-red-500"
                    : product.stock <= 5
                      ? "bg-orange-500"
                      : "bg-green-500"
                }`}
              />

              <span className="text-sm font-medium">
                {isOutOfStock
                  ? "Out of stock"
                  : product.stock <= 5
                    ? `Only ${product.stock} left in stock`
                    : "In stock"}
              </span>
            </div>

            <div className="my-6 h-px bg-border" />

            {/* Description */}
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide">
                Description
              </h3>

              <p className="leading-7 text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">
                    Color
                  </h3>

                  {selectedColor && (
                    <span className="text-sm text-muted-foreground">
                      {selectedColor}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color: string) => {
                    const selected = selectedColor === color;

                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                          selected
                            ? "border-foreground bg-foreground text-background"
                            : "hover:border-foreground"
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">
                    Size
                  </h3>

                  <button
                    type="button"
                    className="text-xs font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => {
                    const selected = selectedSize === size;

                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`flex h-10 min-w-12 items-center justify-center rounded-lg border px-4 text-sm font-semibold transition-all ${
                          selected
                            ? "border-foreground bg-foreground text-background"
                            : "hover:border-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity + Cart */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {/* Quantity */}
              <div className="flex h-12 items-center justify-between rounded-lg border bg-background sm:w-32">
                <button
                  type="button"
                  onClick={handleQuantityDecrease}
                  disabled={quantity <= 1}
                  className="flex h-full w-10 items-center justify-center text-muted-foreground transition hover:text-foreground disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={handleQuantityIncrease}
                  disabled={quantity >= product.stock}
                  className="flex h-full w-10 items-center justify-center text-muted-foreground transition hover:text-foreground disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Add Cart */}
              <Button
                disabled={isOutOfStock}
                className="h-12 flex-1 rounded-lg"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                {isOutOfStock
                  ? "Out of Stock"
                  : "Add to Cart"}
              </Button>

              {/* Wishlist */}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setIsWishlisted((prev) => !prev)
                }
                className={`h-12 w-12 shrink-0 rounded-lg ${
                  isWishlisted
                    ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/30"
                    : ""
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlisted ? "fill-current" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Benefits */}
            <Card className="mt-8 rounded-2xl shadow-none">
              <CardContent className="grid divide-y p-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <Benefit
                  icon={<Truck className="h-5 w-5" />}
                  title="Fast Delivery"
                  description="Quick & reliable"
                />

                <Benefit
                  icon={<ShieldCheck className="h-5 w-5" />}
                  title="Secure Payment"
                  description="100% protected"
                />

                <Benefit
                  icon={<RotateCcw className="h-5 w-5" />}
                  title="Easy Returns"
                  description="Simple process"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom Description */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              About this product
            </p>

            <h2 className="text-2xl font-bold">
              Made for pet lovers 🐾
            </h2>

            <p className="mt-4 leading-8 text-muted-foreground">
              {product.description}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const Benefit = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

const ProductDetailsSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid animate-pulse gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="aspect-square rounded-2xl bg-muted" />

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="aspect-square rounded-xl bg-muted" />
            <div className="aspect-square rounded-xl bg-muted" />
          </div>
        </div>

        <div className="space-y-5">
          <div className="h-4 w-32 rounded bg-muted" />

          <div className="h-10 w-3/4 rounded bg-muted" />

          <div className="h-8 w-40 rounded bg-muted" />

          <div className="h-px w-full bg-muted" />

          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-5/6 rounded bg-muted" />
          </div>

          <div className="h-20 w-full rounded bg-muted" />

          <div className="h-20 w-full rounded bg-muted" />

          <div className="h-12 w-full rounded bg-muted" />
        </div>
      </div>
    </div>
  );
};

export default CollectionsDetalis;