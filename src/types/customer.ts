export interface LoginRequest {
  emailId: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  customerNumber: number;
}

export interface CustomerResponse {
  id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  customerType: string;
}
