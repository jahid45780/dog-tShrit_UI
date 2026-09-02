import {
  ArrowRight,
  PawPrint,
  ShoppingBag,
  Star,
  Heart,
  Truck,
  Shirt,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-40 top-[-100px] h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-200px] left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ================= LEFT ================= */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <div
              className="
                mb-6 inline-flex items-center gap-2
                rounded-full border border-primary/20
                bg-primary/5 px-4 py-2
                text-sm font-medium text-primary
              "
            >
              <PawPrint className="h-4 w-4" />
              <span>Wear Your Love for Dogs</span>
            </div>

            {/* Heading */}
            <h1
              className="
                text-4xl font-extrabold
                leading-[1.05] tracking-tight
                text-foreground
                sm:text-5xl
                md:text-6xl
                lg:text-6xl
                xl:text-7xl
              "
            >
              Wear Your Love
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-primary
                  via-primary/80
                  to-primary/50
                  bg-clip-text
                  text-transparent
                "
              >
                For Dogs
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                mx-auto mt-6 max-w-xl
                text-base leading-7
                text-muted-foreground
                sm:text-lg
                lg:mx-0
              "
            >
              Discover premium dog-themed T-shirts made for true dog lovers.
              Unique designs, comfortable fabric, and effortless style for
              every day.
            </p>

            {/* CTA */}
            <div
              className="
                mt-8 flex flex-col
                items-center gap-3
                sm:flex-row
                lg:justify-start
              "
            >
              <Button
                size="lg"
                className="
                  group h-12 rounded-full px-7
                  shadow-lg shadow-primary/20
                  transition-all hover:-translate-y-0.5
                "
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop T-Shirts
                <ArrowRight
                  className="
                    ml-2 h-4 w-4
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="
                  h-12 rounded-full px-7
                  bg-background/60
                  backdrop-blur-sm
                "
              >
                Explore Designs
              </Button>
            </div>

            {/* Trust / Features */}
            <div
              className="
                mt-10 flex flex-wrap
                items-center justify-center
                gap-x-6 gap-y-5
                text-sm text-muted-foreground
                lg:justify-start
              "
            >
              {/* Premium */}
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Shirt className="h-4 w-4 text-primary" />
                </div>

                <div>
                  <p className="font-semibold text-foreground">
                    Premium
                  </p>
                  <p className="text-xs">Quality Fabric</p>
                </div>
              </div>

              <div className="hidden h-8 w-px bg-border sm:block" />

              {/* Shipping */}
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-4 w-4 text-primary" />
                </div>

                <div>
                  <p className="font-semibold text-foreground">
                    Fast
                  </p>
                  <p className="text-xs">Free Shipping</p>
                </div>
              </div>

              <div className="hidden h-8 w-px bg-border sm:block" />

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-4 w-4 fill-current text-primary" />
                </div>

                <div>
                  <p className="font-semibold text-foreground">
                    4.9/5
                  </p>
                  <p className="text-xs">Customer Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative flex items-center justify-center">

            {/* Glow */}
            <div
              className="
                absolute h-[320px] w-[320px]
                rounded-full bg-primary/10
                blur-3xl
                sm:h-[450px] sm:w-[450px]
              "
            />

            {/* Product Card */}
            <div
              className="
                relative z-10
                w-full max-w-[560px]
                overflow-hidden
                rounded-[2rem]
                border border-border/60
                bg-card/60
                p-3
                shadow-2xl
                backdrop-blur-sm
                transition-all duration-500
                hover:-translate-y-2
              "
            >
              <div
                className="
                  relative overflow-hidden
                  rounded-[1.5rem]
                  bg-muted/30
                "
              >
                <img
                  src="/pet-hero.png"
                  alt="PawMark premium dog print T-shirt"
                  className="
                    relative z-10
                    h-auto w-full
                    object-cover
                    transition-transform
                    duration-700
                    hover:scale-105
                  "
                />

                {/* Product Info */}
                <div
                  className="
                    absolute bottom-5 left-5 right-5 z-20
                    flex items-center justify-between
                    rounded-2xl
                    border border-border/50
                    bg-background/90
                    px-4 py-3
                    shadow-xl
                    backdrop-blur-md
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex h-10 w-10
                        items-center justify-center
                        rounded-full bg-primary/10
                      "
                    >
                      <PawPrint className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-foreground">
                        Dog Lover Tee
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Premium Cotton
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      Starting at
                    </p>

                    <p className="font-bold text-foreground">
                      $24.99
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Bestseller */}
            <div
              className="
                absolute -left-3 top-8 z-20
                flex items-center gap-2
                rounded-2xl
                border border-border/50
                bg-background/90
                px-4 py-3
                shadow-xl
                backdrop-blur-md
                sm:-left-5
              "
            >
              <Heart className="h-4 w-4 fill-current text-primary" />

              <div>
                <p className="text-xs font-bold text-foreground">
                  Best Seller
                </p>

                <p className="text-[11px] text-muted-foreground">
                  Dog Collection
                </p>
              </div>
            </div>

            {/* Floating Paw */}
            <div
              className="
                absolute -right-3 top-6 z-20
                flex h-14 w-14
                rotate-12
                items-center justify-center
                rounded-2xl
                border border-border/50
                bg-background/90
                shadow-lg
                backdrop-blur-md
                sm:-right-5
              "
            >
              <PawPrint className="h-7 w-7 text-primary" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;