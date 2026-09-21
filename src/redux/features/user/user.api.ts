import { baseApi } from "@/redux/baseApi";




export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    
    getaLLUserAdmin: build.query({
      query: () => ({
        url: "/user/get-all-users",
        method: "GET",
      }),

      providesTags: ["USER"],
    }),


     // =========================
    // MAKE ADMIN
    // =========================
    makeAdmin: build.mutation({
      query: (userId: string) => ({
        url: `/user/${userId}/make-admin`,
        method: "PATCH",
      }),

      invalidatesTags: ["USER"],
    }),

    // =========================
    // MAKE USER
    // =========================
    makeUser: build.mutation({
      query: (userId: string) => ({
        url: `/user/${userId}/make-user`,
        method: "PATCH",
      }),

      invalidatesTags: ["USER"],
    }),

    // =========================
    // DELETE USER
    // =========================
    deleteUser: build.mutation({
      query: (userId: string) => ({
        url: `/user/${userId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["USER"],
    }),



  }),
});

export const 
{ 

  useGetaLLUserAdminQuery,
  useMakeAdminMutation,
  useMakeUserMutation,
  useDeleteUserMutation,

 } = userApi;