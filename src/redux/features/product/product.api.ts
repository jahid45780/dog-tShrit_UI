import { baseApi } from "@/redux/baseApi"
import type { IProduct, IProductResponse } from "@/types";
import type { IUpdateProductPayload } from "@/types/productUpload.types";



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
    badge?: string;
    page?: number;
    limit?: number;
  }

>({
  query: ({
    search = "",
    category = "All",
    sort = "newest",
    badge = "Trending",
    page = 1,
    limit = 12,
  }) => ({
    url: "/product/get-all-product",
    method: "GET",

    params: {
      search,
      category,
      badge,
      sort,
      page,
      limit,
    },
  }),

  providesTags: ["PRODUCT"],
}),


GetBestSellingToday: build.query<IProductResponse, void>({
  query: () => ({
    url: "/product/getBestSellingToday",
    method: "GET",
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


    // update product

updateProduct: build.mutation<
  any,
  IUpdateProductPayload
>({
  query: ({
    id,
    name,
    slug,
    category,
    description,
    price,
    oldPrice,
    colors,
    sizes,
    badge,
    stock,
    isActive,
    main,
    hover,
  }) => {
    const formData = new FormData();

    // =========================
    // TEXT
    // =========================

    if (name !== undefined) {
      formData.append("name", name);
    }

    if (slug !== undefined) {
      formData.append("slug", slug);
    }

    if (category !== undefined) {
      formData.append(
        "category",
        category
      );
    }

    if (description !== undefined) {
      formData.append(
        "description",
        description
      );
    }

    // =========================
    // NUMBER
    // =========================

    if (price !== undefined) {
      formData.append(
        "price",
        String(price)
      );
    }

    if (oldPrice !== undefined) {
      formData.append(
        "oldPrice",
        String(oldPrice)
      );
    }

    if (stock !== undefined) {
      formData.append(
        "stock",
        String(stock)
      );
    }

    // =========================
    // BADGE
    // =========================

    if (badge !== undefined) {
      formData.append(
        "badge",
        badge
      );
    }

    // =========================
    // ACTIVE
    // =========================

    if (isActive !== undefined) {
      formData.append(
        "isActive",
        String(isActive)
      );
    }

    // =========================
    // COLORS
    // =========================

    if (colors !== undefined) {
      formData.append(
        "colors",
        JSON.stringify(colors)
      );
    }

    // =========================
    // SIZES
    // =========================

    if (sizes !== undefined) {
      formData.append(
        "sizes",
        JSON.stringify(sizes)
      );
    }

    // =========================
    // MAIN IMAGE
    // =========================

    if (main instanceof File) {
      console.log(
        "Appending MAIN image:",
        main.name,
        main.type,
        main.size
      );

      formData.append(
        "main",
        main,
        main.name
      );
    }

    // =========================
    // HOVER IMAGE
    // =========================

    if (hover instanceof File) {
      console.log(
        "Appending HOVER image:",
        hover.name,
        hover.type,
        hover.size
      );

      formData.append(
        "hover",
        hover,
        hover.name
      );
    }

    // =========================
    // DEBUG
    // =========================

    console.log(
      "========== PRODUCT FORMDATA =========="
    );

    for (
      const [key, value]
      of formData.entries()
    ) {
      if (value instanceof File) {
        console.log(
          `${key}: FILE`,
          value.name,
          value.type,
          value.size
        );
      } else {
        console.log(
          `${key}:`,
          value
        );
      }
    }

    console.log(
      "======================================"
    );

    return {
      url: `/product/${id}`,
      method: "PATCH",
      data: formData,
    };
  },

  invalidatesTags: ["PRODUCT"],
}),
 
          
    })
})

export const { 
  useProductCreateMutation,
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useGetBestSellingTodayQuery,
  useUpdateProductMutation
} = ProductApi