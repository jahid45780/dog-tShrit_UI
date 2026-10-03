

import { baseApi } from "@/redux/baseApi";
import type { IBooking, ICreateCheckoutPayload } from "@/types";



export const BookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // =====================================
    // CREATE BOOKING
    // =====================================

   createBooking: build.mutation<
      any,
      ICreateCheckoutPayload
    >({
      query: (bookingInfo) => ({
        url: "/booking/checkout",
        method: "POST",
        data: bookingInfo,
      }),
      invalidatesTags: ["BOOKING", "CART"],
    }),
  

    // =====================================
    // GET MY BOOKINGS
    // =====================================

    getMyBookings: build.query<
      {
        success: boolean;
        message: string;
        data: IBooking[];
      },
      void
    >({
      query: () => ({
        url: "/booking/my-bookings",
        method: "GET",
      }),

      providesTags: ["BOOKING"],
    }),

    // =====================================
    // GET SINGLE BOOKING
    // =====================================

    getBookingById: build.query<
      {
        success: boolean;
        message: string;
        data: IBooking;
      },
      string
    >({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "GET",
      }),

      providesTags: ["BOOKING"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useGetBookingByIdQuery,
} = BookingApi;