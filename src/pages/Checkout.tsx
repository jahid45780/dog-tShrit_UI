
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CreditCard,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



import {
  useCreateBookingMutation,
} from "@/redux/features/booking/booking.api";
import { useGetMyCartQuery } from "@/redux/features/addCard/add.card.api";

const Checkout = () => {
  const navigate = useNavigate();

  const [createBooking, { isLoading }] =
    useCreateBookingMutation();

  const {
    data: cartResponse,
    isLoading: cartLoading,
    isError: cartError,
  } = useGetMyCartQuery(undefined);

  const cart = cartResponse?.data;

  const items = cart?.items ?? [];

  // =====================================
  // CALCULATE SUBTOTAL
  // =====================================

  const subtotal = items.reduce(
    (total, item) => {
      return (
        total +
        item.product.price * item.quantity
      );
    },
    0
  );

  // =====================================
  // SHIPPING
  // =====================================

  const shipping = 0;

  // =====================================
  // TOTAL
  // =====================================

  const total = subtotal + shipping;

  // =====================================
  // CREATE BOOKING
  // =====================================

  const handlePlaceOrder = async () => {
    // -----------------------------------
    // Empty cart
    // -----------------------------------

    if (!items.length) {
      toast.error("Your cart is empty");

      navigate("/my-cart");

      return;
    }

    try {
      // ---------------------------------
      // CREATE BOOKING
      // ---------------------------------

      const response =
        await createBooking().unwrap();

      // ---------------------------------
      // GET STRIPE CHECKOUT URL
      // ---------------------------------

      const checkoutUrl =
        response?.data?.checkoutUrl;

      if (!checkoutUrl) {
        toast.error(
          "Stripe checkout URL not found"
        );

        return;
      }

      // ---------------------------------
      // SUCCESS
      // ---------------------------------

      toast.success(
        "Redirecting to secure payment..."
      );

      // ---------------------------------
      // REDIRECT STRIPE
      // ---------------------------------

      window.location.href =
        checkoutUrl;
    } catch (error: any) {
      console.error(
        "Create booking error:",
        error
      );

      toast.error(
        error?.data?.message ||
          "Unable to create booking"
      );
    }
  };

  // =====================================
  // LOADING
  // =====================================

  if (cartLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

          <p className="text-gray-500">
            Loading checkout...
          </p>
        </div>
      </div>
    );
  }

  // =====================================
  // ERROR
  // =====================================

  if (cartError) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">
            Unable to load cart
          </h2>

          <p className="mt-2 text-gray-500">
            Please try again.
          </p>

          <Link to="/my-cart">
            <Button className="mt-5">
              Back to Cart
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // =====================================
  // EMPTY CART
  // =====================================

  if (!items.length) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <Package className="mx-auto h-14 w-14 text-gray-400" />

          <h2 className="mt-5 text-2xl font-bold">
            Your cart is empty
          </h2>

          <p className="mt-2 text-gray-500">
            Add some products before checkout.
          </p>

          <Link to="/collections">
            <Button className="mt-6">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // =====================================
  // PAGE
  // =====================================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

          <Link
            to="/"
            className="text-xl font-bold tracking-tight"
          >
            Atnamira Pet Shop
          </Link>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ShieldCheck className="h-4 w-4" />

            Secure Checkout
          </div>
        </div>
      </header>

      {/* ================================= */}
      {/* MAIN */}
      {/* ================================= */}

      <main className="mx-auto max-w-7xl px-4 py-8">

        {/* Back */}
        <Link
          to="/my-cart"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />

          Back to Cart
        </Link>

        {/* Title */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Review your order and continue to secure payment.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* ================================= */}
          {/* LEFT SIDE */}
          {/* ================================= */}

          <div className="space-y-6 lg:col-span-2">

            {/* SHIPPING */}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />

                  Shipping Information
                </CardTitle>
              </CardHeader>

              <CardContent>

                <div className="rounded-xl border bg-gray-50 p-5">

                  <div className="flex gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                      <Truck className="h-5 w-5" />
                    </div>

                    <div>

                      <h3 className="font-semibold">
                        Delivery Address
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        Your shipping name, phone number,
                        and address will be taken from your
                        account profile.
                      </p>

                      <p className="mt-3 text-sm font-medium">
                        Please make sure your profile
                        information is up to date before
                        placing the order.
                      </p>

                    </div>
                  </div>

                </div>

              </CardContent>
            </Card>

            {/* PAYMENT */}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />

                  Payment Method
                </CardTitle>
              </CardHeader>

              <CardContent>

                <div className="rounded-xl border-2 border-black bg-white p-5">

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-black text-white">
                      <CreditCard className="h-5 w-5" />
                    </div>

                    <div className="flex-1">

                      <h3 className="font-semibold">
                        Credit / Debit Card
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Secure payment powered by Stripe.
                      </p>

                    </div>

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
                      <Check className="h-4 w-4" />
                    </div>

                  </div>

                </div>

                <div className="mt-4 flex gap-3 rounded-lg bg-green-50 p-4 text-sm text-green-700">

                  <ShieldCheck className="h-5 w-5 shrink-0" />

                  <p>
                    Your payment information is securely
                    processed by Stripe. We do not store
                    your card details.
                  </p>

                </div>

              </CardContent>
            </Card>

            {/* PRODUCTS */}

            <Card>
              <CardHeader>
                <CardTitle>
                  Order Items
                </CardTitle>
              </CardHeader>

              <CardContent>

                <div className="space-y-4">

                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                    >

                      {/* IMAGE */}

                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">

                        {item.product.images?.main ? (
                          <img
                            src={
                              item.product.images.main
                            }
                            alt={
                              item.product.name
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Package className="h-7 w-7 text-gray-400" />
                          </div>
                        )}

                      </div>

                      {/* INFO */}

                      <div className="min-w-0 flex-1">

                        <h3 className="font-semibold">
                          {item.product.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>

                        {item.color && (
                          <p className="text-sm text-gray-500">
                            Color: {item.color}
                          </p>
                        )}

                        {item.size && (
                          <p className="text-sm text-gray-500">
                            Size: {item.size}
                          </p>
                        )}

                      </div>

                      {/* PRICE */}

                      <div className="text-right">

                        <p className="font-semibold">
                          $
                          {(
                            item.product.price *
                            item.quantity
                          ).toFixed(2)}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          $
                          {item.product.price.toFixed(
                            2
                          )}{" "}
                          each
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

              </CardContent>
            </Card>

          </div>

          {/* ================================= */}
          {/* RIGHT SIDE */}
          {/* ================================= */}

          <div>

            <Card className="sticky top-6">

              <CardHeader>
                <CardTitle>
                  Order Summary
                </CardTitle>
              </CardHeader>

              <CardContent>

                <div className="space-y-4">

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Items
                    </span>

                    <span className="font-medium">
                      {items.length}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span className="font-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Shipping
                    </span>

                    <span className="font-medium text-green-600">
                      Free
                    </span>
                  </div>

                  <div className="border-t pt-4">

                    <div className="flex justify-between text-lg font-bold">

                      <span>
                        Total
                      </span>

                      <span>
                        ${total.toFixed(2)}
                      </span>

                    </div>

                  </div>

                  {/* BUTTON */}

                  <Button
                    className="h-12 w-full text-base"
                    size="lg"
                    disabled={isLoading}
                    onClick={handlePlaceOrder}
                  >
                    {isLoading
                      ? "Creating Order..."
                      : "Place Order & Pay"}
                  </Button>

                  <p className="text-center text-xs leading-5 text-gray-400">
                    By placing your order, you agree
                    to our terms and conditions.
                  </p>

                </div>

              </CardContent>
            </Card>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Checkout;