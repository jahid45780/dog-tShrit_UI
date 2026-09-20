import { Clock3, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const PaymentPending = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
          <Clock3 className="h-10 w-10 text-yellow-600" />
        </div>

        <h1 className="mt-6 text-3xl font-bold">
          Payment Pending
        </h1>

        <p className="mt-3 leading-6 text-gray-500">
          Your payment is currently being processed.
          Please wait while we confirm your payment.
        </p>

        <p className="mt-3 text-sm text-gray-400">
          You can check your order status from your
          bookings page.
        </p>

        <div className="mt-7 flex justify-center">
          <Link to="/my-bookings">
            <Button>
              <ShoppingBag className="mr-2 h-4 w-4" />
              View My Orders
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentPending;