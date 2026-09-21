import { baseApi } from "@/redux/baseApi"
import type { IProduct, IProductResponse } from "@/types";



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


  GetAllProduct: build.query<
  IProductResponse,
  {
    search?: string;
    category?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }

>({
  query: ({
    search = "",
    category = "All",
    sort = "newest",
    page = 1,
    limit = 12,
  }) => ({
    url: "/product/get-all-product",
    method: "GET",

    params: {
      search,
      category,
      sort,
      page,
      limit,
    },
  }),

  providesTags: ["PRODUCT"],
}),


 
GetSingleProduct: build.query<
  {
    data: IProduct;
  },
  string
>({
  query: (id) => ({
    url: `/product/${id}`,
    method: "GET",
  }),
  providesTags: ["PRODUCT"],
}),


  DeleteProduct: build.mutation<
      {
        data: IProduct;
      },
      string
    >({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["PRODUCT"],
    }),

 
          
    })
})

export const { 
  useProductCreateMutation,
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useDeleteProductMutation
} = ProductApi