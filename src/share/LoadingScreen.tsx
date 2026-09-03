import { Card } from "@/components/ui/card";
import { PawPrint, Shirt, ShoppingBag } from "lucide-react";

const LoadingScreen = () => {
  return (
    <main className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-background">
      <Card className="border-0 bg-transparent shadow-none">
        <div className="flex flex-col items-center">
          {/* Animated Product Area */}
          <div className="relative flex h-32 w-32 items-center justify-center">
            {/* Outer pulse */}
            <div className="absolute inset-2 animate-ping rounded-full bg-primary/10" />

            {/* Rotating ring */}
            <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full border border-dashed border-primary/20" />

            {/* Floating Paw */}
            <PawPrint
              className="absolute -left-1 top-3 h-7 w-7 animate-bounce text-primary/50"
              strokeWidth={1.5}
            />

            {/* Floating Shopping Bag */}
            <ShoppingBag
              className="absolute -right-1 bottom-3 h-6 w-6 animate-bounce text-primary/40 [animation-delay:300ms]"
              strokeWidth={1.5}
            />

            {/* Product Container */}
            <div className="relative flex h-20 w-20 animate-[float_3s_ease-in-out_infinite] items-center justify-center rounded-2xl bg-primary/10 shadow-lg shadow-primary/10">
              <Shirt
                className="h-11 w-11 animate-pulse text-primary"
                strokeWidth={1.7}
              />

              {/* Small Paw Badge */}
              <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                <PawPrint className="h-4 w-4" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Brand */}
          <h1 className="mt-3 text-2xl font-bold tracking-wide">
            Atnamira
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Dressing every paw with love 🐾
          </p>

          {/* Loading text */}
          <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Finding the perfect dog T-shirt</span>

            <span className="flex gap-1">
              <span className="animate-bounce [animation-delay:-0.3s]">
                .
              </span>
              <span className="animate-bounce [animation-delay:-0.15s]">
                .
              </span>
              <span className="animate-bounce">.</span>
            </span>
          </div>

          {/* Progress Line */}
          <div className="mt-5 h-1.5 w-44 overflow-hidden rounded-full bg-primary/10">
            <div className="h-full w-1/2 animate-[loading_1.8s_ease-in-out_infinite] rounded-full bg-primary" />
          </div>
        </div>
      </Card>
    </main>
  );
};

export default LoadingScreen;