/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector, useDispatch } from "react-redux";
import { setProducts as setProductsAction } from "@/store/reducers/productReducer";
import {
  addToCart,
  updateCartProductQuantity,
} from "@/store/reducers/cartReducer";
import { currencyFormatter, priceFormatter } from "@/utils/helper";
import { Product } from "@/graphQL/queries/types";

const ProductDetailSidebar = () => {
  const product = useSelector((state: any) => state.product.product);
  const store = useSelector((s) => s.store.store);
  const cart = useSelector((state: any) => state.cart.cart);
  const dispatch = useDispatch();
  return (
    <div
      className="flex flex-col justify-around gap-4 h-[100vh] w-[17vw] p-4"
      style={{ background: store.themeColor, color: store.themeContrastColor }}
    >
      <div className="flex flex-col gap-2 p-2">
        <div className="text-lg font-bold">Orders Details</div>
        <div className="text-sm">Sold by Brand and Fulfilled by Asipre</div>
      </div>
      <div className="bg-gradient-to-b from-[#2C2C2C] to-[#444444] rounded-xl p-4 gap-y-4 text-3xl flex flex-col">
        <div style={{ color: store.themeContrastColor }}>
          <span className="font-bold">
            {product &&
              currencyFormatter(
                priceFormatter(product)?.centAmount || 0,
                priceFormatter(product)?.currencyCode || "USD"
              )}
          </span>
        </div>
        <div className="text-white flex items-center gap-2 text-xs">
          <span className=""> Quantity: </span>
          <div className="bg-gray-600 rounded-xl px-2 flex items-center gap-2">
            <div
              onClick={() => {
                dispatch(
                  setProductsAction({
                    ...product,
                    quantity: product?.quantity + 1,
                  })
                );
                dispatch(
                  updateCartProductQuantity({ id: product.id, value: 1 })
                );
              }}
              className="cursor-pointer"
            >
              +
            </div>
            <div>{product?.quantity || 1}</div>
            <div
              onClick={() => {
                dispatch(
                  setProductsAction({
                    ...product,
                    quantity:
                      product?.quantity - 1 <= 0 ? 0 : product?.quantity - 1,
                  })
                );
                dispatch(
                  updateCartProductQuantity({ id: product.id, value: -1 })
                );
              }}
              className="cursor-pointer"
            >
              -
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div
            onClick={() => dispatch(addToCart(product))}
            className="text-xs text-white rounded-t-xl h-14 flex items-center justify-center gap-2 cursor-pointer"
            style={{ background: store.themeColor }}
          >
            <Icon icon="solar:cart-plus-broken" width="24" height="24" />
            {cart.some((p: Product) => p.id == product.id)
              ? "Added to Cart"
              : "Add to Cart"}
          </div>
          <div
            className="text-xs text-white rounded-b-xl h-14 flex items-center justify-center gap-2 cursor-pointer"
            style={{ background: store.themeColor + "90" }}
          >
            <Icon icon="tdesign:gesture-click" width="24" height="24" />
            1-Click order
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mt-4">
          <Icon icon="basil:clock-outline" width="36" height="36" />
          <div className="text-xs">
            Order within <b>11h 54m</b> to get it by <b>Monday 9PM</b>
          </div>
        </div>
        <div className="flex items-center gap-2 ">
          <Icon icon="prime:lock" width="24" height="24" />
          <div className="text-xs">Secure transaction</div>
        </div>
      </div>
      <div></div>
      <div>
        <div className="text-lg font-bold">Related Products</div>
        <div className="flex gap-2 justify-start">
          <div>
            <div className=" font-bold">Google Pixel 7 Pro</div>
            <div className="text-xs">
              Price:
              {product?.masterVariant?.prices[0].value.centAmount.toLocaleString(
                "en-US",
                {
                  style: "currency",
                  currency:
                    product?.masterVariant?.prices[0].value.currencyCode,
                }
              )}
            </div>
          </div>
          <div
            className={`bg-gradient-to-b cursor-pointer rounded-full from-[#B93284] to-[#F2DCF9] p-1 h-10 w-10 flex items-center justify-center`}
          >
            <Icon icon="mdi:arrow-right" width="24" height="24" color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSidebar;
