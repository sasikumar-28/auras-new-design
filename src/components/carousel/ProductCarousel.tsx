import { SearchProduct } from "@/graphQL/queries/types";
import {
  stringReducer,
  // priceFormatter,
  // currencyFormatter,
  displayData,
  imageUrlArray,
} from "@/utils/helper";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ProductCarousel = ({ product }: { product: SearchProduct[] }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storeCode =
    searchParams.get("storeCode") || localStorage.getItem("storeCode");
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const nextProduct = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex + 1) % product.length);
  };

  const prevProduct = () => {
    setCurrentProductIndex(
      (prevIndex) => (prevIndex - 1 + product.length) % product.length
    );
  };
  return (
    <div className="mb-4">
      <div className="flex justify-between mt-4 items-center">
        {product?.length > 1 ? (
          <button
            onClick={prevProduct}
            className="bg-[#804C9E] text-white p-2 rounded flex items-center h-fit"
          >
            <Icon icon="mdi:chevron-left" width="18" />
          </button>
        ) : (
          <div />
        )}

        <div
          key={product[currentProductIndex].objectID}
          className="flex flex-col w-[200px] h-[160px] items-center justify-between cursor-pointer shadow-lg"
          onClick={() => {
            localStorage.setItem(
              "product",
              JSON.stringify(product[currentProductIndex])
            );
            navigate(
              `/product/${product[currentProductIndex].objectID}?category=${product[currentProductIndex].categoryPageId[0]}&productCard=true`
            );
          }}
        >
          {/* Product Image */}
          <img
            src={imageUrlArray(product[currentProductIndex])[0]}
            alt={
              storeCode == "applebees"
                ? product[currentProductIndex]?.title
                : displayData(product[currentProductIndex]?.name["en-US"])
            }
            className="w-20 h-20 rounded-[3px] scale-125 transition-transform duration-300 hover:scale-150"
          />

          {/* Product Price & Name */}
          <div className="text-black bg-[#E9D2F9] w-full rounded-[3px] p-1 text-[12px] font-bold text-center">
            {/* <div>
              {currencyFormatter(
                priceFormatter(product[currentProductIndex]).centAmount || 0,
                priceFormatter(product[currentProductIndex]).currencyCode
              )}
            </div> */}
            <div>
              {storeCode == "applebees"
                ? product[currentProductIndex]?.title
                : stringReducer(
                    displayData(product[currentProductIndex]?.name["en-US"]),
                    30
                  )}
            </div>
          </div>
        </div>
        {product?.length > 1 ? (
          <button
            onClick={nextProduct}
            className="bg-[#804C9E] text-white p-2 rounded flex items-center h-fit"
          >
            <Icon icon="mdi:chevron-right" width="18" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
