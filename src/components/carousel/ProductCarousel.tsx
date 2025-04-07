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
import { useNavigate } from "react-router-dom";

const ProductCarousel = ({
  product,
  storeDetails,
}: {
  product: SearchProduct[];
  storeDetails: any;
}) => {
  const navigate = useNavigate();

  const [startIndex, setStartIndex] = useState(0);
  const productsPerPage = 4;

  const nextProducts = () => {
    setStartIndex((prevIndex) =>
      prevIndex + productsPerPage >= product.length
        ? 0
        : prevIndex + productsPerPage,
    );
  };

  const prevProducts = () => {
    setStartIndex((prevIndex) =>
      prevIndex - productsPerPage < 0
        ? product.length - (product.length % productsPerPage || productsPerPage)
        : prevIndex - productsPerPage,
    );
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mt-4 gap-[20px]">
        {product?.length > productsPerPage && (
          <button
            onClick={prevProducts}
            className={`text-white p-2 rounded flex items-center h-fit`}
            style={{ color: storeDetails.themeColor }}
          >
            <Icon icon="mdi:chevron-left" width="25" />
          </button>
        )}

        <div className="flex gap-4 justify-start w-full">
          {product
            .slice(startIndex, startIndex + productsPerPage)
            .map((prod) => (
              <div
                key={prod.id}
                className="flex flex-col w-[150px] h-[180px] items-center justify-between cursor-pointer shadow-lg"
                onClick={() => {
                  // localStorage.setItem("product", JSON.stringify(prod));
                  navigate(
                    `/product/${prod.id}?category=${prod.category}`,
                  );
                }}
              >
                {/* Product Image */}
                <img
                  src={imageUrlArray(prod)[0]}
                  alt={
                    prod?.title ? prod.title : displayData(prod?.name["en-US"])
                  }
                  className="w-16 h-16 rounded-[3px] scale-125 transition-transform duration-300 hover:scale-150 object-cover"
                />

                {/* Price & Name Container */}
                <div
                  className={`text-black w-full rounded-[3px] p-2 text-[12px] font-bold text-center`}
                  style={{ background: storeDetails.tanyaThemeColorLight }}
                >
                  {/* Product Price */}
                  <div className="text-[14px] font-semibold">
                    {currencyFormatter(
                      prod?.price
                        ? Number(prod?.price)
                        : priceFormatter(prod).centAmount || 0,
                      priceFormatter(prod)?.currencyCode,
                    )}
                  </div>
                  {/* Product Name - 2 Lines & Overflow */}
                  <div className="relative inline-block group">
                    <div className="w-full line-clamp-1 overflow-hidden text-ellipsis">
                      {prod?.title
                        ? prod.title
                        : stringReducer(displayData(prod?.name["en-US"]), 60)}
                    </div>

                    {/* Full Text on Hover - Only Shows When Hovering on Text */}
                    <div className="absolute left-0 top-full mt-1 w-max max-w-[200px] p-2 bg-white shadow-lg text-black text-xs rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-50 pointer-events-none">
                      {prod?.title
                        ? prod.title
                        : stringReducer(displayData(prod?.name["en-US"]), 60)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {product?.length > productsPerPage && (
          <button
            onClick={nextProducts}
            className={`text-white p-2 rounded flex items-center h-fit`}
            style={{ color: storeDetails.themeColor }}
          >
            <Icon icon="mdi:chevron-right" width="25" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
