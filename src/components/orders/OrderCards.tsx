import { Product } from "@/graphQL/queries/types";

const OrderCards = ({ order }: { order: Product }) => {
  console.log(order);
  return (
    <div
      style={{ border: "1px solid #D8D8D8", borderRadius: "4px" }}
      className="w-full shadow-lg p-4 border-gray-200 mb-3"
    >
      <div>
        {/* image */}
        <div></div>
        {/* details */}
        <div></div>
        {/* price */}
        <div></div>
      </div>
      <div>
        {/* delivery date */}
        <div></div>
        {/* order date */}
        <div></div>
      </div>
    </div>
  );
};

export default OrderCards;
