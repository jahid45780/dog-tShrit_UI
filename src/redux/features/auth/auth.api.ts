import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { ILogin, IUpdateProfilePayload } from "@/types/auth.types";





 export const authApi = baseApi.injectEndpoints({
    endpoints:(build)=>({

           register:build.mutation({
            query:(userInfo)=>({
                url:"/user/register",
                method:"POST",
                data:userInfo
            })
        }),

     updateProfile: build.mutation<
      any,
      {
        userId: string;
        data: IUpdateProfilePayload;
      }
    >({
      query: ({ userId, data }) => ({
        url: `/user/${userId}`,
        method: "PATCH",
        data,
      }),

      invalidatesTags: ["USER"],
    }),

        login:build.mutation<IResponse<null>, ILogin>({
            query:(userInfo)=>({
                url:"/auth/login",
                method:"POST",
                data:userInfo
            }),
             invalidatesTags: ["USER"],
        }),
      

        logout:build.mutation({
            query:()=>({
                url:"/auth/logout",
                method:"POST",    
            }),
            invalidatesTags: ["USER"],
        }),

          userInfo:build.query({
            query:()=>({
                url:"/user/me",
                method:"GET"
            }),
       providesTags: ["USER"],
        })

  
    })
})

export const {  
    useLoginMutation, 
    useRegisterMutation, 
    useLogoutMutation,
     useUserInfoQuery,
     useUpdateProfileMutation
    
    } = authApi