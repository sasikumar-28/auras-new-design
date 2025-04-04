import AxiosApi from "../../server/axiosConfig";

interface LoginRequest {
  emailId: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export const loginUser = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const URL = "/api/customers/login";
  const hed = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  try {
    const response = await AxiosApi.post<LoginResponse>(URL, credentials, {
      headers: hed,
    });
    return response.data;
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.error(
      "Login failed:",
      error,
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || "Login request failed");
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
