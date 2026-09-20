
import {
  ArrowLeft,
  CreditCard,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const PaymentCancel = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">

          <CreditCard className="h-10 w-10 text-yellow-600" />

        </div>

        <h1 className="mt-6 text-3xl font-bold">
          Payment Cancelled
        </h1>

        <p className="mt-3 leading-6 text-gray-500">
          Your payment was cancelled.
          Your order has not been confirmed.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">

          <Link
            to="/checkout"
            className="flex-1"
          >
            <Button className="w-full">
              Try Again
            </Button>
          </Link>

          <Link
            to="/my-cart"
            className="flex-1"
          >
            <Button
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />

              Back to Cart
            </Button>
          </Link>

        </div>

      </div>

    </div>
  );
};

export default PaymentCancel;