import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Star,
  Trophy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";


import { useAddToCartMutation } from "@/redux/features/addCard/add.card.api";
import { useGetBestSellingTodayQuery } from "@/redux/features/product/product.api";
import type { IProduct } from "@/types";



const BestSellingTShirts = () => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
  } = useGetBestSellingTodayQuery();

  const [addToCart, { isLoading: isAddingToCart }] =
    useAddToCartMutation();

  const products: IProduct[] = data?.data ?? [];

  // Selected product
  const [selectedProduct, setSelectedProduct] =
    useState<IProduct | null>(null);

  // Selected color
  const [selectedColor, setSelectedColor] =
    useState("");

  // Selected size
  const [selectedSize, setSelectedSize] =
    useState("");

  // Dialog open
  const [isDialogOpen, setIsDialogOpen] =
    useState(false);

  // ==========================================
  // OPEN ADD TO CART DIALOG
  // ==========================================
  const handleOpenAddToCart = (product: IProduct) => {
    setSelectedProduct(product);

    // Reset previous selection
    setSelectedColor("");
    setSelectedSize("");

    setIsDialogOpen(true);
  };

  // ==========================================
  // ADD TO CART
  // ==========================================
  const handleAddToCart = async () => {
    if (!selectedProduct) {
      return;
    }

    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    if (selectedProduct.stock <= 0) {
      toast.error("This product is out of stock");
      return;
    }

    try {
      await addToCart({
        product: selectedProduct._id,
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
      }).unwrap();

      toast.success("Product added to cart successfully");

      navigate("/user/my-card")

      setIsDialogOpen(false);

      // Reset
      setSelectedProduct(null);
      setSelectedColor("");
      setSelectedSize("");
    } catch (error: any) {
      console.error("Add to cart error:", error);

      toast.error(
          "Please log in to your account first. Once you’re logged in, add your card details and then complete the payment."
      );

       navigate("/login")
    }
  };

  return (
    <>
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">

          {/* ================= HEADER ================= */}
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />

                <span className="text-sm font-semibold uppercase tracking-wider text-yellow-600">
                  Best Sellers
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Our Best Selling T-Shirts
              </h2>

              <p className="mt-3 max-w-2xl text-muted-foreground">
                Discover the T-shirts loved most by pet lovers.
              </p>
            </div>

            <Button
              variant="ghost"
              className="group w-fit"
              onClick={() =>
                navigate(
                  "/collections?badge=Best%20Seller"
                )
              }
            >
              View All

              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* ================= LOADING ================= */}
          {isLoading && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border bg-card"
                  >
                    <div className="aspect-square animate-pulse bg-muted" />

                    <div className="space-y-3 p-4">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />

                      <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />

                      <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* ================= ERROR ================= */}
          {isError && !isLoading && (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-10 text-center">
              <h3 className="text-lg font-semibold">
                Failed to load best selling products
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Please try again later.
              </p>
            </div>
          )}

          {/* ================= EMPTY ================= */}
          {!isLoading &&
            !isError &&
            products.length === 0 && (
              <div className="rounded-2xl border p-10 text-center">
                <ShoppingBag className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

                <h3 className="text-lg font-semibold">
                  No best selling products found
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Best selling products will appear here.
                </p>
              </div>
            )}

          {/* ================= PRODUCTS ================= */}
          {!isLoading &&
            !isError &&
            products.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="group relative overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* IMAGE */}
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.images?.main}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* BEST SELLER */}
                      <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                        <Trophy className="h-3.5 w-3.5" />

                        Best Seller
                      </div>

                      {/* WISHLIST */}
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute right-3 top-3 h-9 w-9 rounded-full opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>

                      {/* QUICK ADD */}
                      <div className="absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <Button
                          className="w-full"
                          disabled={product.stock <= 0}
                          onClick={() =>
                            handleOpenAddToCart(product)
                          }
                        >
                          <ShoppingBag className="mr-2 h-4 w-4" />

                          {product.stock > 0
                            ? "Add to Cart"
                            : "Out of Stock"}
                        </Button>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-4">
                      <h3 className="line-clamp-2 min-h-[48px] font-semibold">
                        {product.name}
                      </h3>

                      {/* RATING */}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                          <span className="text-sm font-medium">
                            {product.rating ?? 0}
                          </span>
                        </div>

                        <span className="text-sm text-muted-foreground">
                          ({product.reviews ?? 0})
                        </span>
                      </div>

                      {/* PRICE */}
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-lg font-bold">
                          ৳
                          {Number(product.price).toFixed(
                            2
                          )}
                        </span>

                        {product.oldPrice &&
                          Number(product.oldPrice) >
                            Number(product.price) && (
                            <span className="text-sm text-muted-foreground line-through">
                              ৳
                              {Number(
                                product.oldPrice
                              ).toFixed(2)}
                            </span>
                          )}
                      </div>

                      {/* COLORS / SIZES */}
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          {product.colors?.length ?? 0}{" "}
                          Colors
                        </span>

                        <span className="text-muted-foreground">
                          {product.sizes?.length ?? 0}{" "}
                          Sizes
                        </span>
                      </div>

                      {/* STOCK */}
                      <div className="mt-2">
                        {product.stock > 0 ? (
                          <span className="text-xs font-medium text-green-600">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-red-500">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          {/* ================= SHOP ALL ================= */}
          {!isLoading && products.length > 0 && (
            <div className="mt-10 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="group"
                onClick={() =>
                  navigate(
                    "/collections?badge=Best%20Seller"
                  )
                }
              >
                Shop All Best Sellers

                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          ADD TO CART DIALOG
      ===================================================== */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Add to Cart
            </DialogTitle>

            <DialogDescription>
              Select your preferred color and size.
            </DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-6">

              {/* PRODUCT */}
              <div className="flex gap-4">
                <img
                  src={selectedProduct.images?.main}
                  alt={selectedProduct.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />

                <div>
                  <h3 className="font-semibold">
                    {selectedProduct.name}
                  </h3>

                  <p className="mt-1 font-bold">
                    ৳
                    {Number(
                      selectedProduct.price
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* COLOR */}
              <div>
                <h4 className="mb-3 text-sm font-semibold">
                  Select Color
                </h4>

                <div className="flex flex-wrap gap-2">
                  {selectedProduct.colors?.map(
                    (color) => (
                      <Button
                        key={color}
                        type="button"
                        variant={
                          selectedColor === color
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setSelectedColor(color)
                        }
                      >
                        {color}
                      </Button>
                    )
                  )}
                </div>
              </div>

              {/* SIZE */}
              <div>
                <h4 className="mb-3 text-sm font-semibold">
                  Select Size
                </h4>

                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes?.map(
                    (size) => (
                      <Button
                        key={size}
                        type="button"
                        variant={
                          selectedSize === size
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setSelectedSize(size)
                        }
                      >
                        {size}
                      </Button>
                    )
                  )}
                </div>
              </div>

              {/* ADD */}
              <Button
                className="w-full"
                disabled={isAddingToCart}
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />

                {isAddingToCart
                  ? "Adding..."
                  : "Add to Cart"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BestSellingTShirts;