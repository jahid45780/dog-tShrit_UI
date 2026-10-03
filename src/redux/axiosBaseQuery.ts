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
  // Send cookies such as guestCartId,
  // AccessToken and RefreshToken
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
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
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
        withCredentials: true,
      });

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