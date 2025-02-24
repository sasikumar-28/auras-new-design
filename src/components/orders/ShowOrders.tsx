import { useEffect, useState } from "react";
import OrderCards from "./OrderCards";
import { Product } from "@/graphQL/queries/types";
import { useOrder } from "@/hooks/useOrder";
import { useSelector } from "react-redux";

const ShowOrders = () => {
  const { getOrders } = useOrder();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const auth = useSelector((state: any) => state.auth);
  const [orders, setOrders] = useState<Product[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders(`customerId="${auth.user.id}"`);
        setOrders(data?.results || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="text-2xl font-bold">Your Orders</div>
      <div className="mt-8">
        {orders.map((order, i) => (
          <OrderCards key={i} order={order} />
        ))}
      </div>
    </div>
  );
};

export default ShowOrders;
