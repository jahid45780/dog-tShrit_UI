
import { baseApi } from "@/redux/baseApi";

import type {
  ITrackingResponse,
  IUpdateTrackingSettings,
} from "@/types/tracking.types";

export const trackingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminTrackingSettings: builder.query<
      ITrackingResponse,
      void
    >({
      query: () => ({
        url: "/tracking/admin",
        method: "GET",
      }),
      providesTags: ["TRACKING"],
    }),

    getPublicTrackingSettings: builder.query<
      ITrackingResponse,
      void
    >({
      query: () => ({
        url: "/tracking/public",
        method: "GET",
      }),
      providesTags: ["TRACKING"],
    }),

    updateTrackingSettings: builder.mutation<
      ITrackingResponse,
      IUpdateTrackingSettings
    >({
      query: (data) => ({
        url: "/tracking/admin",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["TRACKING"],
    }),
  }),
});

export const {
  useGetAdminTrackingSettingsQuery,
  useGetPublicTrackingSettingsQuery,
  useUpdateTrackingSettingsMutation,
} = trackingApi;
