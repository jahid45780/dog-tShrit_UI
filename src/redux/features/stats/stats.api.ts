
import { baseApi } from "@/redux/baseApi";
import type { IUserStatsResponse } from "@/types/stats.types";


export const StatsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserStats: build.query<
      IUserStatsResponse,
      void
    >({
      query: () => ({
        url: "/stats/user",
        method: "GET",
      }),

      providesTags: ["BOOKING"],
    }),
  }),
});

export const {
  useGetUserStatsQuery,
} = StatsApi;