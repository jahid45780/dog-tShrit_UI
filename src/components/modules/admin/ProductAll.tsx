import { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Package,
  Plus,
  Search,
  ShoppingBag,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "@/redux/features/product/product.api";

import ProductTable from "./ProductTable";
import { Link } from "react-router-dom";

const ProductAll = () => {
  // ==========================================
  // Pagination State
  // ==========================================
  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  // ==========================================
  // Search State
  // ==========================================
  const [search, setSearch] = useState("");

  const [deletingId, setDeletingId] = useState<string | null>(
    null
  );

  // ==========================================
  // Get All Products
  // ==========================================
  const {
    data,
    isLoading,
    isFetching,
  } = useGetAllProductQuery({
    search,
    category: "All",
    sort: "newest",
    page,
    limit,
  });

  // ==========================================
  // Delete Product
  // ==========================================
  const [deleteProduct] = useDeleteProductMutation();

  // ==========================================
  // Product Data
  // ==========================================
  const products = data?.data ?? [];

  const totalProducts = data?.meta?.total ?? 0;

  const totalPages = data?.meta?.totalPage ?? 1;

  // ==========================================
  // Delete Handler
  // ==========================================
  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);

      await deleteProduct(id).unwrap();

      toast.success("Product deleted successfully");

      // যদি শেষ page-এর শেষ product delete করা হয়
      if (products.length === 1 && page > 1) {
        setPage((previousPage) => previousPage - 1);
      }
    } catch (error) {
      console.error("Delete product error:", error);

      toast.error("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // Search Handler
  // ==========================================
  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);

    // Search করলে প্রথম page-এ চলে যাবে
    setPage(1);
  };

  // ==========================================
  // Previous Page
  // ==========================================
  const handlePrevious = () => {
    if (page > 1) {
      setPage((previousPage) => previousPage - 1);
    }
  };

  // ==========================================
  // Next Page
  // ==========================================
  const handleNext = () => {
    if (page < totalPages) {
      setPage((previousPage) => previousPage + 1);
    }
  };

  // ==========================================
  // Page Change
  // ==========================================
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  // ==========================================
  // Limit Change
  // ==========================================
  const handleLimitChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLimit(Number(event.target.value));
    setPage(1);
  };

  // ==========================================
  // Page Numbers
  // ==========================================
  const getPageNumbers = () => {
    const pages: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="min-h-screen space-y-6 p-4 md:p-6 lg:p-8">
      {/* ================================================= */}
      {/* Header */}
      {/* ================================================= */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              All Products
            </h1>

            <p className="text-sm text-muted-foreground">
              Manage your store products
            </p>
          </div>
        </div>
           
           <Link to={"/admin/add-product"} >
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
        </Link>
      </div>

      {/* ================================================= */}
      {/* Stats */}
      {/* ================================================= */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Total Products */}
        <div className="rounded-2xl border bg-background p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Products
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalProducts}
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Products in your store
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        {/* Current Page */}
        <div className="rounded-2xl border bg-background p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Current Page
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {page}
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* Search + Limit */}
      {/* ================================================= */}
      <div className="rounded-2xl border bg-background p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={handleSearch}
              placeholder="Search product..."
              className="h-10 pl-9"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="whitespace-nowrap text-sm text-muted-foreground">
              Show
            </span>

            <select
              value={limit}
              onChange={handleLimitChange}
              className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>

            <span className="whitespace-nowrap text-sm text-muted-foreground">
              per page
            </span>

            {isFetching && !isLoading && (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            )}
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* Product Table */}
      {/* ================================================= */}
      {isLoading ? (
        <div className="flex min-h-[350px] items-center justify-center rounded-2xl border bg-background shadow-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />

            <p className="text-sm text-muted-foreground">
              Loading products...
            </p>
          </div>
        </div>
      ) : (
        <ProductTable
          products={products}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      )}

      {/* ================================================= */}
      {/* Pagination */}
      {/* ================================================= */}
      {!isLoading && totalPages > 0 && (
        <div className="flex flex-col gap-4 rounded-2xl border bg-background p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          {/* Showing */}
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {products.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {totalProducts}
            </span>{" "}
            products
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1">
            {/* Previous */}
            <Button
              variant="outline"
              size="icon"
              disabled={page === 1 || isFetching}
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((pageNumber) => (
                <Button
                  key={pageNumber}
                  variant={
                    page === pageNumber
                      ? "default"
                      : "outline"
                  }
                  size="icon"
                  disabled={isFetching}
                  onClick={() =>
                    handlePageChange(pageNumber)
                  }
                >
                  {pageNumber}
                </Button>
              ))}
            </div>

            {/* Next */}
            <Button
              variant="outline"
              size="icon"
              disabled={
                page === totalPages || isFetching
              }
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAll;