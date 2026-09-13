import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { ILogin } from "@/types/auth.types";





 export const authApi = baseApi.injectEndpoints({
    endpoints:(build)=>({

           register:build.mutation({
            query:(userInfo)=>({
                url:"/user/register",
                method:"POST",
                data:userInfo
            })
        }),

        login:build.mutation<IResponse<null>, ILogin>({
            query:(userInfo)=>({
                url:"/auth/login",
                method:"POST",
                data:userInfo
            })
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

export const {  useLoginMutation, useRegisterMutation, useLogoutMutation, useUserInfoQuery} = authApi