
import { baseApi } from "@/redux/baseApi";
import type { ISeoAuditResponse } from "@/types/seo.types";

export const seoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    auditSeoPage: builder.mutation<
      ISeoAuditResponse,
      { url: string }
    >({
      query: (body) => ({
        url: "/seo/audit",
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const {
  useAuditSeoPageMutation,
} = seoApi;
