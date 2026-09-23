
import {
  ArrowLeft,
  Home,
  PawPrint,
  SearchX,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="absolute left-[15%] top-[20%] opacity-[0.04]">
          <PawPrint className="h-32 w-32 rotate-[-20deg]" />
        </div>

        <div className="absolute bottom-[15%] right-[12%] opacity-[0.04]">
          <PawPrint className="h-40 w-40 rotate-[20deg]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">

        {/* Icon */}
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 shadow-sm">
          <SearchX className="h-10 w-10 text-primary" />
        </div>

        {/* 404 */}
        <div className="relative">
          <h1 className="select-none text-[110px] font-black leading-none tracking-tighter text-primary/10 sm:text-[160px]">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-black tracking-tight sm:text-8xl">
              404
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Oops! This page wandered off 🐾
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
          We couldn't find the page you're looking for.
          It may have been moved, deleted, or maybe our little
          furry friend took it for a walk.
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

        {/* Brand */}
        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
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

export default NotFound;