
import { baseApi } from "@/redux/baseApi";
import type { IBookingStats, IPaymentStats, IProductStats, IStatsResponse, IUserOverviewStats } from "@/types/admin.stats.types";


/* =========================================================
   STATS API
========================================================= */

export const StatsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    /* ==========================================
       USER OVERVIEW
    ========================================== */

    getUserOverviewStats:
      build.query<
        IStatsResponse<IUserOverviewStats>,
        void
      >({
        query: () => ({
          url: "/stats/user-overview",
          method: "GET",
        }),

        providesTags: ["USER"],
      }),


    /* ==========================================
       PRODUCT STATS
    ========================================== */

    getProductStats:
      build.query<
        IStatsResponse<IProductStats>,
        void
      >({
        query: () => ({
          url: "/stats/product",
          method: "GET",
        }),

        providesTags: ["PRODUCT"],
      }),


    /* ==========================================
       BOOKING STATS
    ========================================== */

    getBookingStats:
      build.query<
        IStatsResponse<IBookingStats>,
        void
      >({
        query: () => ({
          url: "/stats/booking",
          method: "GET",
        }),

        providesTags: ["BOOKING"],
      }),


    /* ==========================================
       PAYMENT STATS
    ========================================== */

    getPaymentStats:
      build.query<
        IStatsResponse<IPaymentStats>,
        void
      >({
        query: () => ({
          url: "/stats/payment",
          method: "GET",
        }),

        providesTags: ["BOOKING"],
      }),

  }),
});


/* =========================================================
   HOOKS
========================================================= */

export const {
  useGetUserOverviewStatsQuery,
  useGetProductStatsQuery,
  useGetBookingStatsQuery,
  useGetPaymentStatsQuery,
} = StatsApi;