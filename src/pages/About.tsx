
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Heart,
  PackageCheck,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const stats = [
    {
      icon: Users,
      value: "10K+",
      title: "Happy Pet Parents",
    },
    {
      icon: PackageCheck,
      value: "50K+",
      title: "Orders Delivered",
    },
    {
      icon: Award,
      value: "4.9/5",
      title: "Customer Rating",
    },
    {
      icon: Truck,
      value: "48",
      title: "States Served",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Made With Love",
      description:
        "Every AtNamira product is created with genuine love for pets and their families.",
    },
    {
      icon: Sparkles,
      title: "Premium Quality",
      description:
        "We focus on comfortable materials, beautiful designs, and everyday durability.",
    },
    {
      icon: ShieldCheck,
      title: "Pet First",
      description:
        "Your pet's comfort and happiness always come first in everything we create.",
    },
    {
      icon: PackageCheck,
      title: "Reliable Service",
      description:
        "From checkout to delivery, we aim to make your shopping experience simple and smooth.",
    },
  ];

  const promises = [
    "Premium pet apparel",
    "Comfort-focused designs",
    "Modern collections",
    "Fast & reliable shipping",
    "Friendly customer support",
    "Easy returns & exchanges",
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-background via-muted/30 to-primary/5">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* Content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm">
                <PawPrint className="h-4 w-4 text-primary" />
                Welcome to AtNamira Pet Shop
              </div>

              <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Style Your Pet.
                <span className="block text-primary">
                  Celebrate Every Moment.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                AtNamira is a modern pet lifestyle brand created for people
                who believe their pets deserve comfort, style, and love.
              </p>

              <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                From adorable dog tees to beautiful cat collections and
                paw-inspired designs, we create products that make everyday
                pet moments even more special.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button  size="lg" className="rounded-full px-7">
                  <Link to="/shop">
                    Explore Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                 
                  size="lg"
                  variant="outline"
                  className="rounded-full px-7"
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>

            {/* Brand Card */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border bg-card p-3 shadow-2xl">
                <div className="flex aspect-[4/3] items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-primary/10 via-background to-muted">
                  <div className="text-center">
                    <PawPrint className="mx-auto h-24 w-24 text-primary/30" />

                    <h2 className="mt-5 text-3xl font-black tracking-tight">
                      ATNAMIRA
                    </h2>

                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
                      Pet Lifestyle
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 p-4">
                  <div className="rounded-xl bg-muted/60 p-3 text-center">
                    <p className="text-xl font-bold">10K+</p>
                    <p className="text-xs text-muted-foreground">
                      Customers
                    </p>
                  </div>

                  <div className="rounded-xl bg-muted/60 p-3 text-center">
                    <p className="text-xl font-bold">50K+</p>
                    <p className="text-xs text-muted-foreground">
                      Orders
                    </p>
                  </div>

                  <div className="rounded-xl bg-muted/60 p-3 text-center">
                    <p className="text-xl font-bold">4.9</p>
                    <p className="text-xs text-muted-foreground">
                      Rating
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-card">
        <div className="container mx-auto grid grid-cols-2 px-4 md:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="flex items-center justify-center gap-4 border-b px-5 py-8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <div className="rounded-xl bg-primary/10 p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-2xl font-black">{stat.value}</p>

                  <p className="text-xs text-muted-foreground">
                    {stat.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Brand Story Card */}
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-28 w-28 rounded-full bg-primary/10 blur-xl" />

            <div className="relative rounded-[2rem] border bg-muted/40 p-6 shadow-sm">
              <div className="rounded-[1.5rem] border bg-background p-8">
                <PawPrint className="h-12 w-12 text-primary" />

                <h2 className="mt-8 text-3xl font-black tracking-tight">
                  More than a shop.
                </h2>

                <p className="mt-4 text-xl font-semibold text-primary">
                  A celebration of the bond between you and your pet.
                </p>

                <div className="my-8 h-px bg-border" />

                <p className="leading-8 text-muted-foreground">
                  AtNamira was created with a simple idea — pets are family.
                  They deserve products that are comfortable, beautiful, and
                  made with care.
                </p>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
              Our Story
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Built for people who love their pets.
            </h2>

            <p className="mt-6 leading-8 text-muted-foreground">
              AtNamira started with a simple vision: pet products should be
              functional, comfortable, stylish, and accessible.
            </p>

            <p className="mt-4 leading-8 text-muted-foreground">
              Our collections are designed for everyday pet life — walks,
              birthdays, family photos, weekend adventures, and all those
              little moments that become unforgettable memories.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {promises.map((promise) => (
                <div
                  key={promise}
                  className="flex items-center gap-3 rounded-xl border bg-card p-4"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />

                  <span className="text-sm font-medium">{promise}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
              Why AtNamira
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Designed around your pet.
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              Everything we do comes back to one simple goal — creating a
              better shopping experience for pet parents.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="group border-border/60 bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardContent className="p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-6 text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary px-7 py-14 text-primary-foreground md:px-14">
          <PawPrint className="absolute -right-5 -top-5 h-40 w-40 rotate-12 opacity-10" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] opacity-80">
                Find Something Special
              </p>

              <h2 className="mt-3 max-w-2xl text-3xl font-black md:text-4xl">
                Give your pet a little more personality.
              </h2>

              <p className="mt-3 max-w-xl text-primary-foreground/80">
                Explore our latest pet apparel and discover something your
                furry friend will love.
              </p>
            </div>

            <Button
       
              size="lg"
              variant="secondary"
              className="shrink-0 rounded-full px-7"
            >
              <Link to="/shop">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;

