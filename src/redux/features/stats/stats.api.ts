
import { baseApi } from "@/redux/baseApi";



export const StatsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
  getUserStats: build.query<any, void>({
  query: () => ({
    url: "/stats/user",
    method: "GET",
  }),
  providesTags: ["USER"],
}),
  }),
});

export const {
  useGetUserStatsQuery,
} = StatsApi;