
import { baseApi } from "@/redux/baseApi";
import type { IOrdersQuery, IOrdersResponse } from "@/types/user.types";


export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
 getAllOrders: builder.query<
  IOrdersResponse,
  IOrdersQuery
>({
  query: ({
    page,
    limit,
    search,
    paymentStatus,
    bookingStatus,
  }) => {
    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("limit", String(limit));

    if (search?.trim()) {
      params.set("search", search.trim());
    }

    if (paymentStatus && paymentStatus !== "ALL") {
      params.set("paymentStatus", paymentStatus);
    }

    if (bookingStatus && bookingStatus !== "ALL") {
      params.set("bookingStatus", bookingStatus);
    }

    return {
      url: `/stats/orders?${params.toString()}`,
      method: "GET",
    };
  },

  providesTags: ["ORDER"],
}),
  }),
});

export const {
  useGetAllOrdersQuery,
} = orderApi;

