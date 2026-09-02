
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const trendingProducts = [
  {
    id: 1,
    name: "Watercolor Dog Art Tee",
    price: 24.99,
    rating: 4.9,
    reviews: 128,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXzG4VcLR7UtNoiMj-wjaFqi1MO-H7l5JoysuToGInf8K8cPLfFhUoJio&s",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Labrador Lover T-Shirt",
    price: 22.99,
    rating: 4.8,
    reviews: 96,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8-fkeGmkc4cShcBhf0kytUXxiulTQsy3LDa18RL8IvA&s=10",
    badge: "Trending",
  },
  {
    id: 3,
    name: "Golden Retriever Tee",
    price: 25.99,
    rating: 4.9,
    reviews: 114,
    image: "https://i.etsystatic.com/39069441/r/il/dae2b6/6203253529/il_fullxfull.6203253529_44m7.jpg",
    badge: "Popular",
  },
  {
    id: 4,
    name: "PawMark Classic T-Shirt",
    price: 21.99,
    rating: 4.7,
    reviews: 82,
    image: "https://inkrra.in/cdn/shop/files/ChatGPT_Image_Jul_12_2026_at_03_02_06_PM.png?crop=center&height=1402&v=1783848769&width=1122",
    badge: "New",
  },
  {
    id: 5,
    name: "Dog Mom Premium Tee",
    price: 23.99,
    rating: 4.9,
    reviews: 105,
    image: "https://ih1.redbubble.net/image.2443240372.9253/ssrco,kids_tee,flatlay_01,8DB3D2:e6f0370482,front,product_square,x600.webp",
    badge: "Trending",
  },
];

const TrendingProducts = () => {
  return (
    <section className="bg-background py-16 transition-colors duration-300 sm:py-20">
      <div className="container mx-auto px-4">

        {/* ================= HEADER ================= */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            {/* Small Badge */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary">
              <TrendingUp className="h-4 w-4" />
              Trending Now
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Loved by Dog Lovers
            </h2>

            <p className="mt-2 max-w-xl text-muted-foreground">
              Discover our most-loved dog-themed T-shirts that everyone is
              talking about.
            </p>
          </div>

          {/* View All */}
          <Button
            variant="ghost"
            className="group w-fit rounded-full"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="
                group relative overflow-hidden
                rounded-2xl
                border border-border
                bg-card
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
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
                    duration-500
                    group-hover:scale-105
                  "
                />

                {/* Badge */}
                <span
                  className="
                    absolute left-3 top-3
                    rounded-full
                    bg-background/90
                    px-3 py-1
                    text-xs font-semibold
                    text-foreground
                    shadow-sm
                    backdrop-blur
                  "
                >
                  {product.badge}
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
                    transition-all
                    hover:text-primary
                  "
                >
                  <Heart className="h-4 w-4" />
                </button>

                {/* Quick Add */}
                <div
                  className="
                    absolute bottom-3 left-3 right-3
                    translate-y-16
                    opacity-0
                    transition-all duration-300
                    group-hover:translate-y-0
                    group-hover:opacity-100
                  "
                >
                  <Button
                    className="w-full rounded-xl shadow-lg"
                    size="sm"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Quick Add
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

                  <div className="flex items-center">
                    <Star className="h-3.5 w-3.5 fill-current text-primary" />
                    <span className="ml-1 text-sm font-medium text-foreground">
                      {product.rating}
                    </span>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-center justify-between">

                  <span className="text-lg font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    Free shipping
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= BOTTOM CTA ================= */}
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            className="
              rounded-full px-6
              bg-background
              transition-all
              hover:bg-muted
            "
          >
            Explore All T-Shirts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

      </div>
    </section>
  );
};

export default TrendingProducts;