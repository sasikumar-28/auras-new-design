import { useEffect } from "react";
//import { getOrder } from "../../service/api/account";
import { orders } from "@/pages/account/data";

const Order = () => {
  // const [data, setData] = useState([]);
  //const [isLoad, setLoading] = useState(false);

  useEffect(() => {
    //fetchOrder();
  }, []);

  // const fetchOrder = async () => {
  //   setLoading(true);
  //   try {
  //     const data = await getOrder();
  //   //  setData(data);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // if (isLoad) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Your Orders</h2>
      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="border border-[rgb(229_231_235)] rounded-lg overflow-hidden"
          >
            <div className="flex flex-col md:flex-row p-4 gap-4">
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={order.image}
                  alt={order.product}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row justify-between">
                  <h3 className="font-medium">{order.product}</h3>
                  <span className="font-medium">{order.price}</span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Return window closed on {order.returnWindowDate}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                    Buy it again
                  </button>
                  <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                    View your item
                  </button>
                  <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                    Write a Review
                  </button>
                </div>
              </div>

              <div className="md:w-48 flex-shrink-0">
                <div className="text-sm">
                  <p className="font-medium">
                    Delivered on {order.deliveredDate}
                  </p>
                  {/* <p className="text-gray-500">
                  Order Placed on {order.orderPlacedDate}
                </p> */}
                  {/* <p className="text-gray-500">#{order.id}</p>
                <p className="text-gray-500">
                  Ship to {order.shippingAddress}
                </p> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Order;
