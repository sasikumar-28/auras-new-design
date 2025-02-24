import { GET_ALL_CART_ADDRESS } from "@/graphQL/queries/queries";
import { useQuery } from "@apollo/client";

export const useAddress = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_CART_ADDRESS);

  const getAddress = async () => {
    try {
      const { data } = await refetch();
      return data;
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error;
    }
  };

  return {
    getAddress,
    data,
    loading,
    error,
  };
};
