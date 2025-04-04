import AxiosApi from "../../server/axiosConfig";
import { ENDPOINTS } from "@/server/endpoints";

interface LoginRequest {
  emailId: string;
  password: string;
}

interface LoginResponse {
  message: string;
  customerNumber?: number;
}

export const loginUser = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const response = await AxiosApi.post<LoginResponse>(
      `${import.meta.env.VITE_SERVER_BASE_URL}${ENDPOINTS.LOGIN}`,
      credentials,
    );
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login request failed");
  }
};

// export const getOrder = async (): Promise<LoginResponse> => {
//   const hed = {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   };
//   try {
//     const response = await AxiosApi.get<LoginResponse>(
//       "/api/web-bff/orders?customerId=616",
//       {
//         headers: hed,
//       },
//     );
//     return response.data;
//   } catch (error: any) {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     console.error(
//       "Login failed:",
//       error,
//       error.response?.data || error.message,
//     );
//     throw new Error(error.response?.data?.message || "Login request failed");
//   }
// };
