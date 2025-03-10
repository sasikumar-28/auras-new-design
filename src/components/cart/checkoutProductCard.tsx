/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/graphQL/queries/types";
import {
  addToCart,
  removeFromCart,
  updateProductQuantity,
} from "@/store/reducers/cartReducer";
import {
  currencyFormatter,
  displayData,
  imageUrlArray,
  laterDate,
  priceFormatter,
} from "@/utils/helper";
import { useDispatch } from "react-redux";

const CheckoutProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const updateQuantity = (value = 1) => {
    dispatch(updateProductQuantity({ id: product.id, value }));
  };
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div>
          <img
            src={imageUrlArray(product)[0]}
            alt={displayData(product?.title)}
            className="h-32 w-32 rounded-[5px] "
          />
        </div>
        <div className="ml-4">
          <div className="font-bold">{displayData(product?.title)}</div>
          <div className="text-[#B93284]">Limited Time Deal</div>
          <div className="text-3xl my-3">
            {currencyFormatter(
              priceFormatter(product)?.centAmount || 0,
              priceFormatter(product)?.currencyCode || "USD"
            )}
          </div>
          {/* quantity card */}
          <div
            className=" text-black rounded-md px-2 flex items-center gap-2 w-fit"
            style={{ borderRadius: "2px", border: "1px solid #B93284" }}
          >
            <span
              className="cursor-pointer"
              onClick={() => {
                dispatch(removeFromCart({ id: product.id }));
                updateQuantity(-1);
              }}
            >
              -
            </span>
            {product.quantity}
            <span
              className="cursor-pointer"
              onClick={() => {
                dispatch(
                  addToCart({
                    ...product,
                    quantity: (product.quantity ?? 0) + 1,
                  })
                );
                updateQuantity(1);
              }}
            >
              +
            </span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold">{laterDate(5)}</div>
        <div>Free Standard Delivery</div>
      </div>
    </div>
  );
};

export default CheckoutProductCard;
