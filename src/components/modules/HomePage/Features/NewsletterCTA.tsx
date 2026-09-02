import {
  ArrowRight,
  Check,
  Mail,
  PawPrint,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Later: connect this with your API / RTK Query
    console.log("Newsletter email:", email);

    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="bg-background px-4 py-16 sm:py-20">
      <div className="container mx-auto">

        {/* ================= MAIN CARD ================= */}
        <div
          className="
            group relative
            mx-auto
            max-w-6xl
            overflow-hidden
            rounded-[2rem]
            border border-border
            bg-card
            shadow-sm
            transition-all duration-500
            hover:shadow-xl
          "
        >

          {/* ================= DECORATIVE PAWS ================= */}

          <PawPrint
            className="
              absolute
              -right-8
              -top-8
              h-32 w-32
              rotate-12
              text-primary/5
              transition-transform duration-700
              group-hover:rotate-45
              group-hover:scale-110
            "
          />

          <PawPrint
            className="
              absolute
              -bottom-10
              -left-8
              h-36 w-36
              -rotate-12
              text-primary/5
              transition-transform duration-700
              group-hover:-rotate-45
              group-hover:scale-110
            "
          />

          {/* ================= CONTENT ================= */}

          <div className="relative grid items-center gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1fr_auto] lg:px-16">

            {/* LEFT CONTENT */}
            <div className="max-w-2xl">

              {/* Badge */}
              <div
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border border-primary/20
                  bg-primary/5
                  px-4 py-1.5
                  text-sm
                  font-medium
                  text-primary
                  animate-in
                  fade-in
                  slide-in-from-bottom-3
                  duration-700
                "
              >
                <Sparkles className="h-4 w-4" />
                Join Our Pack
              </div>

              {/* Heading */}
              <h2
                className="
                  text-3xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-foreground
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                Stay in the loop.
                <br />

                <span className="text-muted-foreground">
                  Keep the paws coming. 🐾
                </span>
              </h2>

              {/* Description */}
              <p
                className="
                  mt-4
                  max-w-xl
                  text-sm
                  leading-6
                  text-muted-foreground
                  sm:text-base
                "
              >
                Be the first to discover new pet-inspired T-shirt
                designs, exclusive offers, limited drops, and a few
                surprises made especially for pet lovers.
              </p>

              {/* ================= FORM ================= */}
              {!subscribed ? (
                <form
                  onSubmit={handleSubmit}
                  className="
                    mt-7
                    flex
                    w-full
                    max-w-xl
                    flex-col
                    gap-3
                    sm:flex-row
                  "
                >
                  {/* Input */}
                  <div className="relative flex-1">
                    <Mail
                      className="
                        absolute
                        left-4
                        top-1/2
                        h-4 w-4
                        -translate-y-1/2
                        text-muted-foreground
                      "
                    />

                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="
                        h-12
                        rounded-full
                        border-border
                        bg-background
                        pl-11
                        pr-4
                        text-sm
                        shadow-none
                        focus-visible:ring-1
                        focus-visible:ring-primary
                      "
                    />
                  </div>

                  {/* Button */}
                  <Button
                    type="submit"
                    className="
                      group/btn
                      h-12
                      rounded-full
                      px-6
                      font-semibold
                      shadow-sm
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:shadow-md
                    "
                  >
                    Join the Pack

                    <ArrowRight
                      className="
                        ml-2
                        h-4 w-4
                        transition-transform duration-300
                        group-hover/btn:translate-x-1
                      "
                    />
                  </Button>
                </form>
              ) : (
                /* ================= SUCCESS ================= */
                <div
                  className="
                    mt-7
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border border-primary/20
                    bg-primary/5
                    px-5 py-4
                    text-sm
                    text-foreground
                    animate-in
                    fade-in
                    slide-in-from-bottom-3
                    duration-500
                  "
                >
                  <div
                    className="
                      flex h-8 w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-primary
                      text-primary-foreground
                    "
                  >
                    <Check className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="font-semibold">
                      Welcome to the pack! 🐾
                    </p>

                    <p className="text-xs text-muted-foreground">
                      You're now on the list for exclusive updates.
                    </p>
                  </div>
                </div>
              )}

              {/* Privacy */}
              <p className="mt-3 text-xs text-muted-foreground">
                No spam. Just pet love, fresh designs & special offers.
              </p>
            </div>

            {/* ================= RIGHT VISUAL ================= */}
            <div
              className="
                relative
                mx-auto
                flex
                h-48 w-48
                items-center
                justify-center
                sm:h-56 sm:w-56
                lg:h-64 lg:w-64
              "
            >

              {/* Outer Circle */}
              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  border
                  border-primary/10
                  bg-primary/5
                  transition-all duration-700
                  group-hover:scale-105
                  group-hover:border-primary/20
                "
              />

              {/* Middle Circle */}
              <div
                className="
                  absolute
                  inset-5
                  rounded-full
                  border
                  border-dashed
                  border-primary/20
                  transition-transform duration-700
                  group-hover:rotate-12
                "
              />

              {/* Paw Icon */}
              <div
                className="
                  relative
                  flex
                  h-24 w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-foreground
                  text-background
                  shadow-xl
                  transition-all duration-500
                  group-hover:scale-110
                  group-hover:rotate-6
                "
              >
                <PawPrint className="h-11 w-11" />
              </div>

              {/* Floating Mail */}
              <div
                className="
                  absolute
                  right-3
                  top-6
                  flex
                  h-10 w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-border
                  bg-background
                  text-primary
                  shadow-md
                  animate-bounce
                "
              >
                <Mail className="h-4 w-4" />
              </div>

              {/* Floating Sparkle */}
              <Sparkles
                className="
                  absolute
                  bottom-8
                  left-4
                  h-6 w-6
                  text-primary
                  animate-pulse
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;