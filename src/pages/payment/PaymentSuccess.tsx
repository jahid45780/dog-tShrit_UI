
import {
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  const [searchParams] =
    useSearchParams();

  const sessionId =
    searchParams.get("session_id");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">

        {/* ICON */}

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

          <CheckCircle2 className="h-11 w-11 text-green-600" />

        </div>

        {/* TITLE */}

        <h1 className="mt-6 text-3xl font-bold">
          Payment Successful!
        </h1>

        <p className="mt-3 leading-6 text-gray-500">
          Thank you for your order.
          Your payment has been received successfully.
        </p>

        {/* SESSION */}

        {sessionId && (
          <div className="mt-5 rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-400">
              Payment Session
            </p>

            <p className="mt-1 break-all text-xs text-gray-500">
              {sessionId}
            </p>
          </div>
        )}

        {/* BUTTONS */}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">

          <Link
            to="/my-bookings"
            className="flex-1"
          >
            <Button className="w-full">
              <ShoppingBag className="mr-2 h-4 w-4" />

              View My Orders
            </Button>
          </Link>

          <Link
            to="/collections"
            className="flex-1"
          >
            <Button
              variant="outline"
              className="w-full"
            >
              Continue Shopping
            </Button>
          </Link>

        </div>

      </div>

    </div>
  );
};

export default PaymentSuccess;