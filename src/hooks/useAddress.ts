import { ADD_ADDRESS } from "@/graphQL/mutations/mutations";
import { GET_ALL_CART_ADDRESS } from "@/graphQL/queries/queries";
import { Address } from "@/graphQL/queries/types";
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
      id: auth?.user?.cartId || "",
    },
    skip: !auth?.user?.cartId,
  });

  const getAddress = async (newVariables = {}) => {
    try {
      const { data } = await refetch({
        id: auth?.user?.cartId, // Ensure user ID is included when refetching
        ...newVariables, // Allow additional variables for dynamic fetching
      });
      return data?.cart?.itemShippingAddresses || [];
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error;
    }
  };

  const addNewAddress = async (variables: Address, version: number) => {
    try {
      const { data } = await addAddress({
        variables: {
          version: version,
          id: auth?.user?.cartId,
          actions: [{ addItemShippingAddress: { address: variables } }],
        },
      });
      getAddress();
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
    itemShippingAddresses: data?.cart?.itemShippingAddresses || [],
    loading,
    error,
  };
};
