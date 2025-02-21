import { UPDATE_PAYMENT } from "@/graphQL/mutations/mutations";
import { UpdatePaymentType } from "@/graphQL/queries/types";
import { useMutation } from "@apollo/client";

export const usePayment = () => {
  const [updatePayment, { data, loading, error }] = useMutation(UPDATE_PAYMENT);

  const updatePaymentMethod = async (draft: UpdatePaymentType) => {
    try {
      const { data } = await updatePayment({ variables: { draft } });
      return data?.updatePayment;
    } catch (error) {
      console.error("Order creation error:", error);
      throw error;
    }
  };

  return {
    updatePaymentMethod,
    data,
    loading,
    error,
  };
};
