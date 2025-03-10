/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCarousel from "./ProductCarousel";
import { initialCapital } from "@/utils/helper";

const ProductDisplay = ({ chat }: any) => {
  return (
    <div className="text-sm text-[#232323] bg-[#FFFFFF] px-7 py-4 rounded-r-xl rounded-bl-2xl w-full">
      {chat.map((products: any, i: number) => (
        <div key={i}>
          <div className="font-semibold text-[#804C9E] mb-2 border-[#804C9E] border p-2 w-fit rounded-[20px] bg-[#F1DCFF]">
            {initialCapital(products.keyword) || "No keyword"}
          </div>
          <ProductCarousel product={products.items} />
        </div>
      ))}

      {/* Navigation Buttons */}
    </div>
  );
};

export default ProductDisplay;
