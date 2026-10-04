
import {
  useEffect,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  Plus,
  Save,
  X,
} from "lucide-react";

import { toast } from "sonner";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/product.api";

import type { IProduct } from "@/types";

import { useFileUpload } from "@/hooks/use-file-upload";

// =====================================================
// CONSTANTS
// =====================================================

const categories = [
  "Dog Lovers",
  "Cat Lovers",
  "Paw Collection",
  "Custom",
];

const badges = [
  "New",
  "Trending",
  "Popular",
  "Sale",
  "Best Seller",
];

// =====================================================
// COMPONENT
// =====================================================

const EditProduct = () => {
  const location = useLocation();

  const navigate = useNavigate();

  // ===================================================
  // PRODUCT ID
  // ===================================================

  const productId = location.state?.productId as
    | string
    | undefined;

  // ===================================================
  // FORM STATE
  // ===================================================

  const [name, setName] = useState("");

  const [slug, setSlug] = useState("");

  const [category, setCategory] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [oldPrice, setOldPrice] = useState("");

  const [stock, setStock] = useState("");

  const [badge, setBadge] = useState("");

  const [isActive, setIsActive] = useState(true);

  // ===================================================
  // COLORS
  // ===================================================

  const [colors, setColors] = useState<string[]>([]);

  const [colorInput, setColorInput] = useState("");

  // ===================================================
  // SIZES
  // ===================================================

  const [sizes, setSizes] = useState<string[]>([]);

  const [sizeInput, setSizeInput] = useState("");

  // ===================================================
  // OLD IMAGES
  // ===================================================

  const [oldMainImage, setOldMainImage] =
    useState<string>("");

  const [oldHoverImage, setOldHoverImage] =
    useState<string>("");

  // ===================================================
  // MAIN IMAGE UPLOAD
  // ===================================================

  const [
    mainImageState,
    mainImageActions,
  ] = useFileUpload({
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    accept: "image/*",
    multiple: false,
  });

  // ===================================================
  // HOVER IMAGE UPLOAD
  // ===================================================

  const [
    hoverImageState,
    hoverImageActions,
  ] = useFileUpload({
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    accept: "image/*",
    multiple: false,
  });

  // ===================================================
  // GET SINGLE PRODUCT
  // ===================================================

  const {
    data: productResponse,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetSingleProductQuery(
    productId ?? "",
    {
      skip: !productId,
    }
  );

  // ===================================================
  // UPDATE PRODUCT
  // ===================================================

  const [
    updateProduct,
    {
      isLoading: isUpdating,
    },
  ] = useUpdateProductMutation();

  // ===================================================
  // PRODUCT
  // ===================================================

  const product: IProduct | undefined =
    productResponse?.data;

  // ===================================================
  // LOAD PRODUCT DATA
  // ===================================================

  useEffect(() => {
    if (!product) {
      return;
    }

    setName(product.name ?? "");

    setSlug(product.slug ?? "");

    setCategory(product.category ?? "");

    setDescription(
      product.description ?? ""
    );

    setPrice(
      product.price !== undefined &&
        product.price !== null
        ? String(product.price)
        : ""
    );

    setOldPrice(
      product.oldPrice !== undefined &&
        product.oldPrice !== null
        ? String(product.oldPrice)
        : ""
    );

    setStock(
      product.stock !== undefined &&
        product.stock !== null
        ? String(product.stock)
        : ""
    );

    setBadge(product.badge ?? "");

    setIsActive(
      product.isActive ?? true
    );

    setColors(
      Array.isArray(product.colors)
        ? product.colors
        : []
    );

    setSizes(
      Array.isArray(product.sizes)
        ? product.sizes
        : []
    );

    setOldMainImage(
      product.images?.main ?? ""
    );

    setOldHoverImage(
      product.images?.hover ?? ""
    );
  }, [product]);

  // ===================================================
  // COLOR
  // ===================================================

  const handleAddColor = () => {
    const value = colorInput.trim();

    if (!value) {
      return;
    }

    const exists = colors.some(
      (color) =>
        color.toLowerCase() ===
        value.toLowerCase()
    );

    if (exists) {
      toast.error(
        "Color already added"
      );
      return;
    }

    setColors((previous) => [
      ...previous,
      value,
    ]);

    setColorInput("");
  };

  const handleRemoveColor = (
    color: string
  ) => {
    setColors((previous) =>
      previous.filter(
        (item) => item !== color
      )
    );
  };

  const handleColorKeyDown = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      handleAddColor();
    }
  };

  // ===================================================
  // SIZE
  // ===================================================

  const handleAddSize = () => {
    const value = sizeInput.trim();

    if (!value) {
      return;
    }

    const exists = sizes.some(
      (size) =>
        size.toLowerCase() ===
        value.toLowerCase()
    );

    if (exists) {
      toast.error(
        "Size already added"
      );

      return;
    }

    setSizes((previous) => [
      ...previous,
      value,
    ]);

    setSizeInput("");
  };

  const handleRemoveSize = (
    size: string
  ) => {
    setSizes((previous) =>
      previous.filter(
        (item) => item !== size
      )
    );
  };

  const handleSizeKeyDown = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      handleAddSize();
    }
  };

  // ===================================================
  // MAIN IMAGE CHANGE
  // ===================================================

  const handleMainImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    console.log(
      "Selected MAIN file:",
      files[0]
    );

    mainImageActions.addFiles(files);

    // Allow selecting the same file again
    event.target.value = "";
  };

  // ===================================================
  // MAIN IMAGE DROP
  // ===================================================

  const handleMainDrop = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    const files =
      event.dataTransfer.files;

    if (!files || files.length === 0) {
      return;
    }

    console.log(
      "Dropped MAIN file:",
      files[0]
    );

    mainImageActions.addFiles(files);
  };

  // ===================================================
  // HOVER IMAGE CHANGE
  // ===================================================

  const handleHoverImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    console.log(
      "Selected HOVER file:",
      files[0]
    );

    hoverImageActions.addFiles(files);

    event.target.value = "";
  };

  // ===================================================
  // HOVER IMAGE DROP
  // ===================================================

  const handleHoverDrop = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    const files =
      event.dataTransfer.files;

    if (!files || files.length === 0) {
      return;
    }

    console.log(
      "Dropped HOVER file:",
      files[0]
    );

    hoverImageActions.addFiles(files);
  };

  // ===================================================
  // REMOVE NEW MAIN IMAGE
  // ===================================================

  const handleRemoveMainImage = () => {
    const selectedFile =
      mainImageState.files[0];

    if (!selectedFile) {
      return;
    }

    mainImageActions.removeFile(
      selectedFile.id
    );
  };

  // ===================================================
  // REMOVE NEW HOVER IMAGE
  // ===================================================

  const handleRemoveHoverImage = () => {
    const selectedFile =
      hoverImageState.files[0];

    if (!selectedFile) {
      return;
    }

    hoverImageActions.removeFile(
      selectedFile.id
    );
  };

  // ===================================================
  // GET REAL MAIN FILE
  // ===================================================

  const mainFile =
    mainImageState.files[0]?.file instanceof
    File
      ? mainImageState.files[0].file
      : null;

  // ===================================================
  // GET REAL HOVER FILE
  // ===================================================

  const hoverFile =
    hoverImageState.files[0]?.file instanceof
    File
      ? hoverImageState.files[0].file
      : null;

  // ===================================================
  // PREVIEW
  // ===================================================

  const mainPreview =
    mainImageState.files[0]?.preview ||
    oldMainImage;

  const hoverPreview =
    hoverImageState.files[0]?.preview ||
    oldHoverImage;

  // ===================================================
  // SUBMIT
  // ===================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // =================================================
    // PRODUCT ID
    // =================================================

    if (!productId) {
      toast.error(
        "Product ID is missing"
      );

      return;
    }

    // =================================================
    // VALIDATION
    // =================================================

    if (!name.trim()) {
      toast.error(
        "Product name is required"
      );

      return;
    }

    if (!slug.trim()) {
      toast.error(
        "Product slug is required"
      );

      return;
    }

    if (!category) {
      toast.error(
        "Product category is required"
      );

      return;
    }

    if (!description.trim()) {
      toast.error(
        "Product description is required"
      );

      return;
    }

    if (
      price.trim() === "" ||
      Number.isNaN(Number(price))
    ) {
      toast.error(
        "Valid product price is required"
      );

      return;
    }

    if (
      stock.trim() === "" ||
      Number.isNaN(Number(stock))
    ) {
      toast.error(
        "Valid product stock is required"
      );

      return;
    }

    // =================================================
    // OLD PRICE
    // =================================================

    let parsedOldPrice:
      | number
      | undefined;

    if (oldPrice.trim() !== "") {
      const value =
        Number(oldPrice);

      if (Number.isNaN(value)) {
        toast.error(
          "Old price must be a valid number"
        );

        return;
      }

      parsedOldPrice = value;
    }

    // =================================================
    // DEBUG FILES
    // =================================================

    console.log(
      "========================================"
    );

    console.log(
      "EDIT PRODUCT SUBMIT"
    );

    console.log(
      "Product ID:",
      productId
    );

    console.log(
      "MAIN FILE:",
      mainFile
    );

    console.log(
      "HOVER FILE:",
      hoverFile
    );

    if (mainFile) {
      console.log(
        "MAIN FILE NAME:",
        mainFile.name
      );

      console.log(
        "MAIN FILE TYPE:",
        mainFile.type
      );

      console.log(
        "MAIN FILE SIZE:",
        mainFile.size
      );
    }

    if (hoverFile) {
      console.log(
        "HOVER FILE NAME:",
        hoverFile.name
      );

      console.log(
        "HOVER FILE TYPE:",
        hoverFile.type
      );

      console.log(
        "HOVER FILE SIZE:",
        hoverFile.size
      );
    }

    console.log(
      "========================================"
    );

    // =================================================
    // CREATE PAYLOAD
    // =================================================

    const updatePayload: {
      id: string;

      name: string;

      slug: string;

      category: string;

      description: string;

      price: number;

      oldPrice?: number;

      colors: string[];

      sizes: string[];

      badge?: string;

      stock: number;

      isActive: boolean;

      main?: File;

      hover?: File;
    } = {
      id: productId,

      name: name.trim(),

      slug: slug.trim(),

      category,

      description:
        description.trim(),

      price: Number(price),

      oldPrice:
        parsedOldPrice,

      colors,

      sizes,

      badge:
        badge !== ""
          ? badge
          : undefined,

      stock: Number(stock),

      isActive,
    };

    // =================================================
    // IMPORTANT
    //
    // ONLY ADD FILE IF IT IS A REAL FILE
    // =================================================

    if (mainFile instanceof File) {
      updatePayload.main =
        mainFile;
    }

    if (
      hoverFile instanceof File
    ) {
      updatePayload.hover =
        hoverFile;
    }

    // =================================================
    // PAYLOAD DEBUG
    // =================================================

    console.log(
      "========== FINAL UPDATE PAYLOAD =========="
    );

    console.log(
      updatePayload
    );

    console.log(
      "Payload Main:",
      updatePayload.main
    );

    console.log(
      "Payload Hover:",
      updatePayload.hover
    );

    console.log(
      "=========================================="
    );

    // =================================================
    // API REQUEST
    // =================================================

    try {
      await updateProduct(
        updatePayload
      ).unwrap();

      // =================================================
      // SUCCESS
      // =================================================

      toast.success(
        "Product updated successfully"
      );

      // =================================================
      // REDIRECT
      // =================================================

      navigate(
        "/admin/products"
      );
    } catch (error) {
      console.error(
        "Update product error:",
        error
      );

      // =================================================
      // API ERROR MESSAGE
      // =================================================

      const apiError =
        error as {
          data?: {
            message?: string;
          };
        };

      const message =
        apiError?.data?.message ||
        "Failed to update product";

      toast.error(message);
    }
  };

  // ===================================================
  // NO PRODUCT ID
  // ===================================================

  if (!productId) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border bg-background p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <X className="h-7 w-7 text-destructive" />
          </div>

          <h2 className="text-xl font-bold">
            Product Not Selected
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Please select a product before
            editing.
          </p>

          <Button
            type="button"
            className="mt-6"
            onClick={() =>
              navigate(
                "/admin/all-products"
              )
            }
          >
            <ArrowLeft className="mr-2 h-4 w-4" />

            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  // ===================================================
  // LOADING
  // ===================================================

  if (isProductLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />

          <p className="text-sm text-muted-foreground">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (
    isProductError ||
    !product
  ) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border bg-background p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <X className="h-7 w-7 text-destructive" />
          </div>

          <h2 className="text-xl font-bold">
            Product Not Found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            We could not load this product.
          </p>

          <Button
            type="button"
            className="mt-6"
            onClick={() =>
              navigate(
                "/admin/all-products"
              )
            }
          >
            <ArrowLeft className="mr-2 h-4 w-4" />

            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  // ===================================================
  // MAIN UI
  // ===================================================

  return (
    <div className="min-h-screen bg-muted/20 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* ============================================= */}
        {/* HEADER */}
        {/* ============================================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Button
              type="button"
              variant="ghost"
              className="-ml-3 mb-2"
              onClick={() =>
                navigate(
                  "/admin/all-products"
                )
              }
            >
              <ArrowLeft className="mr-2 h-4 w-4" />

              Back to Products
            </Button>

            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Edit Product
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Update your product information
            </p>
          </div>
        </div>

        {/* ============================================= */}
        {/* FORM */}
        {/* ============================================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* =========================================== */}
          {/* BASIC INFORMATION */}
          {/* =========================================== */}

          <section className="rounded-2xl border bg-background p-5 shadow-sm md:p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Basic Information
              </h2>

              <p className="text-sm text-muted-foreground">
                Update product details
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* NAME */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Product Name
                </label>

                <Input
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  placeholder="Product name"
                />
              </div>

              {/* SLUG */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Slug
                </label>

                <Input
                  value={slug}
                  onChange={(event) =>
                    setSlug(
                      event.target.value
                    )
                  }
                  placeholder="product-slug"
                />
              </div>

              {/* CATEGORY */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value
                    )
                  }
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">
                    Select category
                  </option>

                  {categories.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* BADGE */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Badge
                </label>

                <select
                  value={badge}
                  onChange={(event) =>
                    setBadge(
                      event.target.value
                    )
                  }
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">
                    No Badge
                  </option>

                  {badges.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* DESCRIPTION */}

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">
                  Description
                </label>

                <Textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  placeholder="Product description..."
                  rows={5}
                />
              </div>
            </div>
          </section>

          {/* ============================================= */}
          {/* PRICING & INVENTORY */}
          {/* ============================================= */}

          <section className="rounded-2xl border bg-background p-5 shadow-sm md:p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Pricing & Inventory
              </h2>

              <p className="text-sm text-muted-foreground">
                Update price and stock
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">

              {/* PRICE */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Price
                </label>

                <Input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(event) =>
                    setPrice(
                      event.target.value
                    )
                  }
                  placeholder="0"
                />
              </div>

              {/* OLD PRICE */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Old Price
                </label>

                <Input
                  type="number"
                  min="0"
                  value={oldPrice}
                  onChange={(event) =>
                    setOldPrice(
                      event.target.value
                    )
                  }
                  placeholder="0"
                />
              </div>

              {/* STOCK */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Stock
                </label>

                <Input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(event) =>
                    setStock(
                      event.target.value
                    )
                  }
                  placeholder="0"
                />
              </div>
            </div>

            {/* ACTIVE */}

            <div className="mt-5 flex items-center gap-3 rounded-xl border p-4">
              <input
                id="product-active"
                type="checkbox"
                checked={isActive}
                onChange={(event) =>
                  setIsActive(
                    event.target.checked
                  )
                }
                className="h-4 w-4 rounded border"
              />

              <label
                htmlFor="product-active"
                className="cursor-pointer"
              >
                <p className="text-sm font-medium">
                  Product Active
                </p>

                <p className="text-xs text-muted-foreground">
                  Customers can see and purchase
                  this product.
                </p>
              </label>
            </div>
          </section>

          {/* ============================================= */}
          {/* COLORS & SIZES */}
          {/* ============================================= */}

          <div className="grid gap-6 lg:grid-cols-2">

            {/* COLORS */}

            <section className="rounded-2xl border bg-background p-5 shadow-sm md:p-6">
              <div className="mb-5">
                <h2 className="text-lg font-semibold">
                  Colors
                </h2>

                <p className="text-sm text-muted-foreground">
                  Manage available colors
                </p>
              </div>

              <div className="flex gap-2">
                <Input
                  value={colorInput}
                  onChange={(event) =>
                    setColorInput(
                      event.target.value
                    )
                  }
                  onKeyDown={
                    handleColorKeyDown
                  }
                  placeholder="e.g. Black"
                />

                <Button
                  type="button"
                  variant="outline"
                  onClick={
                    handleAddColor
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {colors.map(
                  (color) => (
                    <div
                      key={color}
                      className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm text-primary"
                    >
                      <span>
                        {color}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveColor(
                            color
                          )
                        }
                        className="rounded-full hover:bg-primary/20"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )
                )}

                {colors.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No colors added.
                  </p>
                )}
              </div>
            </section>

            {/* SIZES */}

            <section className="rounded-2xl border bg-background p-5 shadow-sm md:p-6">
              <div className="mb-5">
                <h2 className="text-lg font-semibold">
                  Sizes
                </h2>

                <p className="text-sm text-muted-foreground">
                  Manage available sizes
                </p>
              </div>

              <div className="flex gap-2">
                <Input
                  value={sizeInput}
                  onChange={(event) =>
                    setSizeInput(
                      event.target.value
                    )
                  }
                  onKeyDown={
                    handleSizeKeyDown
                  }
                  placeholder="e.g. XL"
                />

                <Button
                  type="button"
                  variant="outline"
                  onClick={
                    handleAddSize
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {sizes.map(
                  (size) => (
                    <div
                      key={size}
                      className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm text-primary"
                    >
                      <span>
                        {size}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveSize(
                            size
                          )
                        }
                        className="rounded-full hover:bg-primary/20"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )
                )}

                {sizes.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No sizes added.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* ============================================= */}
          {/* IMAGES */}
          {/* ============================================= */}

          <section className="rounded-2xl border bg-background p-5 shadow-sm md:p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Product Images
              </h2>

              <p className="text-sm text-muted-foreground">
                Upload a new image only when you
                want to replace the existing image.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">

              {/* ========================================= */}
              {/* MAIN IMAGE */}
              {/* ========================================= */}

              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Main Image
                </label>

                <div
                  onDragOver={(event) =>
                    event.preventDefault()
                  }
                  onDrop={
                    handleMainDrop
                  }
                  className="relative overflow-hidden rounded-2xl border-2 border-dashed bg-muted/20"
                >
                  {mainPreview ? (
                    <div className="relative aspect-square">

                      <img
                        src={mainPreview}
                        alt="Main product"
                        className="h-full w-full object-cover"
                      />

                      {/* REMOVE NEW IMAGE */}

                      {mainImageState.files
                        .length > 0 && (
                        <button
                          type="button"
                          onClick={
                            handleRemoveMainImage
                          }
                          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}

                      {/* CHANGE IMAGE */}

                      <label
                        htmlFor="main-image"
                        className="absolute bottom-3 left-3 cursor-pointer rounded-lg bg-black/70 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
                      >
                        Change Image
                      </label>
                    </div>
                  ) : (
                    <label
                      htmlFor="main-image"
                      className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-3"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <ImagePlus className="h-6 w-6 text-primary" />
                      </div>

                      <div className="text-center">
                        <p className="font-medium">
                          Upload Main Image
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Click or drag image here
                        </p>
                      </div>
                    </label>
                  )}

                  <input
                    id="main-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={
                      handleMainImageChange
                    }
                  />
                </div>

                {mainFile && (
                  <p className="text-xs font-medium text-green-600">
                    ✓ New main image selected:{" "}
                    {mainFile.name}
                  </p>
                )}

                {!mainFile &&
                  oldMainImage && (
                    <p className="text-xs text-muted-foreground">
                      Current image will remain unchanged.
                    </p>
                  )}
              </div>

              {/* ========================================= */}
              {/* HOVER IMAGE */}
              {/* ========================================= */}

              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Hover Image
                </label>

                <div
                  onDragOver={(event) =>
                    event.preventDefault()
                  }
                  onDrop={
                    handleHoverDrop
                  }
                  className="relative overflow-hidden rounded-2xl border-2 border-dashed bg-muted/20"
                >
                  {hoverPreview ? (
                    <div className="relative aspect-square">

                      <img
                        src={hoverPreview}
                        alt="Hover product"
                        className="h-full w-full object-cover"
                      />

                      {/* REMOVE NEW IMAGE */}

                      {hoverImageState.files
                        .length > 0 && (
                        <button
                          type="button"
                          onClick={
                            handleRemoveHoverImage
                          }
                          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}

                      {/* CHANGE IMAGE */}

                      <label
                        htmlFor="hover-image"
                        className="absolute bottom-3 left-3 cursor-pointer rounded-lg bg-black/70 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
                      >
                        Change Image
                      </label>
                    </div>
                  ) : (
                    <label
                      htmlFor="hover-image"
                      className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-3"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <ImagePlus className="h-6 w-6 text-primary" />
                      </div>

                      <div className="text-center">
                        <p className="font-medium">
                          Upload Hover Image
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Click or drag image here
                        </p>
                      </div>
                    </label>
                  )}

                  <input
                    id="hover-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={
                      handleHoverImageChange
                    }
                  />
                </div>

                {hoverFile && (
                  <p className="text-xs font-medium text-green-600">
                    ✓ New hover image selected:{" "}
                    {hoverFile.name}
                  </p>
                )}

                {!hoverFile &&
                  oldHoverImage && (
                    <p className="text-xs text-muted-foreground">
                      Current image will remain unchanged.
                    </p>
                  )}
              </div>
            </div>
          </section>

          {/* ============================================= */}
          {/* ACTION BUTTONS */}
          {/* ============================================= */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Button
              type="button"
              variant="outline"
              disabled={isUpdating}
              onClick={() =>
                navigate(
                  "/admin/all-products"
                )
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />

                  Update Product
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
