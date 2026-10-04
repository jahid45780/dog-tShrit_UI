
import axios, {
  type AxiosError,
  type AxiosRequestConfig,
} from "axios";

interface AxiosBaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: unknown;
  params?: unknown;
  headers?: AxiosRequestConfig["headers"];
}

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api/v1",

  // IMPORTANT:
  // Send cookies such as:
  // - guestCartId
  // - AccessToken
  // - RefreshToken
  withCredentials: true,
});

const axiosBaseQuery =
  () =>
  async ({
    url,
    method = "GET",
    data,
    params,
    headers,
  }: AxiosBaseQueryArgs) => {
    try {
      // ==========================================
      // CHECK WHETHER REQUEST BODY IS FORMDATA
      // ==========================================

      const isFormData =
        typeof FormData !== "undefined" &&
        data instanceof FormData;

      // ==========================================
      // REQUEST CONFIG
      // ==========================================

      const requestConfig: AxiosRequestConfig = {
        url,
        method,
        data,
        params,

        // IMPORTANT:
        // Keep cookies enabled for every request.
        withCredentials: true,

        headers: isFormData
          ? {
              // ==================================
              // FORMDATA REQUEST
              // ==================================
              //
              // DO NOT set Content-Type here.
              //
              // Browser/Axios automatically creates:
              //
              // multipart/form-data;
              // boundary=----------------...
              //
              // This is required by Multer.
              ...headers,
            }
          : {
              // ==================================
              // NORMAL JSON REQUEST
              // ==================================

              "Content-Type": "application/json",

              ...headers,
            },
      };

      // ==========================================
      // DEBUG
      // ==========================================

      if (import.meta.env.DEV) {
        console.log("========== AXIOS REQUEST ==========");
        console.log("URL:", url);
        console.log("METHOD:", method);
        console.log(
          "TYPE:",
          isFormData ? "FORMDATA" : "JSON"
        );

        if (isFormData && data instanceof FormData) {
          console.log("FORMDATA CONTENT:");

          for (const [key, value] of data.entries()) {
            if (value instanceof File) {
              console.log(
                `${key}: FILE`,
                value.name,
                value.type,
                value.size
              );
            } else {
              console.log(`${key}:`, value);
            }
          }
        }

        console.log("==================================");
      }

      // ==========================================
      // AXIOS REQUEST
      // ==========================================

      const result = await axiosInstance(
        requestConfig
      );

      return {
        data: result.data,
      };
    } catch (axiosError) {
      const error = axiosError as AxiosError;

      return {
        error: {
          status: error.response?.status || 500,

          data:
            error.response?.data || {
              success: false,
              message:
                error.message ||
                "Something went wrong",
            },
        },
      };
    }
  };

export default axiosBaseQuery;
