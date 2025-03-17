/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "./ui/checkbox";
import languageIcon from "@/assets/sidebar-icons/language-icon.png";
import heartIcon from "@/assets/sidebar-icons/heart-icon.png";
import returnIcon from "@/assets/sidebar-icons/return-icon.png";
import trendingIcon from "@/assets/sidebar-icons/Icon feather-trending-up.png";
import chatWithTanyaIcon from "@/assets/sidebar-icons/chat-with-tanya-icon.png";
import { useSelector } from "react-redux";
import { Store } from "@/graphQL/queries/types";

const filterData = [
  {
    label: "Categories",
    options: [
      { name: "All", selected: false },
      { name: "Mobile Photos", selected: false },
      { name: "Cameras", selected: false },
      { name: "Kitchen & Appliances", selected: false },
      { name: "Home Entertainment System", selected: false },
      { name: "Television", selected: false },
      { name: "others", selected: false },
    ],
  },
  {
    label: "Delivery Day",
    options: [
      { name: "Get it Today", selected: false },
      { name: "Get it by Tomorrow", selected: false },
    ],
  },
];

export function Sidebar({
  sortFilter,
  isRightSidebar,
}: {
  sortFilter?: boolean;
  isRightSidebar?: boolean;
  storeCode: string;
}) {
  const store: Store = useSelector((s: any) => s.store.store);
  const navigate = useNavigate();
  const [logo, setLogo] = useState<string>("");
  const [themeColor, setThemeColor] = useState<string>("");

  useEffect(() => {
    setLogo(store?.logoTransparent || store.logoDarkBg || store?.logoLightBg);
    // setLogo(store.logoDarkBg || store?.logoLightBg);
    setThemeColor(store?.themeColor);
  }, [store]);

  if (isRightSidebar) {
    return (
      <div
        className={`w-54 flex justify-end items-end p-2`}
        style={{
          backgroundColor: themeColor,
          color: store?.themeContrastColor,
        }}
      >
        <div className="flex w-34 flex-col items-center justify-around gap-2 h-full">
          <div className="flex flex-col items-center gap-1">
            <img width={22} src={languageIcon} alt="language" />
            <p className="text-xs">English</p>
          </div>
          <div
            className="space-y-6 text-xs flex flex-col items-center gap-8"
            onClick={() => navigate("/cart")}
          >
            <div className="flex flex-col items-center gap-1">
              <img width={22} src={heartIcon} alt="Home" />
            </div>
            <div
              onClick={() => navigate("/account?tab=orders")}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <img width={22} src={returnIcon} alt="Return" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <img width={22} src={trendingIcon} alt="Trending" />
            </div>
          </div>
          <div className="flex flex-col items-center border-y py-3 gap-1 w-full text-center">
            <img width={22} src={chatWithTanyaIcon} alt="Chat-icon" />
            <p className="text-xs">Chat with Tanya</p>
          </div>
        </div>
      </div>
    );
  }

  if (sortFilter) {
    return (
      <div
        className={`w-45 flex`}
        style={{
          backgroundColor: themeColor,
          color: store?.themeContrastColor,
        }}
      >
        <div className="flex flex-col items-center h-screen">
          <div className="pt-7 flex flex-col items-center gap-2 h-[100px]">
            {logo && <img width={80} src={logo} alt="logo" />}
          </div>
          <div className="mt-4 flex flex-col gap-2 items-center w-5/6 text-left">
            {filterData.map((filter, index) => (
              <div className="ml-2" key={index}>
                <p className="text-md font-bold mb-2">{filter.label}</p>
                {filter.options.slice(0, 6).map((option, i) => (
                  <div className="ml-2 mb-2" key={i}>
                    <div className="flex items-center gap-2 pl-3 text-wrap">
                      <Checkbox className="data-[state=checked]:bg-white border-white data-[state=checked]:text-[#552864] rounded-[4px]" />
                      <p className="text-[13px]">{option.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      // className="w-30 text-white flex`"
      className={`w-30 text-[${store?.themeContrastColor}] flex`}
      style={{
        backgroundColor: store.themeColor,
        color: store?.themeContrastColor,
      }}
    >
      <div className="flex flex-col justify-between items-center h-screen">
        <div className="pt-7">
          {logo && <img width={80} src={logo} alt={store.storeCode} />}
        </div>
        <div className="space-y-6 text-xs ">
          <div
            onClick={() => navigate("/cart")}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <img width={22} src={heartIcon} alt="Home" />
            <p style={{ color: store?.themeContrastColor }}>My Wishlist</p>
          </div>
          <div
            onClick={() => navigate("/account?tab=orders")}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <img width={22} src={returnIcon} alt="Return" />
            <div
              className="text-center"
              style={{ color: store?.themeContrastColor }}
            >
              <p>My Orders</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <img width={22} src={trendingIcon} alt="Trending" />
            <p style={{ color: store?.themeContrastColor }}>Top Deals</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-xs gap-4 mb-4">
          <div className="flex flex-col items-center border-y p-3 gap-1">
            <img width={22} src={chatWithTanyaIcon} alt="Chat-icon" />
            <p style={{ color: store?.themeContrastColor }}>Chat with Tanya</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <img width={22} src={languageIcon} alt="language" />
            <p style={{ color: store?.themeContrastColor }}>English</p>
          </div>
        </div>
      </div>
    </div>
  );
}
