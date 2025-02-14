import { Icon } from "@iconify/react/dist/iconify.js";

const ProductDetailSidebar = () => {
  return (
    <div className="bg-[#F2DCF9] flex flex-col justify-around gap-4 h-[100vh] w-[17vw] p-4">
      <div className="flex flex-col gap-2 p-2">
        <div className="text-lg font-bold">Orders Details</div>
        <div className="text-sm">Sold by Brand and Fulfilled by Asipre</div>
      </div>
      <div className="bg-gradient-to-b from-[#2C2C2C] to-[#444444] rounded-xl p-4 gap-y-4 text-3xl flex flex-col">
        <div className="text-white">
          <span className="text-sm align-top">$</span>
          <span className="font-bold">989</span>
          <span className="text-sm align-top">99</span>
        </div>
        <div className="text-white flex items-center gap-2 text-xs">
          <span className=""> Quantity: </span>
          <div className="bg-gray-600 rounded-xl px-2 flex items-center gap-2">
            <div>+</div>
            <div>1</div>
            <div>-</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="bg-[#B93284] text-xs text-white rounded-t-xl h-14 flex items-center justify-center gap-2 cursor-pointer">
            <Icon icon="solar:cart-plus-broken" width="24" height="24" />
            Add to Cart
          </div>
          <div className="bg-[#D24C9E] text-xs text-white rounded-b-xl h-14 flex items-center justify-center gap-2 cursor-pointer">
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
            <div className="text-xs">Price: $999</div>
          </div>
          <div className="bg-gradient-to-b cursor-pointer rounded-full from-[#B93284] to-[#F2DCF9] p-1 h-10 w-10 flex items-center justify-center">
            <Icon icon="mdi:arrow-right" width="24" height="24" color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSidebar;
