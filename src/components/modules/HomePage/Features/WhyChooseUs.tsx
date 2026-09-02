import {
  Heart,
  Palette,
  ShieldCheck,
  Truck,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: Palette,
    title: "Unique Pet Designs",
    description:
      "Original designs created for people who proudly love their pets.",
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Premium Quality",
    description:
      "Comfortable, durable T-shirts made for everyday wear.",
  },
  {
    id: 3,
    icon: Truck,
    title: "Fast & Easy Shipping",
    description:
      "Get your favorite pet-inspired T-shirts delivered to your door.",
  },
  {
    id: 4,
    icon: Heart,
    title: "Made With Love",
    description:
      "Every design is inspired by the special bond between pets and people.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-muted/30 py-16 transition-colors duration-300 sm:py-20">
      <div className="container mx-auto px-4">

        {/* ================= HEADER ================= */}
        <div className="mx-auto mb-12 max-w-2xl text-center">

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
            <Heart className="h-4 w-4 fill-current" />
            Made for Pet Lovers
          </div>

          <h2
            className="
              text-3xl font-bold tracking-tight
              text-foreground
              sm:text-4xl
              animate-in fade-in slide-in-from-bottom-4
              duration-700
            "
          >
            Why Choose Us?
          </h2>

          <p
            className="
              mx-auto mt-3 max-w-xl
              text-muted-foreground
              animate-in fade-in slide-in-from-bottom-5
              duration-700
            "
          >
            More than just T-shirts. We create designs that celebrate
            the love you have for your furry friends.
          </p>
        </div>

        {/* ================= FEATURES ================= */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="
                  group
                  relative
                  rounded-3xl
                  border border-border
                  bg-background
                  p-6
                  text-center
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:shadow-xl

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

                {/* Icon */}
                <div
                  className="
                    mx-auto
                    flex h-14 w-14
                    items-center justify-center
                    rounded-2xl
                    bg-primary/10
                    text-primary
                    transition-all duration-500
                    group-hover:rotate-6
                    group-hover:scale-110
                    group-hover:bg-primary
                    group-hover:text-primary-foreground
                  "
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3
                  className="
                    mt-5
                    text-lg
                    font-semibold
                    text-foreground
                  "
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-muted-foreground
                  "
                >
                  {feature.description}
                </p>

                {/* Bottom line */}
                <div
                  className="
                    mx-auto mt-5
                    h-1 w-0
                    rounded-full
                    bg-primary
                    transition-all duration-500
                    group-hover:w-10
                  "
                />
              </div>
            );
          })}
        </div>

        {/* ================= BOTTOM STAT ================= */}
        <div
          className="
            mx-auto mt-12
            flex max-w-3xl
            flex-col items-center
            justify-center
            gap-6
            rounded-3xl
            border border-border
            bg-background
            px-6 py-7
            text-center
            shadow-sm
            sm:flex-row
            sm:gap-12
          "
        >
          <div>
            <p className="text-2xl font-bold text-foreground">
              100%
            </p>
            <p className="text-xs text-muted-foreground">
              Pet Lover Approved
            </p>
          </div>

          <div className="hidden h-10 w-px bg-border sm:block" />

          <div>
            <p className="text-2xl font-bold text-foreground">
              Premium
            </p>
            <p className="text-xs text-muted-foreground">
              Quality T-Shirts
            </p>
          </div>

          <div className="hidden h-10 w-px bg-border sm:block" />

          <div>
            <p className="text-2xl font-bold text-foreground">
              Made
            </p>
            <p className="text-xs text-muted-foreground">
              With Pet Love 🐾
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;