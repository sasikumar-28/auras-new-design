import { getAxiosInstance } from "../../server/axiosConfig";
import { ENDPOINTS } from "@/constants/endpoints";
import {
  LoginResponse,
  LoginRequest,
  CustomerResponse,
} from "@/types/customer";

export const loginUser = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const axiosInstance = await getAxiosInstance();
    const response = await axiosInstance.post<LoginResponse>(
      `${import.meta.env.VITE_SERVER_BASE_URL}${ENDPOINTS.LOGIN}`,
      credentials,
    );
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login request failed");
  }
};

export const getOrder = async (): Promise<LoginResponse> => {
  const customerNumber = localStorage.getItem("customerNumber");
  try {
    const axiosInstance = await getAxiosInstance();
    const response = await axiosInstance.get<LoginResponse>(
      `${import.meta.env.VITE_SERVER_BASE_URL}${ENDPOINTS.GET_ORDER_BY_ID}${customerNumber}`,
    );
    return response.data;
  } catch (error) {
    console.error("Get Order failed:", error);
    throw new Error("order request failed");
  }
};

export const getCustomerInfoById = async (): Promise<CustomerResponse[]> => {
  const customerNumber = localStorage.getItem("customerNumber");
  try {
    const axiosInstance = await getAxiosInstance();
    const response = await axiosInstance.get<CustomerResponse[]>(
      `${import.meta.env.VITE_SERVER_BASE_URL}${ENDPOINTS.GET_CUSTOMER_INFO_BY_ID}${customerNumber}`,
    );
    return response.data;
  } catch (error) {
    console.error("Get Customer info failed:", error);
    throw new Error("customer request failed");
  }
};
