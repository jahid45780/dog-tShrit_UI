import { baseApi } from "@/redux/baseApi";

import type {
  IAddToCartPayload,
  ICartResponse,
  IUpdateCartPayload,
} from "@/types";

export const CartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ========================================
    // ADD TO CART
    // Guest + Logged In
    // ========================================
    addToCart: build.mutation<
      ICartResponse,
      IAddToCartPayload
    >({
      query: (cartInfo) => ({
        url: "/card/add-card",
        method: "POST",
        data: cartInfo,
      }),

      invalidatesTags: ["CART"],
    }),

    // ========================================
    // GET CART
    // Guest + Logged In
    // ========================================
    getMyCart: build.query<
      ICartResponse,
      void
    >({
      query: () => ({
        url: "/card/my-cart",
        method: "GET",
      }),

      providesTags: ["CART"],
    }),

    // ========================================
    // UPDATE CART ITEM
    // ========================================
    updateCartItem: build.mutation<
      ICartResponse,
      IUpdateCartPayload
    >({
      query: ({
        itemId,
        quantity,
      }) => ({
        url: `/card/update-item/${itemId}`,
        method: "PATCH",
        data: {
          quantity,
        },
      }),

      invalidatesTags: ["CART"],
    }),

    // ========================================
    // REMOVE CART ITEM
    // ========================================
    removeCartItem: build.mutation<
      ICartResponse,
      string
    >({
      query: (itemId) => ({
        url: `/card/remove-item/${itemId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["CART"],
    }),

    // ========================================
    // CLEAR CART
    // ========================================
    clearCart: build.mutation<
      ICartResponse,
      void
    >({
      query: () => ({
        url: "/card/clear-cart",
        method: "DELETE",
      }),

      invalidatesTags: ["CART"],
    }),

    // ========================================
    // MERGE GUEST CART AFTER LOGIN
    // ========================================
    mergeGuestCart: build.mutation<
      ICartResponse,
      void
    >({
      query: () => ({
        url: "/card/merge-guest-cart",
        method: "POST",
      }),

      invalidatesTags: ["CART", "USER"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetMyCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  useMergeGuestCartMutation,
} = CartApi;