import { GET_ALL_CART_ADDRESS } from "@/graphQL/queries/queries";
import { useQuery } from "@apollo/client";

export const useAddress = () => {
  const [] = useQuery(GET_ALL_CART_ADDRESS);
};
