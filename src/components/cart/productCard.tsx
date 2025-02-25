import { Icon } from "@iconify/react/dist/iconify.js";
import { Checkbox } from "../ui/checkbox";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/store/reducers/cartReducer";
import { Product } from "@/graphQL/queries/types";
import {
  imageUrlArray,
  displayData,
  priceFormatter,
  currencyFormatter,
} from "@/utils/helper";
const ProductCard = ({
  product,
  selectedProduct,
  setSelectedProduct,
}: {
  product: Product;
  selectedProduct: Product[];
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product[]>>;
}) => {
  const dispatch = useDispatch();
  const handleSelect = (checked: boolean) => {
    setSelectedProduct((prevSelected) => {
      if (checked) {
        return prevSelected.some((p) => p.id === product.id)
          ? prevSelected
          : [...prevSelected, product];
      } else {
        return prevSelected.filter((p) => p.id !== product.id);
      }
    });
  };

  const updateQuantity = (value = 1) => {
    setSelectedProduct((prevSelected) => {
      const productExists = prevSelected.some((p) => p.id === product.id);
      if (productExists) {
        return prevSelected.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + value } : p
        );
      } else {
        return prevSelected;
      }
    });
  };

  return (
    <div
      className="w-full shadow-md border border-[#D8D8D8] p-2 flex h-[150px]"
      style={{ borderRadius: "4px" }}
    >
      <div className="flex items-center gap-2 p-2">
        <div>
          <Checkbox
            className="rounded-lg"
            style={{ borderRadius: "2px" }}
            checked={selectedProduct.some((p) => p.id === product.id)}
            onCheckedChange={(checked) => handleSelect(Boolean(checked))}
          />
        </div>
        <div className="w-[150px]">
          <img
            src={imageUrlArray(product)[0]}
            alt={displayData(product?.name)}
            className="h-[100px] w-[100px] rounded-xl ml-4"
          />
        </div>
      </div>
      <div className="flex justify-between gap-2 w-full p-2">
        <div className="flex flex-col gap-2">
          <div>
            {displayData(product?.name)}{" "}
            <span className="text-xs text-[#B93284]">In stock</span>
          </div>
          <div className="text-xs text-gray-400">in Fashion Best Seller</div>
          <div className="text-xs text-gray-400">
            Eligible for free shipping
          </div>
          <div className="flex gap-4 text-[#B93284]">
            <div className="flex gap-2 cursor-auto">
              <Icon icon="solar:cart-plus-broken" width="24" height="24" />
              <div
                className=" text-black rounded-md px-2 flex items-center gap-2"
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
            <div className="border-l-2 border-gray-300 h-full"></div>
            <div
              className="cursor-pointer"
              onClick={() => {
                dispatch(removeFromCart(product as Product & void));
                handleSelect(false);
              }}
            >
              Delete
            </div>
            <div className="border-l-2 border-gray-300 h-full"></div>
            <div className="cursor-pointer">Save for Later</div>
            <div className="border-l-2 border-gray-300 h-full"></div>
            <div className="cursor-pointer">Share</div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2 items-end justify-center">
            <div className="text-xs text-[#B93284]">Limited time Deal</div>
            <div className="text-2xl font-bold">
              {currencyFormatter(
                priceFormatter(product)?.centAmount || 0,
                priceFormatter(product)?.currencyCode || "USD"
              )}
            </div>
            <div className="text-xs text-gray-400 line-through">
              {currencyFormatter(
                priceFormatter(product)?.centAmount || 0,
                priceFormatter(product)?.currencyCode || "USD"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
