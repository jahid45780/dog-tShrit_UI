import {
  ArrowRight,
  Check,
  Heart,
  Loader2,
  ShoppingBag,
  Star,
  TrendingUp,
} from "lucide-react";

import { useState } from "react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "sonner";

import { useGetAllProductQuery } from "@/redux/features/product/product.api";

import type {
  IAddToCartPayload,
  IProduct,
} from "@/types";

import { useAddToCartMutation } from "@/redux/features/addCard/add.card.api";


// ============================================================
// CONSTANT
// ============================================================

const TRENDING_LIMIT = 10;


// ============================================================
// COMPONENT
// ============================================================

const TrendingProducts = () => {
  // ============================================================
  // PRODUCTS
  // ============================================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetAllProductQuery({
    badge: "Trending",
    sort: "newest",
    page: 1,
    limit: TRENDING_LIMIT,
  });

  const products: IProduct[] = data?.data ?? [];


  // ============================================================
  // ADD TO CART API
  // ============================================================

  const [addToCart, { isLoading: isAddingToCart }] =
    useAddToCartMutation();


  // ============================================================
  // QUICK ADD DIALOG
  // ============================================================

  const [selectedProduct, setSelectedProduct] =
    useState<IProduct | null>(null);

  const [selectedColor, setSelectedColor] =
    useState<string>("");

  const [selectedSize, setSelectedSize] =
    useState<string>("");


  // ============================================================
  // ADDED PRODUCT
  // ============================================================

  const [addedProductId, setAddedProductId] =
    useState<string | null>(null);


  // ============================================================
  // OPEN QUICK ADD
  // ============================================================

  const handleOpenQuickAdd = (product: IProduct) => {
    if (product.stock <= 0) {
      toast.error("This product is out of stock.");
      return;
    }

    setSelectedProduct(product);

    // Reset previous selections
    setSelectedColor("");
    setSelectedSize("");
  };


  // ============================================================
  // CLOSE DIALOG
  // ============================================================

  const handleCloseDialog = () => {
    if (isAddingToCart) return;

    setSelectedProduct(null);
    setSelectedColor("");
    setSelectedSize("");
  };


  // ============================================================
  // ADD TO CART
  // ============================================================

  const handleAddToCart = async () => {
    if (!selectedProduct) return;


    // ----------------------------------------------------------
    // Validate Color
    // ----------------------------------------------------------

    if (
      selectedProduct.colors?.length > 0 &&
      !selectedColor
    ) {
      toast.error("Please select a color.");
      return;
    }


    // ----------------------------------------------------------
    // Validate Size
    // ----------------------------------------------------------

    if (
      selectedProduct.sizes?.length > 0 &&
      !selectedSize
    ) {
      toast.error("Please select a size.");
      return;
    }


    try {
      const cartInfo: IAddToCartPayload = {
        product: selectedProduct._id,
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
      };


      await addToCart(cartInfo).unwrap();


      // --------------------------------------------------------
      // Success
      // --------------------------------------------------------

      setAddedProductId(selectedProduct._id);

      toast.success("Added to cart", {
        description: `${selectedProduct.name} has been added to your cart.`,
      });


      // Close dialog
      setSelectedProduct(null);
      setSelectedColor("");
      setSelectedSize("");


      // Reset Added state
      setTimeout(() => {
        setAddedProductId(null);
      }, 2000);

    } catch (error: any) {
      console.error("Add to cart error:", error);

      toast.error(
        error?.data?.message ||
          "Failed to add product to cart.",
      );
    }
  };


  // ============================================================
  // UI
  // ============================================================

  return (
    <section className="bg-background py-16 transition-colors duration-300 sm:py-20">
      <div className="container mx-auto px-4">


        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            {/* Trending Badge */}

            <div
              className="
                mb-3
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-primary/20
                bg-primary/5
                px-3
                py-1.5
                text-sm
                font-medium
                text-primary
              "
            >
              <TrendingUp className="h-4 w-4" />

              Trending Now
            </div>


            {/* Heading */}

            <h2
              className="
                text-3xl
                font-bold
                tracking-tight
                text-foreground
                sm:text-4xl
              "
            >
              Trending T-Shirts
            </h2>


            <p
              className="
                mt-2
                max-w-xl
                text-muted-foreground
              "
            >
              Discover our most-loved T-shirts that
              everyone is talking about.
            </p>

          </div>


          {/* View All Trending */}

          <Link to="/collections?badge=Trending">
            <Button
              variant="ghost"
              className="group w-fit rounded-full"
            >
              View All Trending

              <ArrowRight
                className="
                  ml-2
                  h-4
                  w-4
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </Button>
          </Link>

        </div>


        {/* ======================================================
            LOADING
        ====================================================== */}

        {isLoading || isFetching ? (

          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-5
            "
          >

            {Array.from({
              length: TRENDING_LIMIT,
            }).map((_, index) => (

              <div
                key={index}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-border
                  bg-card
                "
              >

                <Skeleton className="aspect-square w-full" />

                <div className="space-y-3 p-4">

                  <Skeleton className="h-5 w-4/5" />

                  <Skeleton className="h-4 w-2/5" />

                  <div className="flex justify-between">

                    <Skeleton className="h-6 w-24" />

                    <Skeleton className="h-4 w-20" />

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : isError ? (

          /* ====================================================
             ERROR
          ==================================================== */

          <div
            className="
              rounded-2xl
              border
              border-destructive/20
              bg-destructive/5
              px-6
              py-12
              text-center
            "
          >

            <h3 className="text-lg font-semibold">
              Unable to load trending products
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong while loading products.
              Please try again later.
            </p>

          </div>

        ) : products.length === 0 ? (

          /* ====================================================
             EMPTY
          ==================================================== */

          <div
            className="
              rounded-2xl
              border
              border-border
              bg-card
              px-6
              py-12
              text-center
            "
          >

            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-muted
              "
            >

              <TrendingUp
                className="
                  h-5
                  w-5
                  text-muted-foreground
                "
              />

            </div>


            <h3 className="mt-4 text-lg font-semibold">
              No trending products yet
            </h3>


            <p className="mt-2 text-sm text-muted-foreground">
              Check back soon for our latest trending
              T-shirts.
            </p>

          </div>

        ) : (

          /* ====================================================
             PRODUCTS
          ==================================================== */

          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-5
            "
          >

            {products.map((product) => {

              const isAdded =
                addedProductId === product._id;


              const image =
                product.images?.main ||
                product.images?.hover ||
                "";


              return (

                <div
                  key={product._id}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-card
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >


                  {/* ==================================================
                      IMAGE
                  ================================================== */}

                  <div
                    className="
                      relative
                      aspect-square
                      overflow-hidden
                      bg-muted/30
                    "
                  >

                    {/* Product Image */}

                    <img
                      src={image}
                      alt={product.name}
                      loading="lazy"
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />


                    {/* Badge */}

                    {product.badge && (

                      <span
                        className="
                          absolute
                          left-3
                          top-3
                          rounded-full
                          bg-background/90
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          text-foreground
                          shadow-sm
                          backdrop-blur
                        "
                      >
                        {product.badge}
                      </span>

                    )}


                    {/* =================================================
                        WISHLIST
                    ================================================= */}

                    <button
                      type="button"
                      aria-label="Add to wishlist"
                      onClick={() => {
                        toast.info(
                          "Wishlist feature coming soon.",
                        );
                      }}
                      className="
                        absolute
                        right-3
                        top-3
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-border
                        bg-background/90
                        text-muted-foreground
                        shadow-sm
                        backdrop-blur
                        transition-all
                        hover:text-primary
                      "
                    >

                      <Heart className="h-4 w-4" />

                    </button>


                    {/* =================================================
                        QUICK ADD
                    ================================================= */}

                    <div
                      className="
                        absolute
                        bottom-3
                        left-3
                        right-3
                        translate-y-16
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:translate-y-0
                        group-hover:opacity-100
                      "
                    >

                      <Button
                        type="button"
                        size="sm"
                        disabled={product.stock <= 0}
                        onClick={() =>
                          handleOpenQuickAdd(product)
                        }
                        className="
                          w-full
                          rounded-xl
                          shadow-lg
                        "
                      >

                        {isAdded ? (

                          <>
                            <Check className="mr-2 h-4 w-4" />

                            Added to Cart
                          </>

                        ) : product.stock <= 0 ? (

                          "Out of Stock"

                        ) : (

                          <>
                            <ShoppingBag
                              className="
                                mr-2
                                h-4
                                w-4
                              "
                            />

                            Quick Add
                          </>

                        )}

                      </Button>

                    </div>

                  </div>


                  {/* ==================================================
                      PRODUCT INFO
                  ================================================== */}

                  <div className="p-4">

                    {/* Product Name */}

                    <h3
                      className="
                        line-clamp-1
                        font-semibold
                        text-foreground
                      "
                    >
                      {product.name}
                    </h3>


                    {/* Rating */}

                    <div
                      className="
                        mt-2
                        flex
                        items-center
                        gap-1.5
                      "
                    >

                      <div className="flex items-center">

                        <Star
                          className="
                            h-3.5
                            w-3.5
                            fill-current
                            text-primary
                          "
                        />

                        <span
                          className="
                            ml-1
                            text-sm
                            font-medium
                          "
                        >
                          {product.rating > 0
                            ? product.rating.toFixed(1)
                            : "New"}
                        </span>

                      </div>


                      {product.reviews > 0 && (

                        <span
                          className="
                            text-xs
                            text-muted-foreground
                          "
                        >
                          ({product.reviews})
                        </span>

                      )}

                    </div>


                    {/* Price */}

                    <div
                      className="
                        mt-3
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <span
                        className="
                          text-lg
                          font-bold
                          text-foreground
                        "
                      >
                        ৳{product.price.toFixed(2)}
                      </span>


                      {product.oldPrice && (

                        <span
                          className="
                            text-sm
                            text-muted-foreground
                            line-through
                          "
                        >
                          ৳{product.oldPrice.toFixed(2)}
                        </span>

                      )}

                    </div>


                    {/* Stock */}

                    <div className="mt-2">

                      {product.stock > 0 ? (

                        <span
                          className="
                            text-xs
                            text-muted-foreground
                          "
                        >
                          {product.stock} left in stock
                        </span>

                      ) : (

                        <span
                          className="
                            text-xs
                            font-medium
                            text-destructive
                          "
                        >
                          Out of stock
                        </span>

                      )}

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        )}


        {/* ======================================================
            VIEW ALL TRENDING CTA
        ====================================================== */}

        {!isLoading &&
          !isError &&
          products.length > 0 && (

            <div className="mt-10 flex justify-center">

              <Link to="/collections?badge=Trending">

                <Button
                  variant="outline"
                  className="
                    rounded-full
                    bg-background
                    px-6
                    transition-all
                    hover:bg-muted
                  "
                >

                  View All Trending Products

                  <ArrowRight className="ml-2 h-4 w-4" />

                </Button>

              </Link>

            </div>

          )}


      </div>


      {/* ========================================================
          QUICK ADD DIALOG
      ======================================================== */}

      <Dialog
        open={!!selectedProduct}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseDialog();
          }
        }}
      >

        <DialogContent
          className="
            max-w-md
            rounded-2xl
          "
        >

          {selectedProduct && (

            <>

              {/* ==================================================
                  DIALOG HEADER
              ================================================== */}

              <DialogHeader>

                <DialogTitle className="text-xl">
                  Add to Cart
                </DialogTitle>

                <DialogDescription>
                  Select your preferred size and color
                  before adding this product to your cart.
                </DialogDescription>

              </DialogHeader>


              {/* ==================================================
                  PRODUCT PREVIEW
              ================================================== */}

              <div
                className="
                  flex
                  gap-4
                  rounded-xl
                  border
                  bg-muted/30
                  p-3
                "
              >

                <img
                  src={
                    selectedProduct.images?.main ||
                    selectedProduct.images?.hover ||
                    ""
                  }
                  alt={selectedProduct.name}
                  className="
                    h-20
                    w-20
                    rounded-lg
                    object-cover
                  "
                />


                <div className="min-w-0 flex-1">

                  <h3
                    className="
                      line-clamp-2
                      text-sm
                      font-semibold
                    "
                  >
                    {selectedProduct.name}
                  </h3>


                  <div className="mt-2 flex items-center gap-2">

                    <span className="font-bold">
                      ৳{selectedProduct.price.toFixed(2)}
                    </span>


                    {selectedProduct.oldPrice && (

                      <span
                        className="
                          text-sm
                          text-muted-foreground
                          line-through
                        "
                      >
                        ৳{selectedProduct.oldPrice.toFixed(2)}
                      </span>

                    )}

                  </div>

                </div>

              </div>


              {/* ==================================================
                  COLOR
              ================================================== */}

              {selectedProduct.colors?.length > 0 && (

                <div className="space-y-3">

                  <div className="flex items-center justify-between">

                    <label className="text-sm font-semibold">
                      Color
                    </label>


                    {selectedColor && (

                      <span className="text-xs text-muted-foreground">
                        {selectedColor}
                      </span>

                    )}

                  </div>


                  <div className="flex flex-wrap gap-2">

                    {selectedProduct.colors.map(
                      (color) => {

                        const isSelected =
                          selectedColor === color;


                        return (

                          <button
                            key={color}
                            type="button"
                            onClick={() =>
                              setSelectedColor(color)
                            }
                            className={`
                              rounded-lg
                              border
                              px-4
                              py-2
                              text-sm
                              font-medium
                              transition-all

                              ${
                                isSelected
                                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                  : "border-border bg-background hover:border-primary hover:bg-primary/5"
                              }
                            `}
                          >
                            {color}
                          </button>

                        );

                      },
                    )}

                  </div>

                </div>

              )}


              {/* ==================================================
                  SIZE
              ================================================== */}

              {selectedProduct.sizes?.length > 0 && (

                <div className="space-y-3">

                  <div className="flex items-center justify-between">

                    <label className="text-sm font-semibold">
                      Size
                    </label>


                    {selectedSize && (

                      <span className="text-xs text-muted-foreground">
                        {selectedSize}
                      </span>

                    )}

                  </div>


                  <div className="flex flex-wrap gap-2">

                    {selectedProduct.sizes.map(
                      (size) => {

                        const isSelected =
                          selectedSize === size;


                        return (

                          <button
                            key={size}
                            type="button"
                            onClick={() =>
                              setSelectedSize(size)
                            }
                            className={`
                              flex
                              min-w-12
                              items-center
                              justify-center
                              rounded-lg
                              border
                              px-4
                              py-2
                              text-sm
                              font-medium
                              transition-all

                              ${
                                isSelected
                                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                  : "border-border bg-background hover:border-primary hover:bg-primary/5"
                              }
                            `}
                          >
                            {size}
                          </button>

                        );

                      },
                    )}

                  </div>

                </div>

              )}


              {/* ==================================================
                  STOCK INFO
              ================================================== */}

              <div
                className="
                  rounded-lg
                  bg-muted/50
                  px-3
                  py-2
                  text-xs
                  text-muted-foreground
                "
              >
                Only {selectedProduct.stock} items left
                in stock.
              </div>


              {/* ==================================================
                  FOOTER
              ================================================== */}

              <DialogFooter className="gap-2 sm:gap-2">

                <Button
                  type="button"
                  variant="outline"
                  disabled={isAddingToCart}
                  onClick={handleCloseDialog}
                  className="rounded-xl"
                >
                  Cancel
                </Button>


                <Button
                  type="button"
                  disabled={isAddingToCart}
                  onClick={handleAddToCart}
                  className="rounded-xl"
                >

                  {isAddingToCart ? (

                    <>
                      <Loader2
                        className="
                          mr-2
                          h-4
                          w-4
                          animate-spin
                        "
                      />

                      Adding...
                    </>

                  ) : (

                    <>
                      <ShoppingBag
                        className="
                          mr-2
                          h-4
                          w-4
                        "
                      />

                      Add to Cart
                    </>

                  )}

                </Button>

              </DialogFooter>

            </>

          )}

        </DialogContent>

      </Dialog>

    </section>
  );
};


export default TrendingProducts;