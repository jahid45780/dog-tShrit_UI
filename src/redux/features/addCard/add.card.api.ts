import { baseApi } from "@/redux/baseApi";
import type { IAddToCartPayload, ICartResponse, IUpdateCartPayload } from "@/types";



export const CartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // =========================
    // ADD TO CART
    // =========================
    addToCart: build.mutation<
      any,
      IAddToCartPayload
    >({
      query: (cartInfo) => ({
        url: "/card/add-card",
        method: "POST",
        data: cartInfo,
      }),

      invalidatesTags: ["CART"],
    }),

    // =========================
    // GET MY CART
    // =========================
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

    // =========================
    // UPDATE QUANTITY
    // =========================
    updateCartItem: build.mutation<
      any,
      IUpdateCartPayload
    >({
      query: ({ itemId, quantity }) => ({
        url: `/card/update-item/${itemId}`,
        method: "PATCH",
        data: {
          quantity,
        },
      }),

      invalidatesTags: ["CART"],
    }),

    // =========================
    // REMOVE ITEM
    // =========================
    removeCartItem: build.mutation<
      any,
      string
    >({
      query: (itemId) => ({
        url: `/card/remove-item/${itemId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["CART"],
    }),

    // =========================
    // CLEAR CART
    // =========================
    clearCart: build.mutation<
      any,
      void
    >({
      query: () => ({
        url: "/card/clear-cart",
        method: "DELETE",
      }),

      invalidatesTags: ["CART"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetMyCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = CartApi;