import { Icon } from "@iconify/react/dist/iconify.js";
import { Checkbox } from "../ui/checkbox";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/reducers/cartReducer";

const ProductCard = ({ product }: { product: any }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="w-full shadow-md border-2 p-2 flex h-[150px]"
      style={{ borderRadius: "5px" }}
    >
      <div className="flex items-center gap-2 p-2">
        <div>
          <Checkbox className="rounded-lg" style={{ borderRadius: "2px" }} />
        </div>
        <div className="w-[150px]">
          <img
            src={product?.masterVariant.images[0].url}
            alt={product?.name}
            className="h-[100px] w-[100px] rounded-xl ml-4"
          />
        </div>
      </div>
      <div className="flex justify-between gap-2 w-full p-2">
        <div className="flex flex-col gap-2">
          <div>
            {product?.name}{" "}
            <span className="text-xs text-[#B93284]">In stock</span>
          </div>
          <div className="text-xs text-gray-400">in Fashion Best Seller</div>
          <div className="text-xs text-gray-400">
            Eligible for free shipping
          </div>
          <div className="flex gap-2 text-[#B93284]">
            <div className="flex gap-2 cursor-auto">
              <Icon icon="solar:cart-plus-broken" width="24" height="24" />
              <div>{product.quantity}</div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => dispatch(removeFromCart(product))}
            >
              Delete
            </div>
            <div className="cursor-pointer">Save for Later</div>
            <div className="cursor-pointer">Share</div>
          </div>
          {/* <div>{product?.price}</div> */}
        </div>
        <div>
          <div>Price</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
