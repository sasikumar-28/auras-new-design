import { CREATE_CART } from "@/graphQL/mutations/mutations";
import { useMutation } from "@apollo/client";

export const useCart = () => {
  const [cartCreate, { data, loading, error }] = useMutation(CREATE_CART);

  const createCart = async () => {
    try {
      const response = await cartCreate({
        variables: {
          currency: "USD",
          country: "US",
        },
      });

      return response.data?.createCart;
    } catch (err) {
      console.error("Error creating cart:", err);
      throw err;
    }
  };

  return {
    createCart,
    data,
    loading,
    error,
  };
};
