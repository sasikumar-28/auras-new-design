import { CREATE_ORDER } from "@/graphQL/mutations/mutations";
import { GET_ALL_ORDERS } from "@/graphQL/queries/queries";
import { Cart } from "@/graphQL/queries/types";
import { useMutation, useQuery } from "@apollo/client";

type DraftType = {
  cart: Cart;
};

export const useOrder = () => {
  // Mutation to create an order
  const [
    createOrder,
    { data: orderData, loading: orderLoading, error: orderError },
  ] = useMutation(CREATE_ORDER);

  // Query to fetch all orders
  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
    refetch,
  } = useQuery(GET_ALL_ORDERS, {
    variables: {
      where: "",
      sort: [],
      limit: 10,
      offset: 0,
    },
  });

  // Function to place a new order
  const placeOrder = async (draft: DraftType) => {
    try {
      const { data } = await createOrder({ variables: { draft } });
      await refetch(); // Refetch orders after creating a new one
      return data?.createOrderFromCart;
    } catch (error) {
      console.error("Order creation error:", error);
      throw error;
    }
  };

  // Function to refetch orders
  const getOrders = async (
    where = "",
    sort = ["createdAt desc"],
    limit = 10,
    offset = 0
  ) => {
    try {
      const { data } = await refetch({ where, sort, limit, offset });
      return data?.orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  return {
    placeOrder,
    getOrders,
    orderData,
    orderLoading,
    orderError,
    ordersData,
    ordersLoading,
    ordersError,
  };
};
