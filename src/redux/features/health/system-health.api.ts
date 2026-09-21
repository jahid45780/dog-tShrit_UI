import { baseApi } from "@/redux/baseApi";
import type { ISystemHealthResponse } from "@/types/health.types";


export const systemHealthApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSystemHealth: build.query<ISystemHealthResponse, void>({
      query: () => ({
        url: "/admin/system-health",
        method: "GET",
      }),

      providesTags: ["HEALTH"],
    }),

    
  }),
});

export const {
  useGetSystemHealthQuery,
} = systemHealthApi;