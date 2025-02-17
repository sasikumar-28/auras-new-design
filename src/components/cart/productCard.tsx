import { Checkbox } from "../ui/checkbox";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div
      className="w-full shadow-md border-2 p-2 flex h-[150px]"
      style={{ borderRadius: "5px" }}
    >
      <div className="flex items-center gap-2 p-2">
        <div>
          <Checkbox className="rounded-lg" />
        </div>
        <div>
          <img
            src={product?.image}
            alt={product?.name}
            className="h-[100px] w-[100px] rounded-xl ml-4"
          />
        </div>
      </div>
      <div className="flex justify-between gap-2 w-full p-2">
        <div>
          <div>{product?.name}</div>
          <div>{product?.price}</div>
        </div>
        <div>
          <div>Price</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
