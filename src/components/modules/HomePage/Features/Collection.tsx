import { ArrowUpRight, Heart, PawPrint } from "lucide-react";

const collections = [
  {
    id: 1,
    title: "Dog Lovers",
    description: "For those who wear their love proudly.",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Dog Mom",
    description: "Made for the proudest dog moms.",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Dog Dad",
    description: "Classic styles for every dog dad.",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Paw Prints",
    description: "Simple designs. Big love.",
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80",
  },
];

const ShopByCollection = () => {
  return (
    <section className="bg-muted/30 py-16 transition-colors duration-300 sm:py-20">
      <div className="container mx-auto px-4">

        {/* ================= HEADER ================= */}
        <div className="mx-auto mb-10 max-w-2xl text-center">

          {/* Badge */}
          <div
            className="
              mb-4 inline-flex items-center gap-2
              rounded-full
              border border-primary/20
              bg-primary/5
              px-4 py-1.5
              text-sm font-medium
              text-primary
              animate-in fade-in slide-in-from-bottom-3
              duration-700
            "
          >
            <PawPrint className="h-4 w-4" />
            Explore Our Collections
          </div>

          {/* Heading */}
          <h2
            className="
              text-3xl font-bold tracking-tight
              text-foreground
              sm:text-4xl
              animate-in fade-in slide-in-from-bottom-4
              duration-700
            "
          >
            Shop by Collection
          </h2>

          <p
            className="
              mx-auto mt-3 max-w-xl
              text-muted-foreground
              animate-in fade-in slide-in-from-bottom-5
              duration-700
            "
          >
            Find a style that speaks to your love for dogs. 
            From proud dog moms to devoted dog dads.
          </p>
        </div>

        {/* ================= COLLECTION GRID ================= */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className="
                group relative
                overflow-hidden
                rounded-3xl
                border border-border
                bg-card
                shadow-sm
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-2xl

                animate-in
                fade-in
                slide-in-from-bottom-6
                duration-700
                fill-mode-both
              "
              style={{
                animationDelay: `${index * 120}ms`,
              }}
            >
              {/* ================= IMAGE ================= */}
              <div className="relative aspect-[4/5] overflow-hidden">

                <img
                  src={collection.image}
                  alt={collection.title}
                  className="
                    h-full w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-110
                  "
                />

                {/* Dark Gradient */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/80
                    via-black/20
                    to-transparent
                    transition-all
                    duration-500
                    group-hover:from-black/90
                  "
                />

                {/* Top Icon */}
                <div
                  className="
                    absolute right-4 top-4
                    flex h-10 w-10
                    items-center justify-center
                    rounded-full
                    border border-white/20
                    bg-black/20
                    text-white
                    backdrop-blur-md
                    transition-all duration-500
                    group-hover:rotate-12
                    group-hover:bg-white
                    group-hover:text-black
                  "
                >
                  <Heart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* ================= CONTENT ================= */}
                <div
                  className="
                    absolute inset-x-0 bottom-0
                    p-5
                    text-white
                    transition-transform
                    duration-500
                    group-hover:-translate-y-1
                  "
                >
                  <h3
                    className="
                      text-2xl font-bold
                      tracking-tight
                    "
                  >
                    {collection.title}
                  </h3>

                  <p
                    className="
                      mt-1
                      max-w-[220px]
                      text-sm
                      text-white/75
                    "
                  >
                    {collection.description}
                  </p>

                  {/* Explore */}
                  <div
                    className="
                      mt-4
                      flex items-center
                      gap-2
                      text-sm font-semibold
                    "
                  >
                    <span
                      className="
                        relative
                        after:absolute
                        after:-bottom-1
                        after:left-0
                        after:h-[1px]
                        after:w-0
                        after:bg-white
                        after:transition-all
                        after:duration-300
                        group-hover:after:w-full
                      "
                    >
                      Explore Collection
                    </span>

                    <span
                      className="
                        flex h-8 w-8
                        items-center justify-center
                        rounded-full
                        bg-white
                        text-black
                        transition-all duration-500
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                      "
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= BOTTOM TEXT ================= */}
        <div
          className="
            mt-10 text-center
            animate-in fade-in
            duration-1000
            delay-700
          "
        >
          <p className="text-sm text-muted-foreground">
            Every collection is made with a little more love for dogs. 🐾
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShopByCollection;