import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useClearCartMutation, useGetMyCartQuery, useRemoveCartItemMutation, useUpdateCartItemMutation } from "@/redux/features/addCard/add.card.api";



const MyCart = () => {
  const {
    data,
    isLoading,
    isError,
  } = useGetMyCartQuery(undefined);

  const [
    updateCartItem,
    { isLoading: isUpdating },
  ] = useUpdateCartItemMutation();

  const [
    removeCartItem,
    { isLoading: isRemoving },
  ] = useRemoveCartItemMutation();

  const [
    clearCart,
    { isLoading: isClearing },
  ] = useClearCartMutation();

  const cart = data?.data;

  const items = cart?.items ?? [];

  // =========================
  // TOTAL CALCULATION
  // =========================

  const subtotal = items.reduce(
    (total, item) => {
      return (
        total +
        Number(item.product?.price || 0) *
          item.quantity
      );
    },
    0
  );

  const shipping = subtotal > 0 ? 5 : 0;

  const total = subtotal + shipping;

  // =========================
  // INCREASE
  // =========================

  const handleIncrease = async (
    item: (typeof items)[number]
  ) => {
    if (
      item.quantity >= item.product.stock
    ) {
      toast.error(
        `Only ${item.product.stock} items available in stock`
      );

      return;
    }

    try {
      await updateCartItem({
        itemId: item._id,
        quantity: item.quantity + 1,
      }).unwrap();

      toast.success("Quantity updated");
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Unable to update quantity"
      );
    }
  };

  // =========================
  // DECREASE
  // =========================

  const handleDecrease = async (
    item: (typeof items)[number]
  ) => {
    if (item.quantity <= 1) {
      return;
    }

    try {
      await updateCartItem({
        itemId: item._id,
        quantity: item.quantity - 1,
      }).unwrap();

      toast.success("Quantity updated");
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Unable to update quantity"
      );
    }
  };

  // =========================
  // REMOVE
  // =========================

  const handleRemove = async (
    itemId: string
  ) => {
    try {
      await removeCartItem(itemId).unwrap();

      toast.success("Item removed from cart");
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Unable to remove item"
      );
    }
  };

  // =========================
  // CLEAR CART
  // =========================

  const handleClearCart = async () => {
    if (items.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to clear your entire cart?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await clearCart().unwrap();

      toast.success("Your cart has been cleared");
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Unable to clear cart"
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafaf9]">
        <AtnamiraHeader />

        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="mb-8 h-8 w-40 rounded-lg bg-gray-200" />

            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-40 rounded-2xl bg-gray-200"
                  />
                ))}
              </div>

              <div className="h-[400px] rounded-2xl bg-gray-200" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (isError) {
    return (
      <div className="min-h-screen bg-[#fafaf9]">
        <AtnamiraHeader />

        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
              <ShoppingBag className="h-9 w-9 text-red-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              We couldn't load your shopping cart.
              Please try again.
            </p>

            <Button
       
              className="mt-6 rounded-xl"
            >
              <Link to="/collections">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* ================= HEADER ================= */}

      <AtnamiraHeader />

      {/* ================= BREADCRUMB ================= */}

      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-gray-500 transition hover:text-orange-600"
            >
              Home
            </Link>

            <ChevronRight className="h-4 w-4 text-gray-400" />

            <span className="font-medium text-gray-900">
              My Cart
            </span>
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* PAGE TITLE */}

        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600">
              <ShoppingBag className="h-3.5 w-3.5" />
              Atnamira Pet Shop
            </div>

            <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Your Cart
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {items.length === 0
                ? "Your cart is waiting for some pet goodies."
                : `${items.length} ${
                    items.length === 1
                      ? "product"
                      : "products"
                  } ready for checkout`}
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={handleClearCart}
              disabled={isClearing}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
            >
              <Trash2 className="h-4 w-4" />

              {isClearing
                ? "Clearing..."
                : "Clear Cart"}
            </button>
          )}
        </div>

        {/* ================= EMPTY CART ================= */}

        {items.length === 0 ? (
          <Card className="overflow-hidden rounded-3xl border-0 bg-white shadow-sm">
            <CardContent className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="relative mb-7">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-50">
                  <ShoppingBag className="h-12 w-12 text-orange-500" />
                </div>

                <div className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
                  🐾
                </div>
              </div>

              <h2 className="text-2xl font-black text-gray-950">
                Your cart is empty
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                Your furry friend deserves something
                special. Explore our collection and
                find their next favorite product.
              </p>

              <Button
   
                className="mt-7 h-12 rounded-xl bg-gray-950 px-7 hover:bg-orange-600"
              >
                <Link to="/collections">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Explore Products
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">
            {/* ================= ITEMS ================= */}

            <div className="space-y-4">
              {items.map((item) => {
                const product = item.product;

                const image =
                  product.images?.main ||
                  product.images?.hover ||
                  "/placeholder-product.jpg";

                const price =
                  Number(product.price || 0);

                const itemTotal =
                  price * item.quantity;

                return (
                  <Card
                    key={item._id}
                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:shadow-md"
                  >
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex gap-4 sm:gap-5">
                        {/* IMAGE */}

                        <Link
                          to={`/collections/${product.slug}`}
                          className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-36 sm:w-36"
                        >
                          <img
                            src={image}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                          {product.badge && (
                            <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-gray-800 shadow-sm">
                              {product.badge}
                            </span>
                          )}
                        </Link>

                        {/* CONTENT */}

                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-3">
                            <div className="min-w-0">
                              {product.category && (
                                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-orange-600">
                                  {product.category}
                                </p>
                              )}

                              <Link
                                to={`/collections/${product.slug}`}
                                className="line-clamp-2 text-base font-bold text-gray-950 transition hover:text-orange-600 sm:text-lg"
                              >
                                {product.name}
                              </Link>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                handleRemove(
                                  item._id
                                )
                              }
                              disabled={isRemoving}
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                              title="Remove"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          {/* VARIANTS */}

                          {(item.color ||
                            item.size) && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {item.color && (
                                <span className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs text-gray-600">
                                  Color:{" "}
                                  <strong className="text-gray-900">
                                    {item.color}
                                  </strong>
                                </span>
                              )}

                              {item.size && (
                                <span className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs text-gray-600">
                                  Size:{" "}
                                  <strong className="text-gray-900">
                                    {item.size}
                                  </strong>
                                </span>
                              )}
                            </div>
                          )}

                          {/* BOTTOM */}

                          <div className="mt-4 flex items-center justify-between gap-3">
                            {/* QUANTITY */}

                            <div className="flex items-center rounded-xl border border-gray-200 bg-white">
                              <button
                                type="button"
                                onClick={() =>
                                  handleDecrease(
                                    item
                                  )
                                }
                                disabled={
                                  item.quantity <=
                                    1 ||
                                  isUpdating
                                }
                                className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>

                              <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-200 text-sm font-bold text-gray-900">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  handleIncrease(
                                    item
                                  )
                                }
                                disabled={
                                  isUpdating ||
                                  item.quantity >=
                                    product.stock
                                }
                                className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            {/* PRICE */}

                            <div className="text-right">
                              <p className="text-lg font-black text-gray-950">
                                $
                                {itemTotal.toFixed(
                                  2
                                )}
                              </p>

                              <p className="text-[11px] text-gray-400">
                                $
                                {price.toFixed(2)}
                                {" "}each
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* CONTINUE SHOPPING */}

              <Link
                to="/collections"
                className="inline-flex items-center gap-2 pt-2 text-sm font-bold text-gray-700 transition hover:text-orange-600"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>

            {/* ================= SUMMARY ================= */}

            <aside className="lg:sticky lg:top-24">
              <Card className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-gray-950">
                      Order Summary
                    </h2>

                    <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-600">
                      {items.length}{" "}
                      {items.length === 1
                        ? "item"
                        : "items"}
                    </span>
                  </div>

                  {/* PRICES */}

                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Subtotal
                      </span>

                      <span className="font-bold text-gray-900">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Shipping
                      </span>

                      <span className="font-bold text-gray-900">
                        {shipping === 0
                          ? "Free"
                          : `$${shipping.toFixed(
                              2
                            )}`}
                      </span>
                    </div>

                    <div className="border-t border-dashed pt-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="font-bold text-gray-950">
                            Total
                          </p>

                          <p className="mt-1 text-[11px] text-gray-400">
                            Including shipping
                          </p>
                        </div>

                        <p className="text-2xl font-black text-orange-600">
                          ${total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CHECKOUT */}

                <Button
  className="mt-6 h-13 w-full rounded-xl bg-gray-950 text-white hover:bg-orange-600"
>
  <Link to="/checkout">
    Proceed to Checkout
    <ChevronRight className="ml-2 h-4 w-4" />
  </Link>
</Button>

                  {/* TRUST */}

                  <div className="mt-6 space-y-4 border-t pt-6">
                    <TrustItem
                      icon={
                        <Truck className="h-4 w-4" />
                      }
                      title="Fast Delivery"
                      text="Safe delivery to your doorstep"
                    />

                    <TrustItem
                      icon={
                        <ShieldCheck className="h-4 w-4" />
                      }
                      title="Secure Checkout"
                      text="Your payment information is protected"
                    />

                    <TrustItem
                      icon={
                        <Heart className="h-4 w-4" />
                      }
                      title="Made For Pets"
                      text="Products selected with your pets in mind"
                    />
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        )}
      </main>

      {/* ================= BOTTOM TRUST ================= */}

      <section className="border-t bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          <TrustItem
            icon={
              <Truck className="h-5 w-5" />
            }
            title="Reliable Delivery"
            text="Your pet essentials delivered safely."
          />

          <TrustItem
            icon={
              <ShieldCheck className="h-5 w-5" />
            }
            title="Secure Shopping"
            text="Safe and secure shopping experience."
          />

          <TrustItem
            icon={
              <Package className="h-5 w-5" />
            }
            title="Quality Products"
            text="Carefully selected products for pets."
          />
        </div>
      </section>
    </div>
  );
};

// ========================================
// ATNAMIRA HEADER
// ========================================

const AtnamiraHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}

        <Link
          to="/"
          className="group flex items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-lg shadow-sm transition group-hover:scale-105">
            🐾
          </div>

          <div>
            <p className="text-lg font-black tracking-tight text-gray-950">
              Atnamira
            </p>

            <p className="-mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-orange-500">
              Pet Shop
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-semibold text-gray-600 transition hover:text-orange-600"
          >
            Home
          </Link>

          <Link
            to="/collections"
            className="text-sm font-semibold text-gray-600 transition hover:text-orange-600"
          >
            Shop
          </Link>

          <Link
            to="/collections"
            className="text-sm font-semibold text-gray-600 transition hover:text-orange-600"
          >
            Collections
          </Link>

          <Link
            to="/about"
            className="text-sm font-semibold text-gray-600 transition hover:text-orange-600"
          >
            About
          </Link>
        </nav>

        {/* CART */}

        <Link
          to="/user/my-card"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
        >
          <ShoppingBag className="h-5 w-5" />

          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-black text-white">
            🛒
          </span>
        </Link>
      </div>
    </header>
  );
};

// ========================================
// TRUST ITEM
// ========================================

const TrustItem = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
        {icon}
      </div>

      <div>
        <p className="text-sm font-bold text-gray-950">
          {title}
        </p>

        <p className="text-xs text-gray-500">
          {text}
        </p>
      </div>
    </div>
  );
};

export default MyCart;