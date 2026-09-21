import { useState } from "react";

import {
  Boxes,
  DollarSign,
  MoreHorizontal,
  Package,
  Tag,
  Trash2,
} from "lucide-react";

import type { IProduct } from "@/types";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ProductTableProps {
  products: IProduct[];
  onDelete: (id: string) => void;
  deletingId: string | null;
}

const ProductTable = ({
  products,
  onDelete,
  deletingId,
}: ProductTableProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const selectedProduct = products.find(
    (product) => product._id === deleteId
  );

  return (
    <>
      <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            {/* ================= Table Header ================= */}
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="min-w-[300px]">
                  Product
                </TableHead>

                <TableHead>Category</TableHead>

                <TableHead>Price</TableHead>

                <TableHead>Stock</TableHead>

                <TableHead>Badge</TableHead>

                <TableHead className="text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* ================= Table Body ================= */}
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-40 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <Package className="h-10 w-10" />

                      <p className="font-medium">
                        No products found
                      </p>

                      <p className="text-sm">
                        Try adding a new product.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow
                    key={product._id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {/* ================= Product ================= */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {/* Image */}
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border bg-muted">
                          {product.images?.main ? (
                            <img
                              src={product.images.main}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <Package className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="min-w-0">
                          <p className="max-w-[240px] truncate font-semibold">
                            {product.name}
                          </p>

                          <p className="mt-1 max-w-[240px] truncate text-xs text-muted-foreground">
                            {product.slug}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* ================= Category ================= */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />

                        <span className="whitespace-nowrap text-sm">
                          {product.category}
                        </span>
                      </div>
                    </TableCell>

                    {/* ================= Price ================= */}
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />

                        <div>
                          <p className="font-semibold">
                            ${product.price}
                          </p>

                          {product.oldPrice && (
                            <p className="text-xs text-muted-foreground line-through">
                              ${product.oldPrice}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* ================= Stock ================= */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Boxes className="h-4 w-4 text-muted-foreground" />

                        <span
                          className={
                            product.stock <= 5
                              ? "font-semibold text-destructive"
                              : "font-medium"
                          }
                        >
                          {product.stock}
                        </span>
                      </div>
                    </TableCell>

                    {/* ================= Badge ================= */}
                    <TableCell>
                      {product.badge ? (
                        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {product.badge}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          —
                        </span>
                      )}
                    </TableCell>

                    {/* ================= Action ================= */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="cursor-pointer text-destructive focus:text-destructive"
                            onClick={() =>
                              setDeleteId(product._id)
                            }
                          >
                            <Trash2 className="mr-2 h-4 w-4" />

                            Delete Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ================= Delete Confirmation ================= */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Product?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {selectedProduct?.name}
              </span>
              ?
              <br />
              <span className="mt-2 block">
                This action cannot be undone.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={deletingId === deleteId}
              onClick={() => {
                if (deleteId) {
                  onDelete(deleteId);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletingId === deleteId
                ? "Deleting..."
                : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductTable;