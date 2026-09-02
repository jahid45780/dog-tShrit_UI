import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  Verified,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Customer",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    review:
      "Absolutely love this T-shirt! The design is beautiful and the quality is even better than I expected. My dog approves too! 🐶",
  },
  {
    id: 2,
    name: "Emily Carter",
    role: "Verified Customer",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    review:
      "The perfect T-shirt for every dog mom. It is super comfortable, the print looks amazing, and delivery was really fast.",
  },
  {
    id: 3,
    name: "Michael Wilson",
    role: "Verified Customer",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    review:
      "I bought this as a gift for my wife and she absolutely loved it. Great quality, unique design, and excellent packaging.",
  },
  {
    id: 4,
    name: "Olivia Smith",
    role: "Verified Customer",
    avatar: "https://i.pravatar.cc/150?img=44",
    rating: 4,
    review:
      "Really happy with my purchase. The fabric feels premium and the design looks exactly like the photos. Will definitely order again!",
  },
];

const CustomerReviews = () => {
  const [current, setCurrent] = useState(0);

  const nextReview = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const previousReview = () => {
    setCurrent(
      (prev) => (prev - 1 + reviews.length) % reviews.length
    );
  };

  const review = reviews[current];

  return (
    <section className="bg-background py-16 transition-colors duration-300 sm:py-20">
      <div className="container mx-auto px-4">

        {/* ================= HEADER ================= */}
        <div className="mx-auto mb-10 max-w-2xl text-center">

          <div
            className="
              mb-4 inline-flex items-center gap-2
              rounded-full
              border border-primary/20
              bg-primary/5
              px-4 py-1.5
              text-sm font-medium
              text-primary
            "
          >
            <Star className="h-4 w-4 fill-current" />
            Customer Reviews
          </div>

          <h2
            className="
              text-3xl font-bold tracking-tight
              text-foreground
              sm:text-4xl
            "
          >
            Loved by Pet Lovers
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            See what our happy customers have to say about their
            favorite pet-inspired T-shirts.
          </p>
        </div>

        {/* ================= REVIEW CARD ================= */}
        <div className="mx-auto max-w-4xl">

          <div
            className="
              relative overflow-hidden
              rounded-3xl
              border border-border
              bg-card
              p-6
              shadow-sm
              transition-all duration-500
              sm:p-10
            "
          >

            {/* Quote Icon */}
            <div
              className="
                absolute right-6 top-6
                flex h-12 w-12
                items-center justify-center
                rounded-full
                bg-primary/10
                text-primary
                sm:right-10 sm:top-10
              "
            >
              <Quote className="h-5 w-5 fill-current" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`
                    h-4 w-4
                    ${
                      index < review.rating
                        ? "fill-current text-primary"
                        : "text-muted-foreground/30"
                    }
                  `}
                />
              ))}
            </div>

            {/* Review */}
            <blockquote
              key={review.id}
              className="
                mt-6 max-w-3xl
                text-lg
                leading-8
                text-foreground
                animate-in
                fade-in
                slide-in-from-right-4
                duration-500
                sm:text-xl
              "
            >
              “{review.review}”
            </blockquote>

            {/* ================= USER ================= */}
            <div className="mt-8 flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <Avatar className="h-12 w-12 border border-border">
                  <AvatarImage
                    src={review.avatar}
                    alt={review.name}
                  />

                  <AvatarFallback>
                    {review.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-foreground">
                      {review.name}
                    </h3>

                    <Verified className="h-4 w-4 fill-primary text-primary-foreground" />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {review.role}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">

                <Button
                  variant="outline"
                  size="icon"
                  onClick={previousReview}
                  className="h-10 w-10 rounded-full"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextReview}
                  className="h-10 w-10 rounded-full"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

              </div>
            </div>
          </div>

          {/* ================= DOTS ================= */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {reviews.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to review ${index + 1}`}
                className={`
                  h-2 rounded-full
                  transition-all duration-300
                  ${
                    current === index
                      ? "w-7 bg-foreground"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }
                `}
              />
            ))}
          </div>

          {/* ================= TRUST ================= */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Join thousands of happy pet lovers wearing their favorite
              designs. 🐾
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;