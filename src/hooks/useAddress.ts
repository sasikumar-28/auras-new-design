import { ADD_ADDRESS } from "@/graphQL/mutations/mutations";
import { GET_ALL_CART_ADDRESS } from "@/graphQL/queries/queries";
import { Address, AddressInput } from "@/graphQL/queries/types";
import { useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

export const useAddress = () => {
  const auth = useSelector((state: any) => state.auth);
  const [
    addAddress,
    {
      data: addAddressData,
      loading: addAddressLoading,
      error: addAddressError,
    },
  ] = useMutation(ADD_ADDRESS);
  const { data, loading, error, refetch } = useQuery(GET_ALL_CART_ADDRESS, {
    variables: {
      id: auth?.user?.id || "", // Safely access user ID
    },
    skip: !auth?.user?.id, // Skip query if user ID is missing
  });

  const getAddress = async (newVariables = {}) => {
    try {
      const { data } = await refetch({
        id: auth?.user?.id, // Ensure user ID is included when refetching
        ...newVariables, // Allow additional variables for dynamic fetching
      });
      return data;
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error;
    }
  };

  const addNewAddress = async (variables: Address) => {
    try {
      const { data } = await addAddress({
        variables: {
          version: 4,
          id: auth.user.id,
          actions: [{ addItemShippingAddress: { address: variables } }],
        },
      });
      return data;
    } catch (err) {
      console.error("Error adding new address:", err);
      throw err;
    }
  };

  return {
    addAddressData,
    addAddressLoading,
    addAddressError,
    getAddress,
    addNewAddress,
    data,
    loading,
    error,
  };
};
