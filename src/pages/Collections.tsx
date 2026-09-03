
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  PawPrint,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


type Collection = {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  petCount: number;
  image: string;
  badge?: string;
};

/* =====================================================
   DUMMY COLLECTION DATA
===================================================== */

const collections: Collection[] = [
  {
    id: 1,
    name: "Dog Lovers",
    slug: "dog-lovers",
    category: "Dogs",
    description:
      "Cute and stylish collections made for every proud dog parent.",
    petCount: 24,
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=900",
    badge: "Popular",
  },

  {
    id: 2,
    name: "Cat Lovers",
    slug: "cat-lovers",
    category: "Cats",
    description:
      "Perfect designs for people who believe cats run the world.",
    petCount: 18,
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900",
    badge: "Trending",
  },

  {
    id: 3,
    name: "Puppy Collection",
    slug: "puppy-collection",
    category: "Dogs",
    description:
      "Playful designs inspired by the cutest little paws.",
    petCount: 16,
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900",
    badge: "New",
  },

  {
    id: 4,
    name: "Kitten Collection",
    slug: "kitten-collection",
    category: "Cats",
    description:
      "Sweet and adorable designs inspired by playful kittens.",
    petCount: 12,
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=900",
    badge: "New",
  },

  {
    id: 5,
    name: "Paw Collection",
    slug: "paw-collection",
    category: "Paw",
    description:
      "Minimal and beautiful paw-inspired designs for pet lovers.",
    petCount: 21,
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900",
    badge: "Popular",
  },

  {
    id: 6,
    name: "Funny Pets",
    slug: "funny-pets",
    category: "Funny",
    description:
      "Fun, funny and playful designs that every pet lover will enjoy.",
    petCount: 14,
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900",
    badge: "Fun",
  },

  {
    id: 7,
    name: "Pet Parents",
    slug: "pet-parents",
    category: "Lifestyle",
    description:
      "Celebrate the special bond between pets and their humans.",
    petCount: 19,
    image:
      "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=900",
    badge: "Favorite",
  },

  {
    id: 8,
    name: "Best Friends",
    slug: "best-friends",
    category: "Lifestyle",
    description:
      "Because the best friendships come with four paws.",
    petCount: 15,
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900",
    badge: "Love",
  },

  {
    id: 9,
    name: "Pet Mom",
    slug: "pet-mom",
    category: "Lifestyle",
    description:
      "Special designs for proud pet moms everywhere.",
    petCount: 11,
    image:
      "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=900",
    badge: "New",
  },

  {
    id: 10,
    name: "Pet Dad",
    slug: "pet-dad",
    category: "Lifestyle",
    description:
      "For the dads who proudly carry the title of pet dad.",
    petCount: 13,
    image:
      "https://images.unsplash.com/photo-1544568100-847a948585b9?w=900",
    badge: "Popular",
  },
];

/* =====================================================
   FILTER CATEGORIES
===================================================== */

const categories = [
  "All",
  "Dogs",
  "Cats",
  "Paw",
  "Funny",
  "Lifestyle",
];

/* =====================================================
   COLLECTION PAGE
===================================================== */

const Collections = () => {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] =
    useState("Popular");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 6;

  /* ===================================================
     SEARCH + FILTER + SORT
  =================================================== */

  const filteredCollections = useMemo(() => {
    let result = collections.filter(
      (collection) => {
        const matchesCategory =
          activeCategory === "All" ||
          collection.category ===
            activeCategory;

        const matchesSearch =
          collection.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          collection.description
            .toLowerCase()
            .includes(search.toLowerCase());

        return (
          matchesCategory &&
          matchesSearch
        );
      }
    );

    if (sortBy === "Name") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortBy === "Most Products") {
      result = [...result].sort(
        (a, b) => b.petCount - a.petCount
      );
    }

    return result;
  }, [activeCategory, search, sortBy]);

  /* ===================================================
     PAGINATION
  =================================================== */

  const totalPages = Math.ceil(
    filteredCollections.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const paginatedCollections =
    filteredCollections.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  /* ===================================================
     RESET PAGE
  =================================================== */

  const handleCategoryChange = (
    category: string
  ) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (
    value: string
  ) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden border-b bg-muted/30">
        {/* Background decorations */}

        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="container relative mx-auto px-4 py-16 text-center md:py-20">
          <Badge className="mb-5 rounded-full px-4 py-1.5">
            <PawPrint className="mr-2 h-4 w-4" />
            Explore Atnamira
          </Badge>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Discover Our
            <span className="block text-primary">
              Pet Collections 🐾
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground md:text-lg">
            Explore collections inspired by the pets we
            love. Find your favorite style and wear your
            pet-loving personality with pride.
          </p>
        </div>
      </section>

      {/* =================================================
          FEATURED COLLECTION
      ================================================= */}

      <section className="container mx-auto px-4 py-12">
        <div
          className="
            group relative overflow-hidden
            rounded-3xl
            bg-muted
          "
        >
          <img
            src="https://images.unsplash.com/photo-1558788353-f76d92427f16?w=1400"
            alt="Featured pet collection"
            className="
              h-[360px] w-full object-cover
              transition-transform duration-700
              group-hover:scale-105
              md:h-[430px]
            "
          />

          {/* Overlay */}

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-xl px-6 text-white md:px-12">
              <Badge
                variant="secondary"
                className="mb-4 rounded-full"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Featured Collection
              </Badge>

              <h2 className="text-3xl font-black md:text-5xl">
                Made for
                <span className="block">
                  Pet Lovers ❤️
                </span>
              </h2>

              <p className="mt-4 max-w-lg text-sm text-white/80 md:text-base">
                Discover our most-loved pet-inspired
                designs created for people who treat their
                pets like family.
              </p>

              <Button
                size="lg"
                className="mt-6 rounded-full"
              >
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          COLLECTION HEADER
      ================================================= */}

      <section className="container mx-auto px-4 pb-14 pt-4">
        <div className="mb-7">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            Browse
          </p>

          <h2 className="mt-2 text-2xl font-black md:text-3xl">
            All Collections
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Find the collection that matches your pet-loving
            personality.
          </p>
        </div>

        {/* =================================================
            SEARCH + SORT
        ================================================= */}

        <div className="rounded-2xl border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}

            <div className="relative w-full lg:max-w-md">
              <Search
                className="
                  absolute left-3 top-1/2
                  h-4 w-4
                  -translate-y-1/2
                  text-muted-foreground
                "
              />

              <Input
                value={search}
                onChange={(e) =>
                  handleSearch(e.target.value)
                }
                placeholder="Search collections..."
                className="h-11 rounded-xl pl-10"
              />
            </div>

            {/* Sort */}

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="rounded-xl"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter
              </Button>

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="
                  h-10 rounded-xl
                  border bg-background
                  px-3 text-sm
                  outline-none
                  focus:ring-2
                  focus:ring-primary
                "
              >
                <option>Popular</option>
                <option>Name</option>
                <option>Most Products</option>
              </select>
            </div>
          </div>

          {/* =================================================
              CATEGORY FILTER
          ================================================= */}

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {categories.map(
              (category) => (
                <Button
                  key={category}
                  variant={
                    activeCategory === category
                      ? "default"
                      : "outline"
                  }
                  className="shrink-0 rounded-full"
                  onClick={() =>
                    handleCategoryChange(
                      category
                    )
                  }
                >
                  {category}
                </Button>
              )
            )}
          </div>
        </div>

        {/* =================================================
            RESULT INFO
        ================================================= */}

        <div className="mt-8 flex items-end justify-between">
          <div>
            <h3 className="text-xl font-bold">
              Collections
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Showing{" "}
              {paginatedCollections.length}{" "}
              of{" "}
              {filteredCollections.length}{" "}
              collections
            </p>
          </div>
        </div>

        {/* =================================================
            COLLECTION GRID
        ================================================= */}

        {paginatedCollections.length > 0 ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedCollections.map(
              (collection) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                />
              )
            )}
          </div>
        ) : (
          /* =================================================
             EMPTY STATE
          ================================================= */

          <div
            className="
              mt-7 flex min-h-72
              flex-col items-center
              justify-center
              rounded-2xl
              border border-dashed
            "
          >
            <Search className="mb-4 h-10 w-10 text-muted-foreground" />

            <h3 className="text-lg font-bold">
              No collections found
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Try another search or category.
            </p>

            <Button
              className="mt-5 rounded-full"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* =================================================
            PAGINATION
        ================================================= */}

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {/* Previous */}

            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  (page) => page - 1
                )
              }
              className="rounded-xl"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Pages */}

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <Button
                key={page}
                variant={
                  currentPage === page
                    ? "default"
                    : "outline"
                }
                onClick={() =>
                  setCurrentPage(page)
                }
                className="h-10 w-10 rounded-xl"
              >
                {page}
              </Button>
            ))}

            {/* Next */}

            <Button
              variant="outline"
              size="icon"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (page) => page + 1
                )
              }
              className="rounded-xl"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </section>

      {/* =================================================
          BOTTOM CTA
      ================================================= */}

      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-16 text-center">
          <div
            className="
              mx-auto flex h-14 w-14
              items-center justify-center
              rounded-2xl
              bg-primary/10
              text-primary
            "
          >
            <PawPrint className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-3xl font-black">
            Can't Find Your Perfect Style?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Create a custom T-shirt inspired by your favorite
            pet and make something truly yours.
          </p>

          <Button
            size="lg"
            className="mt-6 rounded-full px-8"
          >
            Create Custom T-Shirt
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </main>
  );
};

/* =====================================================
   COLLECTION CARD
===================================================== */

const CollectionCard = ({
  collection,
}: {
  collection: Collection;
}) => {
  const [isFavorite, setIsFavorite] =
    useState(false);

  return (
    <div
      className="
        group overflow-hidden
        rounded-2xl border
        bg-card
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-2xl
      "
    >
      {/* =================================================
          IMAGE
      ================================================= */}

      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={collection.image}
          alt={collection.name}
          className="
            h-full w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        {/* Image overlay */}

        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/50
            via-transparent
            to-transparent
            opacity-70
          "
        />

        {/* Badge */}

        {collection.badge && (
          <Badge
            className="
              absolute left-4 top-4
              rounded-full
              px-3 py-1
            "
          >
            {collection.badge}
          </Badge>
        )}

        {/* Wishlist */}

        <button
          type="button"
          onClick={() =>
            setIsFavorite(!isFavorite)
          }
          className="
            absolute right-4 top-4
            flex h-10 w-10
            items-center justify-center
            rounded-full
            bg-background/90
            shadow-lg
            backdrop-blur
            transition-all
            hover:scale-110
          "
          aria-label="Add to wishlist"
        >
          <Heart
            className={`
              h-5 w-5
              transition-all
              ${
                isFavorite
                  ? "fill-current text-red-500"
                  : ""
              }
            `}
          />
        </button>

        {/* Pet Count */}

        <div
          className="
            absolute bottom-4 left-4
            rounded-full
            bg-black/50
            px-3 py-1
            text-xs font-semibold
            text-white
            backdrop-blur-sm
          "
        >
          {collection.petCount} Designs
        </div>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          {collection.category}
        </p>

        <h3 className="mt-1 text-xl font-black">
          {collection.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {collection.description}
        </p>

        {/* Explore */}

        <Button
          variant="ghost"
          className="
            mt-4
            w-full
            justify-between
            rounded-xl
            px-3
            hover:bg-primary/10
          "
        >
          Explore Collection

          <ArrowRight
            className="
              h-4 w-4
              transition-transform
              group-hover:translate-x-1
            "
          />
        </Button>
      </div>
    </div>
  );
};

export default Collections;

