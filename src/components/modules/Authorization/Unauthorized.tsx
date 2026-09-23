import {
  ArrowLeft,
  Home,
  LockKeyhole,
  PawPrint,
  ShieldAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />

        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute left-[10%] top-[18%] opacity-[0.035]">
          <PawPrint className="h-36 w-36 rotate-[-20deg]" />
        </div>

        <div className="absolute bottom-[12%] right-[10%] opacity-[0.035]">
          <PawPrint className="h-44 w-44 rotate-[20deg]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">

        {/* Lock Icon */}
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 shadow-sm">
          <LockKeyhole className="h-10 w-10 text-red-500" />
        </div>

        {/* 403 */}
        <div className="relative">
          <h1 className="select-none text-[110px] font-black leading-none tracking-tighter text-red-500/10 sm:text-[160px]">
            403
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-black tracking-tight sm:text-8xl">
              403
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <ShieldAlert className="h-5 w-5 text-red-500" />

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Access Denied
          </h2>
        </div>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
          You don't have permission to access this page.
          Please make sure you're logged in with an account
          that has the required access.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* Security Message */}
        <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-xl border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
          <ShieldAlert className="h-4 w-4 shrink-0 text-red-500" />

          <span>
            This area is restricted to authorized users.
          </span>
        </div>

        {/* Brand */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <PawPrint className="h-4 w-4 text-primary" />

          <span>
            <span className="font-semibold text-foreground">
              AtNamira
            </span>{" "}
            Pet Shop
          </span>
        </div>
      </div>
    </main>
  );
};

export default Unauthorized;