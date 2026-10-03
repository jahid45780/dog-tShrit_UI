import { baseApi } from "@/redux/baseApi";

/* =========================================================
   TYPES
========================================================= */

export interface IBusinessHours {
  mondayFriday: string;
  saturday: string;
  sunday: string;
  timezone: string;
}

export interface IContact {
  _id?: string;

  locationName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;

  phone: string;
  email: string;

  mapUrl: string;

  businessHours: IBusinessHours;

  createdAt?: string;
  updatedAt?: string;
}

export interface IContactResponse {
  success: boolean;
  message: string;
  data: IContact;
}

/* =========================================================
   CONTACT API
========================================================= */

export const ContactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /* =====================================================
       GET CONTACT
       Public API
    ===================================================== */

    getContact: build.query<IContactResponse, void>({
      query: () => ({
        url: "/contact",
        method: "GET",
      }),

      providesTags: ["CONTACT"],
    }),

    /* =====================================================
       CREATE CONTACT
       ADMIN ONLY
    ===================================================== */

    createContact: build.mutation<IContactResponse, IContact>({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        data,
      }),

      invalidatesTags: ["CONTACT"],
    }),

    /* =====================================================
       UPDATE CONTACT
       ADMIN ONLY
    ===================================================== */

    updateContact: build.mutation<
      IContactResponse,
      Partial<IContact>
    >({
      query: (data) => ({
        url: "/contact",
        method: "PATCH",
        data,
      }),

      invalidatesTags: ["CONTACT"],
    }),
  }),

  overrideExisting: false,
});

/* =========================================================
   HOOKS
========================================================= */

export const {
  useGetContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
} = ContactApi;