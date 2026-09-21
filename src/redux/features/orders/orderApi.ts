
import { baseApi } from "@/redux/baseApi";
import type { IOrdersQuery, IOrdersResponse } from "@/types/user.types";


export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<
      IOrdersResponse,
      IOrdersQuery
    >({
      query: ({ page, limit }) => ({
        url: `/stats/orders?page=${page}&limit=${limit}`,
        method: "GET",
      }),

      providesTags: ["ORDER"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
} = orderApi;

