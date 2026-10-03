import type { IProduct } from "@/types";


export interface IGuestCartItem {
  _id: string;
  product: IProduct;
  quantity: number;
  color?: string;
  size?: string;
}

const CART_KEY = "atnamira_guest_cart";

export const getGuestCart = (): IGuestCartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

export const saveGuestCart = (items: IGuestCartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("guest-cart-updated"));
};

export const clearGuestCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("guest-cart-updated"));
};

export const addGuestCartItem = (
  product: IProduct,
  quantity: number,
  color?: string,
  size?: string
) => {
  const cart = getGuestCart();

  const existingIndex = cart.findIndex(
    (item) =>
      item.product._id === product._id &&
      item.color === color &&
      item.size === size
  );

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      _id: `${product._id}-${color ?? ""}-${size ?? ""}`,
      product,
      quantity,
      color,
      size,
    });
  }

  saveGuestCart(cart);
};