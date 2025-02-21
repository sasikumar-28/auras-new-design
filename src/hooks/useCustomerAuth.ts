import { CUSTOMER_LOGIN, CUSTOMER_CREATE } from "@/graphQL/mutations/mutations";
import { useMutation } from "@apollo/client";

export const useCustomerAuth = () => {
  const [
    loginCustomer,
    { data: loginData, loading: loginLoading, error: loginError },
  ] = useMutation(CUSTOMER_LOGIN);
  const [
    createCustomer,
    { data: signUpData, loading: signUpLoading, error: signUpError },
  ] = useMutation(CUSTOMER_CREATE);

  const signIn = async (draft: { email: string; password: string }) => {
    try {
      const { data } = await loginCustomer({ variables: { draft } });
      return data?.customerSignIn.customer;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signUp = async (draft: { email: string; password: string }) => {
    try {
      const { data } = await createCustomer({ variables: { draft } });
      return data?.customerSignUp.customer;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  return {
    signIn,
    signUp,
    loginData,
    signUpData,
    loginLoading,
    signUpLoading,
    loginError,
    signUpError,
  };
};
