import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import getHostname from "@/src/apiService/getHostname";
import LocalStorageUtils from "@/src/apiService/LocalStorageUtils";
import { deleteCookie, getCookie } from "cookies-next";

interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
}

interface ErrorResponse {
  message?: string;
  response?: {
    data?: any;
    status?: number;
    statusText?: string;
    headers?: any;
    config?: AxiosRequestConfig;
  };
}

interface AuthenticatedCallParams {
  method: "GET" | "POST" | "PUT" | "DELETE" | "BLOB" | "FILE";
  url: string;
  query?: Record<string, any>;
  data?: Record<string, any> | FormData;
  cacheTime?: number;
  forceRefresh?: boolean;
}

const handleUnauthorized = (error: ErrorResponse): void => {
  if (
    error?.message?.includes("401") ||
    error?.response?.data?.message === "unauthorized"
  ) {
    // Clear local storage
    LocalStorageUtils.removeItem("token");
    LocalStorageUtils.removeItem("usertype");
    LocalStorageUtils.removeItem("user");

    // Clear cookies
    deleteCookie("token");
    deleteCookie("usertype");

    // Redirect to home
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }
};

const AuthenticatedCall = async <T = any,>({
  method,
  url,
  query = {},
  data = {},
  cacheTime = 0,
  forceRefresh = false,
}: AuthenticatedCallParams): Promise<ApiResponse<T>> => {
  const gethost = getHostname();
  const token = getCookie("token");

  // Add hostname to request if needed

  // Construct URL with query parameters
  const queryParams = new URLSearchParams(query).toString();
  const fullUrl =
    gethost.backendurl + url + (queryParams ? `?${queryParams}` : "");

  // Common headers
  const commonHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Configuration based on method
  let config: AxiosRequestConfig = { headers: commonHeaders };

  try {
    let response: AxiosResponse<T>;

    switch (method.toUpperCase()) {
      case "GET":
        response = await axios.get<T>(fullUrl, config);
        break;
      case "BLOB":
        response = await axios.get<T>(fullUrl, {
          ...config,
          responseType: "blob",
        });
        break;
      case "DELETE":
        response = await axios.delete<T>(fullUrl, config);
        break;
      case "PUT":
        response = await axios.put<T>(fullUrl, data, config);
        break;
      case "POST":
        response = await axios.post<T>(fullUrl, data, config);
        break;
      case "FILE":
        const fileHeaders = {
          ...commonHeaders,
          "Content-Type": "multipart/form-data",
        };
        response = await axios.post<T>(fullUrl, data, { headers: fileHeaders });
        break;
      default:
        throw new Error("Invalid method");
    }

    // Check for unauthorized response
    if (
      response.data &&
      typeof response.data === "object" &&
      "status" in response.data &&
      "message" in response.data &&
      response.data.status === false &&
      response.data.message === "unauthorized"
    ) {
      handleUnauthorized({ response });
      throw new Error("Unauthorized");
    }

    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    handleUnauthorized(axiosError);
    throw axiosError.response || axiosError;
  }
};

export default AuthenticatedCall;
