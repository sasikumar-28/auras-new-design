"use client";
import cartIcon from "@/assets/header-icons/cart-icon.png";
import profileImage from "@/assets/header-icons/profile-image.png";
import { Icon } from "@iconify/react";

export default function Header({ width = "78" }: { width?: string }) {
  return (
    <div
      className={`p-4 flex justify-between items-center gap-4 w-[${width}vw] `}
    >
      <div className=" w-full">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Icon
              icon="mdi:search"
              className="text-gray-500"
              height={20}
              width={20}
            />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full w-full bg-[#EFEFEF] pl-12 pr-6 py-3"
          />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex items-center gap-2 bg-[#2C2C2C] rounded-full px-2 ">
          <div className="p-2  bg-[#B93284] rounded-full ">
            <img width={45} src={cartIcon} alt="cart" />
          </div>
          <p className="text-white text-sm">4</p>
          <p className="text-gray-500 text-sm">|</p>
          <p className="text-white text-sm">$2309</p>
        </div>
        <div className="">
          <img src={profileImage} alt="profile" />
        </div>
      </div>
    </div>
  );
}
