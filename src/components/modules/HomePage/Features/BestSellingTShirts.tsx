import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Star,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const bestSellers = [
  {
    id: 1,
    name: "Dog Mom Premium Tee",
    price: 23.99,
    oldPrice: 29.99,
    rating: 4.9,
    reviews: 245,
    image:
      "https://ih1.redbubble.net/image.2443240372.9253/ssrco,kids_tee,flatlay_01,8DB3D2:e6f0370482,front,product_square,x600.webp",
  },
  {
    id: 2,
    name: "Golden Retriever Lover Tee",
    price: 25.99,
    oldPrice: 31.99,
    rating: 4.9,
    reviews: 198,
    image:
      "https://i.etsystatic.com/39069441/r/il/dae2b6/6203253529/il_fullxfull.6203253529_44m7.jpg",
  },
  {
    id: 3,
    name: "PawMark Classic T-Shirt",
    price: 21.99,
    oldPrice: 27.99,
    rating: 4.8,
    reviews: 176,
    image:
      "https://inkrra.in/cdn/shop/files/ChatGPT_Image_Jul_12_2026_at_03_02_06_PM.png?crop=center&height=1402&v=1783848769&width=1122",
  },
  {
    id: 4,
    name: "Labrador Lover T-Shirt",
    price: 22.99,
    oldPrice: 28.99,
    rating: 4.8,
    reviews: 154,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8-fkeGmkc4cShcBhf0kytUXxiulTQsy3LDa18RL8IvA&s=10",
  },
];

const BestSellingTShirts = () => {
  return (
    <section className="bg-background py-16 transition-colors duration-300 sm:py-20">
      <div className="container mx-auto px-4">

        {/* ================= HEADER ================= */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            {/* Badge */}
            <div
              className="
                mb-3 inline-flex items-center gap-2
                rounded-full
                border border-primary/20
                bg-primary/5
                px-3 py-1.5
                text-sm font-medium
                text-primary
                animate-in
                fade-in
                slide-in-from-bottom-3
                duration-700
              "
            >
              <Trophy className="h-4 w-4" />
              Customer Favorites
            </div>

            {/* Heading */}
            <h2
              className="
                text-3xl font-bold tracking-tight
                text-foreground
                sm:text-4xl
                animate-in
                fade-in
                slide-in-from-bottom-4
                duration-700
              "
            >
              Best Selling T-Shirts
            </h2>

            <p
              className="
                mt-2 max-w-xl
                text-muted-foreground
                animate-in
                fade-in
                slide-in-from-bottom-5
                duration-700
              "
            >
              The T-shirts our pet-loving community can't get enough of.
            </p>
          </div>

          {/* View All */}
          <Button
            variant="ghost"
            className="group w-fit rounded-full"
          >
            View All
            <ArrowRight
              className="
                ml-2 h-4 w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Button>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {bestSellers.map((product, index) => (
            <div
              key={product.id}
              className="
                group relative
                overflow-hidden
                rounded-2xl
                border border-border
                bg-card
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-2xl

                animate-in
                fade-in
                slide-in-from-bottom-6
                fill-mode-both
                duration-700
              "
              style={{
                animationDelay: `${index * 120}ms`,
              }}
            >

              {/* ================= IMAGE ================= */}
              <div className="relative aspect-square overflow-hidden bg-muted/30">

                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    h-full w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-110
                  "
                />

                {/* Bestseller Badge */}
                <div
                  className="
                    absolute left-3 top-3
                    flex items-center gap-1.5
                    rounded-full
                    bg-foreground
                    px-3 py-1.5
                    text-xs font-semibold
                    text-background
                    shadow-lg
                  "
                >
                  <Trophy className="h-3.5 w-3.5" />
                  # {index + 1} Bestseller
                </div>

                {/* Discount */}
                <span
                  className="
                    absolute bottom-3 left-3
                    rounded-full
                    bg-background/90
                    px-3 py-1
                    text-xs font-semibold
                    text-foreground
                    shadow-sm
                    backdrop-blur
                  "
                >
                  Sale
                </span>

                {/* Wishlist */}
                <button
                  type="button"
                  aria-label={`Add ${product.name} to wishlist`}
                  className="
                    absolute right-3 top-3
                    flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    border border-border
                    bg-background/90
                    text-muted-foreground
                    shadow-sm
                    backdrop-blur
                    transition-all duration-300
                    hover:scale-110
                    hover:text-primary
                  "
                >
                  <Heart className="h-4 w-4" />
                </button>

                {/* Quick Add */}
                <div
                  className="
                    absolute bottom-3 left-3 right-3
                    translate-y-14
                    opacity-0
                    transition-all duration-400
                    group-hover:translate-y-0
                    group-hover:opacity-100
                  "
                >
                  <Button
                    size="sm"
                    className="
                      w-full rounded-xl
                      shadow-xl
                      transition-transform
                      hover:scale-[1.02]
                    "
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* ================= PRODUCT INFO ================= */}
              <div className="p-4">

                <h3
                  className="
                    line-clamp-1
                    font-semibold
                    text-foreground
                  "
                >
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-1.5">

                  <div className="flex items-center gap-1">
                    <Star
                      className="
                        h-3.5 w-3.5
                        fill-current
                        text-primary
                      "
                    />

                    <span className="text-sm font-medium text-foreground">
                      {product.rating}
                    </span>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-center gap-2">

                  <span className="text-lg font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>

                  <span
                    className="
                      text-sm
                      text-muted-foreground
                      line-through
                    "
                  >
                    ${product.oldPrice.toFixed(2)}
                  </span>
                </div>

                {/* Bottom info */}
                <div
                  className="
                    mt-3 flex items-center
                    justify-between
                    border-t border-border
                    pt-3
                  "
                >
                  <span className="text-xs text-muted-foreground">
                    Free shipping
                  </span>

                  <span className="text-xs font-medium text-primary">
                    In stock
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= CTA ================= */}
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            className="
              group
              rounded-full
              bg-background
              px-6
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-muted
            "
          >
            Shop All T-Shirts

            <ArrowRight
              className="
                ml-2 h-4 w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Button>
        </div>

      </div>
    </section>
  );
};

export default BestSellingTShirts;