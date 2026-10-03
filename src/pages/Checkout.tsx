
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Loader2,
  MapPin,
  Package,
  Pencil,
  Save,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  useCreateBookingMutation,
} from "@/redux/features/booking/booking.api";

import {
  useGetMyCartQuery,
} from "@/redux/features/addCard/add.card.api";

import {
  useUpdateProfileMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";

// =========================================================
// TYPES
// =========================================================

interface IGuestInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface ICheckoutPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// =========================================================
// CHECKOUT
// =========================================================

const Checkout = () => {
  const navigate = useNavigate();

  // =======================================================
  // USER INFO
  // =======================================================

  const {
    data: userResponse,
    isLoading: userLoading,
  } = useUserInfoQuery(undefined);

  const user = userResponse?.data;

  const isLoggedIn = Boolean(user?._id);

  // =======================================================
  // BACKEND CART
  // =======================================================
  //
  // IMPORTANT:
  // Guest + Logged-in both use backend cart.
  //
  // Guest:
  // guestCartId cookie -> backend cart
  //
  // Logged-in:
  // access token/cookie -> user cart
  //
  // =======================================================

  const {
    data: cartResponse,
    isLoading: cartLoading,
    isError: cartError,
    refetch: refetchCart,
  } = useGetMyCartQuery(undefined, {
    skip: userLoading,
  });

  const items = cartResponse?.data?.items ?? [];

  // =======================================================
  // BOOKING
  // =======================================================

  const [createBooking, { isLoading: isBooking }] =
    useCreateBookingMutation();

  // =======================================================
  // PROFILE STATE - LOGGED IN USER
  // =======================================================

  const [isEditingProfile, setIsEditingProfile] =
    useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // =======================================================
  // GUEST STATE
  // =======================================================

  const [guestData, setGuestData] = useState<IGuestInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // =======================================================
  // LOAD USER PROFILE
  // =======================================================

  useEffect(() => {
    if (!user) return;

    setProfileData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    });
  }, [user]);

  // =======================================================
  // UPDATE PROFILE
  // =======================================================

  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateProfileMutation();

  const isProfileComplete = Boolean(
    profileData.name.trim() &&
      profileData.phone.trim() &&
      profileData.address.trim()
  );

  const isGuestInfoComplete = Boolean(
    guestData.name.trim() &&
      guestData.email.trim() &&
      guestData.phone.trim() &&
      guestData.address.trim()
  );

  // =======================================================
  // PROFILE INPUT CHANGE
  // =======================================================

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =======================================================
  // GUEST INPUT CHANGE
  // =======================================================

  const handleGuestChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setGuestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =======================================================
  // UPDATE LOGGED-IN PROFILE
  // =======================================================

  const handleUpdateProfile = async () => {
    if (!user?._id) {
      toast.error("User information not found");
      return;
    }

    if (!profileData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!profileData.phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!profileData.address.trim()) {
      toast.error("Please enter your delivery address");
      return;
    }

    try {
      await updateProfile({
        userId: user._id,
        data: {
          name: profileData.name.trim(),
          phone: profileData.phone.trim(),
          address: profileData.address.trim(),
        },
      }).unwrap();

      toast.success(
        "Shipping information updated successfully"
      );

      setIsEditingProfile(false);
    } catch (error: any) {
      console.error(
        "Update profile error:",
        error
      );

      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to update profile"
      );
    }
  };

  // =======================================================
  // PRICE SUMMARY
  // =======================================================

  const subtotal = items.reduce((total, item) => {
    const price = Number(
      item.product?.price || 0
    );

    const quantity = Number(
      item.quantity || 0
    );

    return total + price * quantity;
  }, 0);

  const shipping = 0;

  const total = subtotal + shipping;

  // =======================================================
  // PLACE ORDER
  // =======================================================

  const handlePlaceOrder = async () => {
    // -------------------------------------------------------
    // CART CHECK
    // -------------------------------------------------------

    if (!items.length) {
      toast.error("Your cart is empty");

      navigate("/user/my-card");

      return;
    }

    // -------------------------------------------------------
    // LOGGED-IN USER VALIDATION
    // -------------------------------------------------------

    if (isLoggedIn && !isProfileComplete) {
      toast.error(
        "Please complete your shipping information first."
      );

      setIsEditingProfile(true);

      return;
    }

    // -------------------------------------------------------
    // GUEST VALIDATION
    // -------------------------------------------------------

    if (!isLoggedIn && !isGuestInfoComplete) {
      toast.error(
        "Please complete your guest information"
      );

      return;
    }

    // -------------------------------------------------------
    // CUSTOMER DATA
    // -------------------------------------------------------

    const customerData: ICheckoutPayload =
      isLoggedIn
        ? {
            name: profileData.name.trim(),
            email: profileData.email.trim(),
            phone: profileData.phone.trim(),
            address: profileData.address.trim(),
          }
        : {
            name: guestData.name.trim(),
            email: guestData.email.trim(),
            phone: guestData.phone.trim(),
            address: guestData.address.trim(),
          };

    // -------------------------------------------------------
    // BACKEND PAYLOAD
    // -------------------------------------------------------
    //
    // Backend expects:
    //
    // {
    //   name,
    //   email,
    //   phone,
    //   address
    // }
    //
    // DO NOT send:
    //
    // {
    //   customer: {...}
    // }
    //
    // or
    //
    // {
    //   guestInfo: {...}
    // }
    //
    // -------------------------------------------------------

    const bookingPayload: ICheckoutPayload = {
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      address: customerData.address,
    };

    try {
      console.log(
        "========== CHECKOUT DEBUG =========="
      );

      console.log(
        "Logged In:",
        isLoggedIn
      );

      console.log(
        "Cart Items:",
        items
      );

      console.log(
        "Checkout Payload:",
        bookingPayload
      );

      console.log(
        "===================================="
      );

      // -----------------------------------------------------
      // CREATE BOOKING
      // -----------------------------------------------------

      const response = await createBooking(
        bookingPayload
      ).unwrap();

      console.log(
        "Create booking response:",
        response
      );

      // -----------------------------------------------------
      // STRIPE CHECKOUT URL
      // -----------------------------------------------------

      const checkoutUrl =
        response?.data?.checkoutUrl ??
        response?.checkoutUrl;

      if (
        typeof checkoutUrl !== "string" ||
        !checkoutUrl.startsWith("https://")
      ) {
        console.error(
          "Unexpected checkout response:",
          response
        );

        toast.error(
          "Stripe checkout URL not found"
        );

        return;
      }

      // -----------------------------------------------------
      // REDIRECT STRIPE
      // -----------------------------------------------------

      toast.success(
        "Redirecting to secure payment..."
      );

      window.location.assign(checkoutUrl);
    } catch (error: any) {
      console.error(
        "Create booking error:",
        error
      );

      const message =
        error?.data?.message ||
        error?.data?.errorSources?.[0]?.message ||
        error?.message ||
        "Failed to create booking";

      toast.error(message);
    }
  };

  // =======================================================
  // LOADING USER
  // =======================================================

  if (userLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin" />

          <p className="text-gray-500">
            Loading checkout...
          </p>
        </div>
      </div>
    );
  }

  // =======================================================
  // LOADING CART
  // =======================================================

  if (cartLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin" />

          <p className="text-gray-500">
            Loading your cart...
          </p>
        </div>
      </div>
    );
  }

  // =======================================================
  // CART ERROR
  // =======================================================

  if (cartError) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <Package className="mx-auto h-14 w-14 text-red-400" />

          <h2 className="mt-5 text-xl font-semibold">
            Unable to load cart
          </h2>

          <p className="mt-2 text-gray-500">
            We couldn't load your cart. Please try again.
          </p>

          <div className="mt-5 flex justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => refetchCart()}
            >
              Try Again
            </Button>

            <Link to="/user/my-card">
              <Button>
                Back to Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =======================================================
  // EMPTY CART
  // =======================================================

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

  // =======================================================
  // PAGE
  // =======================================================

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* BACK TO CART */}

        <Link
          to="/user/my-card"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />

          Back to Cart
        </Link>

        {/* TITLE */}

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              Checkout
            </h1>

            {!isLoggedIn && (
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                Guest Checkout
              </span>
            )}

            {isLoggedIn && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Account Checkout
              </span>
            )}
          </div>

          <p className="mt-2 text-gray-500">
            Review your order and continue to secure payment.
          </p>
        </div>

        {/* =================================================
            GRID
        ================================================= */}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-6 lg:col-span-2">
            {/* =================================================
                SHIPPING INFORMATION
            ================================================= */}

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />

                    Shipping Information
                  </CardTitle>

                  {isLoggedIn &&
                    isProfileComplete &&
                    !isEditingProfile && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setIsEditingProfile(true)
                        }
                      >
                        <Pencil className="mr-2 h-4 w-4" />

                        Edit
                      </Button>
                    )}
                </div>
              </CardHeader>

              <CardContent>
                {/* =================================================
                    GUEST
                ================================================= */}

                {!isLoggedIn ? (
                  <div className="space-y-5">
                    <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                      <p className="text-sm font-semibold text-orange-800">
                        Guest Checkout
                      </p>

                      <p className="mt-1 text-sm leading-6 text-orange-700">
                        You don't need an account to place your
                        order. Enter your delivery information below
                        and continue to secure payment.
                      </p>
                    </div>

                    {/* NAME */}

                    <div className="space-y-2">
                      <Label htmlFor="guest-name">
                        Full Name
                      </Label>

                      <Input
                        id="guest-name"
                        name="name"
                        value={guestData.name}
                        onChange={handleGuestChange}
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* EMAIL */}

                    <div className="space-y-2">
                      <Label htmlFor="guest-email">
                        Email Address
                      </Label>

                      <Input
                        id="guest-email"
                        name="email"
                        type="email"
                        value={guestData.email}
                        onChange={handleGuestChange}
                        placeholder="you@example.com"
                      />

                      <p className="text-xs text-gray-400">
                        Your order and payment confirmation will be
                        associated with this email.
                      </p>
                    </div>

                    {/* PHONE */}

                    <div className="space-y-2">
                      <Label htmlFor="guest-phone">
                        Phone Number
                      </Label>

                      <Input
                        id="guest-phone"
                        name="phone"
                        type="tel"
                        value={guestData.phone}
                        onChange={handleGuestChange}
                        placeholder="01XXXXXXXXX"
                      />
                    </div>

                    {/* ADDRESS */}

                    <div className="space-y-2">
                      <Label htmlFor="guest-address">
                        Delivery Address
                      </Label>

                      <Input
                        id="guest-address"
                        name="address"
                        value={guestData.address}
                        onChange={handleGuestChange}
                        placeholder="Enter your complete delivery address"
                      />
                    </div>
                  </div>
                ) : /* =================================================
                     LOGGED IN EDIT PROFILE
                   ================================================= */

                isEditingProfile ||
                  !isProfileComplete ? (
                  <div className="space-y-5">
                    {!isProfileComplete && (
                      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                        <p className="text-sm font-semibold text-amber-800">
                          Complete your shipping information
                        </p>

                        <p className="mt-1 text-sm leading-6 text-amber-700">
                          Please provide your name, phone number and
                          delivery address before placing your order.
                        </p>
                      </div>
                    )}

                    {/* NAME */}

                    <div className="space-y-2">
                      <Label htmlFor="checkout-name">
                        Full Name
                      </Label>

                      <Input
                        id="checkout-name"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* EMAIL */}

                    <div className="space-y-2">
                      <Label htmlFor="checkout-email">
                        Email Address
                      </Label>

                      <Input
                        id="checkout-email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>

                    {/* PHONE */}

                    <div className="space-y-2">
                      <Label htmlFor="checkout-phone">
                        Phone Number
                      </Label>

                      <Input
                        id="checkout-phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        placeholder="01XXXXXXXXX"
                        type="tel"
                      />
                    </div>

                    {/* ADDRESS */}

                    <div className="space-y-2">
                      <Label htmlFor="checkout-address">
                        Delivery Address
                      </Label>

                      <Input
                        id="checkout-address"
                        name="address"
                        value={profileData.address}
                        onChange={handleProfileChange}
                        placeholder="Enter your delivery address"
                      />
                    </div>

                    {/* BUTTONS */}

                    <div className="flex justify-end gap-3">
                      {isProfileComplete && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditingProfile(false);

                            setProfileData({
                              name: user?.name || "",
                              email: user?.email || "",
                              phone: user?.phone || "",
                              address: user?.address || "",
                            });
                          }}
                          disabled={isUpdating}
                        >
                          Cancel
                        </Button>
                      )}

                      <Button
                        onClick={handleUpdateProfile}
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />

                            Save Information
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* =================================================
                     LOGGED IN PROFILE DISPLAY
                  ================================================= */

                  <div className="rounded-xl border bg-gray-50 p-5">
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                        <Truck className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold">
                          Delivery Address
                        </h3>

                        <div className="mt-3 space-y-1.5 text-sm text-gray-600">
                          <p>
                            <span className="font-medium text-gray-900">
                              Name:
                            </span>{" "}
                            {profileData.name}
                          </p>

                          <p>
                            <span className="font-medium text-gray-900">
                              Email:
                            </span>{" "}
                            {profileData.email}
                          </p>

                          <p>
                            <span className="font-medium text-gray-900">
                              Phone:
                            </span>{" "}
                            {profileData.phone}
                          </p>

                          <p>
                            <span className="font-medium text-gray-900">
                              Address:
                            </span>{" "}
                            {profileData.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* =================================================
                PAYMENT METHOD
            ================================================= */}

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
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-black text-white">
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

                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-white">
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-3 rounded-lg bg-green-50 p-4 text-sm text-green-700">
                  <ShieldCheck className="h-5 w-5 shrink-0" />

                  <p>
                    Your payment information is securely processed
                    by Stripe. We do not store your card details.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* =================================================
                ORDER ITEMS
            ================================================= */}

            <Card>
              <CardHeader>
                <CardTitle>
                  Order Items
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => {
                    const product = item.product;

                    const price = Number(
                      product?.price || 0
                    );

                    const quantity = Number(
                      item.quantity || 0
                    );

                    const itemTotal =
                      price * quantity;

                    return (
                      <div
                        key={item._id}
                        className="flex gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                      >
                        {/* IMAGE */}

                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          {product?.images?.main ? (
                            <img
                              src={product.images.main}
                              alt={
                                product.name ||
                                "Product"
                              }
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Package className="h-7 w-7 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* PRODUCT INFO */}

                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 font-semibold">
                            {product?.name ||
                              "Product unavailable"}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            Quantity: {quantity}
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

                        <div className="shrink-0 text-right">
                          <p className="font-semibold">
                            ${itemTotal.toFixed(2)}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            ${price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>
                  Order Summary
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* ITEMS */}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Items
                    </span>

                    <span className="font-medium">
                      {items.length}
                    </span>
                  </div>

                  {/* TOTAL QUANTITY */}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Quantity
                    </span>

                    <span className="font-medium">
                      {items.reduce(
                        (sum, item) =>
                          sum +
                          Number(
                            item.quantity || 0
                          ),
                        0
                      )}
                    </span>
                  </div>

                  {/* SUBTOTAL */}

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span className="font-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* SHIPPING */}

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Shipping
                    </span>

                    <span className="font-medium text-green-600">
                      Free
                    </span>
                  </div>

                  {/* TOTAL */}

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

                  {/* PLACE ORDER */}

                  <Button
                    className="h-12 w-full text-base"
                    size="lg"
                    disabled={
                      isBooking ||
                      isUpdating ||
                      (isLoggedIn
                        ? !isProfileComplete
                        : !isGuestInfoComplete)
                    }
                    onClick={handlePlaceOrder}
                  >
                    {isBooking ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                        Creating Order...
                      </>
                    ) : isLoggedIn &&
                      !isProfileComplete ? (
                      "Complete Shipping Information"
                    ) : !isLoggedIn &&
                      !isGuestInfoComplete ? (
                      "Complete Guest Information"
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />

                        Place Order & Pay
                      </>
                    )}
                  </Button>

                  {/* GUEST INFO */}

                  {!isLoggedIn && (
                    <div className="rounded-xl bg-orange-50 p-4">
                      <p className="text-center text-xs font-semibold text-orange-700">
                        Guest Checkout Enabled
                      </p>

                      <p className="mt-1 text-center text-xs leading-5 text-orange-600">
                        No account is required. Your cart is saved
                        securely and you can continue directly to
                        Stripe payment.
                      </p>
                    </div>
                  )}

                  {/* LOGGED IN INFO */}

                  {isLoggedIn && (
                    <div className="rounded-xl bg-green-50 p-4">
                      <p className="text-center text-xs font-semibold text-green-700">
                        You're signed in
                      </p>

                      <p className="mt-1 text-center text-xs leading-5 text-green-600">
                        Your order will be associated with your
                        account.
                      </p>
                    </div>
                  )}

                  {/* TERMS */}

                  <p className="text-center text-xs leading-5 text-gray-400">
                    By placing your order, you agree to our terms
                    and conditions.
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
