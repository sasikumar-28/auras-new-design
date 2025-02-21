import { useState } from "react";
import OrderCards from "./OrderCards";
import { Product } from "@/graphQL/queries/types";

const ShowOrders = () => {
  const [orders, setOrders] = useState<Product[]>([...Array(2)]);
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
