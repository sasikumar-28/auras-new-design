/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCarousel from "./ProductCarousel";
import { initialCapital } from "@/utils/helper";

const ProductDisplay = ({ chat, storeDetails }: any) => {
  return (
    <div className="text-sm text-[#232323] bg-[#FFFFFF] px-7 py-4 rounded-r-xl rounded-bl-2xl w-full">
      {chat.map((products: any, i: number) => (
        <div key={i}>
          <div
            className={`font-semibold text-${storeDetails.themeDarkColor} mb-2 border-${storeDetails.themeDarkColor} border p-2 w-fit rounded-[20px] bg-${storeDetails.themeLightColor}`}
            style={{
              color: storeDetails.themeDarkColor,
              border: `1px solid ${storeDetails.themeColor}`,
              backgroundColor: storeDetails.tanyaThemeColorLight
            }}
          >
            {initialCapital(products.keyword) || "No keyword"}
          </div>
          <ProductCarousel
            product={products.items}
            storeDetails={storeDetails}
          />
        </div>
      ))}

      {/* Navigation Buttons */}
    </div>
  );
};

export default ProductDisplay;
