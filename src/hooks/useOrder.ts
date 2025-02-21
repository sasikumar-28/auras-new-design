import { CREATE_ORDER } from "@/graphQL/mutations/mutations";
import { Cart } from "@/graphQL/queries/types";
import { useMutation } from "@apollo/client";

type DraftType = {
  cart: Cart;
};

export const useOrder = () => {
  const [createOrder, { data, loading, error }] = useMutation(CREATE_ORDER);

  const placeOrder = async (draft: DraftType) => {
    try {
      const { data } = await createOrder({ variables: { draft } });
      return data?.createOrderFromCart;
    } catch (error) {
      console.error("Order creation error:", error);
      throw error;
    }
  };

  return {
    placeOrder,
    data,
    loading,
    error,
  };
};
