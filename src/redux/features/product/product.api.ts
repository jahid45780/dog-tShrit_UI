import { baseApi } from "@/redux/baseApi"



export const ProductApi = baseApi.injectEndpoints({
    endpoints:(build)=>({
     

ProductCreate: build.mutation({
  query: (formData) => ({
    url: "/product/create-product",
    method: "POST",
    data: formData,
  }),
  invalidatesTags: ["PRODUCT"],
}),

          
    })
})

export const { 
  useProductCreateMutation
} = ProductApi