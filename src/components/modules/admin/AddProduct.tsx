import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import SingleImageUploader from "@/components/SingleImageUploader";

import {
  useProductCreateMutation,
} from "@/redux/features/product/product.api";

/* =========================================================
   Schema
========================================================= */

const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required")
    .min(
      3,
      "Product name must be at least 3 characters"
    ),

  category: z.enum(
    [
      "Dog Lovers",
      "Cat Lovers",
      "Paw Collection",
      "Custom",
    ],
    {
      message: "Please select a category",
    }
  ),

  description: z
    .string()
    .trim()
    .min(
      1,
      "Product description is required"
    )
    .min(
      10,
      "Description must be at least 10 characters"
    ),

  price: z
    .string()
    .trim()
    .min(1, "Price is required")
    .refine(
      (value) => !Number.isNaN(Number(value)),
      "Price must be a valid number"
    )
    .refine(
      (value) => Number(value) >= 0,
      "Price cannot be negative"
    ),

  oldPrice: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        (!Number.isNaN(Number(value)) &&
          Number(value) >= 0),
      "Old price must be a valid number"
    ),

  colors: z
    .string()
    .trim()
    .min(
      1,
      "At least one color is required"
    ),

  sizes: z
    .string()
    .trim()
    .min(
      1,
      "At least one size is required"
    ),

  badge: z
    .enum([
      "New",
      "Trending",
      "Popular",
      "Sale",
      "Best Seller",
    ])
    .optional(),

  stock: z
    .string()
    .trim()
    .min(1, "Stock is required")
    .refine(
      (value) => !Number.isNaN(Number(value)),
      "Stock must be a valid number"
    )
    .refine(
      (value) => Number(value) >= 0,
      "Stock cannot be negative"
    )
    .refine(
      (value) =>
        Number.isInteger(Number(value)),
      "Stock must be a whole number"
    ),

  /*
   * IMPORTANT:
   * Images start as null.
   * After upload they become File.
   */
  mainImage: z
    .custom<File | null>()
    .refine(
      (file) => file instanceof File,
      "Main image is required"
    ),

  hoverImage: z
    .custom<File | null>()
    .refine(
      (file) => file instanceof File,
      "Hover image is required"
    ),
});

/* =========================================================
   Form Type
========================================================= */

type ProductFormValues =
  z.input<typeof productSchema>;

/* =========================================================
   Error Message
========================================================= */

function ErrorMessage({
  message,
}: {
  message?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <p className="text-xs text-destructive">
      {message}
    </p>
  );
}

/* =========================================================
   Component
========================================================= */

export default function AddProduct() {
  const [
    createProduct,
    { isLoading },
  ] = useProductCreateMutation();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),

    defaultValues: {
      name: "",
      category: undefined,
      description: "",
      price: "",
      oldPrice: "",
      colors: "",
      sizes: "",
      badge: undefined,
      stock: "",

      /*
       * IMPORTANT
       */
      mainImage: null,
      hoverImage: null,
    },
  });

  /* =========================================================
     Image Handlers
  ========================================================= */

  const handleMainImageChange = useCallback(
    (file: File | null) => {
      setValue("mainImage", file, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue]
  );

  const handleHoverImageChange = useCallback(
    (file: File | null) => {
      setValue("hoverImage", file, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue]
  );

  /* =========================================================
     Submit
  ========================================================= */

  const onSubmit = async (
    values: ProductFormValues
  ) => {
    try {
      /*
       * Extra safety check.
       *
       * Zod should already validate these,
       * but TypeScript needs explicit checking.
       */

      if (!(values.mainImage instanceof File)) {
        toast.error(
          "Please select the main product image"
        );

        return;
      }

      if (!(values.hoverImage instanceof File)) {
        toast.error(
          "Please select the hover product image"
        );

        return;
      }

      /* =========================
         Colors
      ========================= */

      const colors = values.colors
        .split(",")
        .map((color) => color.trim())
        .filter(Boolean);

      /* =========================
         Sizes
      ========================= */

      const sizes = values.sizes
        .split(",")
        .map((size) => size.trim())
        .filter(Boolean);

      /* =========================
         Product Data
      ========================= */

      const productData = {
        name: values.name.trim(),

        category: values.category,

        description:
          values.description.trim(),

        price: Number(values.price),

        ...(values.oldPrice
          ? {
              oldPrice: Number(
                values.oldPrice
              ),
            }
          : {}),

        colors,

        sizes,

        ...(values.badge
          ? {
              badge: values.badge,
            }
          : {}),

        stock: Number(values.stock),
      };

      /* =========================
         FormData
      ========================= */

      const formData = new FormData();

      formData.append(
        "data",
        JSON.stringify(productData)
      );

      /*
       * Main image
       */

      formData.append(
        "files",
        values.mainImage
      );

      /*
       * Hover image
       */

      formData.append(
        "files",
        values.hoverImage
      );

      /* =========================
         API
      ========================= */

      const res =
        await createProduct(
          formData
        ).unwrap();

      /* =========================
         Success
      ========================= */

      if (res.success) {
        toast.success(
          "Product created successfully!"
        );

        reset();
      }
    } catch (error) {
      console.error(
        "Create Product Error:",
        error
      );

      toast.error(
        "Failed to create product"
      );
    }
  };


  return (
    <div className="min-h-screen bg-muted/30 px-4 py-6 md:px-6">
      <div className="mx-auto max-w-5xl">

        {/* =================================================
            Header
        ================================================= */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Add Product
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Create a new product for your store.
          </p>
        </div>

        {/* =================================================
            Form
        ================================================= */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          {/* =================================================
              Basic Information
          ================================================= */}

          <Card>
            <CardHeader>
              <CardTitle>
                Basic Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">

              {/* Product Name */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Product Name

                  <span className="ml-1 text-destructive">
                    *
                  </span>
                </label>

                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Example: Dog Dad Classic T-Shirt"
                      autoComplete="off"
                    />
                  )}
                />

                <ErrorMessage
                  message={
                    errors.name?.message
                  }
                />
              </div>

              {/* Category */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Category

                  <span className="ml-1 text-destructive">
                    *
                  </span>
                </label>

                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={
                        field.value ?? ""
                      }
                      onValueChange={
                        field.onChange
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Dog Lovers">
                          Dog Lovers
                        </SelectItem>

                        <SelectItem value="Cat Lovers">
                          Cat Lovers
                        </SelectItem>

                        <SelectItem value="Paw Collection">
                          Paw Collection
                        </SelectItem>

                        <SelectItem value="Custom">
                          Custom
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />

                <ErrorMessage
                  message={
                    errors.category?.message
                  }
                />
              </div>

              {/* Description */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Description

                  <span className="ml-1 text-destructive">
                    *
                  </span>
                </label>

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={5}
                      placeholder="Describe your T-shirt..."
                    />
                  )}
                />

                <ErrorMessage
                  message={
                    errors.description?.message
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* =================================================
              Price & Inventory
          ================================================= */}

          <Card>
            <CardHeader>
              <CardTitle>
                Price & Inventory
              </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-5 md:grid-cols-3">

              {/* Price */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Price

                  <span className="ml-1 text-destructive">
                    *
                  </span>
                </label>

                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      step={0.01}
                      placeholder="24.99"
                    />
                  )}
                />

                <ErrorMessage
                  message={
                    errors.price?.message
                  }
                />
              </div>

              {/* Old Price */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Old Price
                </label>

                <Controller
                  name="oldPrice"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      step={0.01}
                      placeholder="29.99"
                    />
                  )}
                />

                <ErrorMessage
                  message={
                    errors.oldPrice?.message
                  }
                />
              </div>

              {/* Stock */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Stock

                  <span className="ml-1 text-destructive">
                    *
                  </span>
                </label>

                <Controller
                  name="stock"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      step={1}
                      placeholder="100"
                    />
                  )}
                />

                <ErrorMessage
                  message={
                    errors.stock?.message
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* =================================================
              Product Variants
          ================================================= */}

          <Card>
            <CardHeader>
              <CardTitle>
                Product Variants
              </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-5 md:grid-cols-2">

              {/* Colors */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Colors

                  <span className="ml-1 text-destructive">
                    *
                  </span>
                </label>

                <Controller
                  name="colors"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Black, White, Gray"
                    />
                  )}
                />

                <p className="text-xs text-muted-foreground">
                  Example: Black, White, Gray
                </p>

                <ErrorMessage
                  message={
                    errors.colors?.message
                  }
                />
              </div>

              {/* Sizes */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Sizes

                  <span className="ml-1 text-destructive">
                    *
                  </span>
                </label>

                <Controller
                  name="sizes"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="S, M, L, XL"
                    />
                  )}
                />

                <p className="text-xs text-muted-foreground">
                  Example: S, M, L, XL
                </p>

                <ErrorMessage
                  message={
                    errors.sizes?.message
                  }
                />
              </div>

              {/* Badge */}

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">
                  Product Badge
                </label>

                <Controller
                  name="badge"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={
                        field.value ?? ""
                      }
                      onValueChange={(value) =>
                        field.onChange(
                          value || undefined
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select badge (optional)" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="New">
                          New
                        </SelectItem>

                        <SelectItem value="Trending">
                          Trending
                        </SelectItem>

                        <SelectItem value="Popular">
                          Popular
                        </SelectItem>

                        <SelectItem value="Sale">
                          Sale
                        </SelectItem>

                        <SelectItem value="Best Seller">
                          Best Seller
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* =================================================
              Product Images
          ================================================= */}

          <Card>
            <CardHeader>
              <CardTitle>
                Product Images
              </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-6 md:grid-cols-2">

              {/* Main Image */}

              <div className="space-y-2">
                <SingleImageUploader
                  label="Main Product Image"
                  onChange={
                    handleMainImageChange
                  }
                />

                <ErrorMessage
                  message={
                    errors.mainImage?.message
                  }
                />
              </div>

              {/* Hover Image */}

              <div className="space-y-2">
                <SingleImageUploader
                  label="Hover Product Image"
                  onChange={
                    handleHoverImageChange
                  }
                />

                <ErrorMessage
                  message={
                    errors.hoverImage?.message
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* =================================================
              Actions
          ================================================= */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            {/* Reset */}

            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => reset()}
              className="w-full sm:w-auto"
            >
              Reset
            </Button>

            {/* Submit */}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading
                ? "Creating..."
                : "Create Product"}
            </Button>

          </div>
        </form>
      </div>
    </div>
  );
}