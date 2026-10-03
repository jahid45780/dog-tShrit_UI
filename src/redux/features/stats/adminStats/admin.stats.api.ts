import { baseApi } from "@/redux/baseApi";
import type {
  IAdminStats,
  IStatsResponse,
} from "@/types/admin.stats.types";

export const StatsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /* ==========================================
       ADMIN STATS
    ========================================== */

    getAdminStats: build.query<
      IStatsResponse<IAdminStats>,
      void
    >({
      query: () => ({
        url: "/stats/admin",
        method: "GET",
      }),

      providesTags: [
        "USER",
        "PRODUCT",
        "BOOKING",
      ],
    }),

    /* ==========================================
       ALL ORDERS
       GET /stats/orders?page=1&limit=10
    ========================================== */

    getAllOrders: build.query<
      any,
      {
        page?: number;
        limit?: number;
      }
    >({
      query: ({
        page = 1,
        limit = 10,
      }) => ({
        url: "/stats/orders",
        method: "GET",
        params: {
          page,
          limit,
        },
      }),

      providesTags: ["BOOKING"],
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetAllOrdersQuery,
} = StatsApi;