import { getAxiosInstance } from "../../server/axiosConfig";
import { ENDPOINTS } from "@/constants/endpoints";
import {
  LoginResponse,
  LoginRequest,
  CustomerResponse,
} from "@/types/customer";

interface UserAddressPayload {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  street: string;
  postalCode: string;
  country: string;
  addressType: 'SHIPPINGADDRESS' | 'BILLINGADDRESS' | string; // extend if needed
}


interface UserRegistrationResponse {
  success: string;
  customerNumber: string;
  firstName: string;
  lastName: string;
  userId: string;
  password: string; // Usually hashed
  customerType: 'REGISTERED' | string; // You can replace with a union of known types if applicable
}


type AddressType = 'SHIPPINGADDRESS' | 'BILLINGADDRESS';

interface UserAddressResponse {
  success: string;
  addressId: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  street: string;
  postalCode: string;
  country: string;
  addressType: AddressType;
  customerNumber: number;
}


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

export const addAddress = async (payLoad: UserAddressPayload): Promise<UserAddressResponse> => {
  const customerNumber = localStorage.getItem("customerNumber");
  const emailld = "manoj@gmail.com";
  try {
    const axiosInstance = await getAxiosInstance();
    const response = await axiosInstance.post<UserAddressResponse>(
      `${import.meta.env.VITE_SERVER_BASE_URL}${ENDPOINTS.ADD_ADDRESS}${customerNumber}/${emailld}`,
      payLoad,
    );
    return response.data;
  } catch (error) {
    console.error("Get Order failed:", error);
    throw new Error("order request failed");
  }
};



export const signUp = async (
  credentials: LoginRequest,
): Promise<UserRegistrationResponse> => {
  try {
    const axiosInstance = await getAxiosInstance();
    const response = await axiosInstance.post<UserRegistrationResponse>(
      `${import.meta.env.VITE_SERVER_BASE_URL}${ENDPOINTS.SIGNIN}`,
      credentials,
    );
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login request failed");
  }
};
