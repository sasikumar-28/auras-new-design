import { SearchProduct } from "@/graphQL/queries/types";
import {
  stringReducer,
  priceFormatter,
  currencyFormatter,
  displayData,
  imageUrlArray,
} from "@/utils/helper";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ProductCarousel = ({
  product,
  storeDetails,
}: {
  product: SearchProduct[];
  storeDetails: any;
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storeCode =
    searchParams.get("storeCode") || localStorage.getItem("storeCode");
  const [startIndex, setStartIndex] = useState(0);
  const productsPerPage = 3;

  const nextProducts = () => {
    setStartIndex((prevIndex) =>
      prevIndex + productsPerPage >= product.length
        ? 0
        : prevIndex + productsPerPage
    );
  };

  const prevProducts = () => {
    setStartIndex((prevIndex) =>
      prevIndex - productsPerPage < 0
        ? product.length - (product.length % productsPerPage || productsPerPage)
        : prevIndex - productsPerPage
    );
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mt-4">
        {product?.length > productsPerPage && (
          <button
            onClick={prevProducts}
            className={`bg-${storeDetails.themeDarkColor} text-white p-2 rounded flex items-center h-fit`}
          >
            <Icon icon="mdi:chevron-left" width="18" />
          </button>
        )}

        <div className="flex gap-4 justify-start w-full">
          {product
            .slice(startIndex, startIndex + productsPerPage)
            .map((prod) => (
              <div
                key={prod.objectID}
                className="flex flex-col w-[150px] h-[160px] items-center justify-between cursor-pointer shadow-lg"
                onClick={() => {
                  localStorage.setItem("product", JSON.stringify(prod));
                  navigate(
                    `/product/${prod.objectID}?category=${prod.categoryPageId[0]}&productCard=true`
                  );
                }}
              >
                <img
                  src={imageUrlArray(prod)[0]}
                  alt={
                    storeCode == "applebees"
                      ? prod?.title
                      : displayData(prod?.name["en-US"])
                  }
                  className="w-16 h-16 rounded-[3px] scale-125 transition-transform duration-300 hover:scale-150 object-cover"
                />
                <div
                  className={`text-black bg-${storeDetails.themeLightColor} w-full rounded-[3px] p-1 text-[12px] font-bold text-center`}
                >
                  <div>
                    {currencyFormatter(
                      storeCode == "applebees"
                        ? Number(prod?.price)
                        : priceFormatter(prod).centAmount || 0,
                      priceFormatter(prod)?.currencyCode
                    )}
                  </div>
                  <div>
                    {storeCode == "applebees"
                      ? prod?.title
                      : stringReducer(displayData(prod?.name["en-US"]), 30)}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {product?.length > productsPerPage && (
          <button
            onClick={nextProducts}
            className={`bg-${storeDetails.themeDarkColor} text-white p-2 rounded flex items-center h-fit`}
          >
            <Icon icon="mdi:chevron-right" width="18" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
