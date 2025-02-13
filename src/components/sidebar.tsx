"use client";

import commerceCatalystLogo from "@/assets/sidebar-icons/commerce-catalyst-logo.png";
import heartIcon from "@/assets/sidebar-icons/heart-icon.png";
import returnIcon from "@/assets/sidebar-icons/return-icon.png";
import trendingIcon from "@/assets/sidebar-icons/Icon feather-trending-up.png";
import chatWithTanyaIcon from "@/assets/sidebar-icons/chat-with-tanya-icon.png";
import languageIcon from "@/assets/sidebar-icons/language-icon.png";
import { Checkbox } from "./ui/checkbox";

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
}) {
  if (isRightSidebar) {
    return (
      <div className="w-54 bg-[#552864] text-white flex justify-end items-end p-2">
        <div className="flex w-34 flex-col items-center justify-around gap-2 h-full">
          {/* Language Selection */}
          <div className="flex flex-col items-center gap-1">
            <img width={22} src={languageIcon} alt="language" />
            <p className="text-xs">English</p>
          </div>

          {/* Icons Section */}
          <div className="space-y-6 text-xs">
            <div className="flex flex-col items-center gap-1">
              <img width={22} src={heartIcon} alt="Home" />
            </div>

            <div className="flex flex-col items-center gap-1">
              <img width={22} src={returnIcon} alt="Return" />
            </div>

            <div className="flex flex-col items-center gap-1">
              <img width={22} src={trendingIcon} alt="Trending" />
            </div>
          </div>

          {/* Chat Section */}
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
      <div className="w-45 bg-[#552864] text-white flex ">
        <div className="flex flex-col items-center h-screen">
          <div className="pt-7 flex flex-col items-center gap-2 h-[100px]">
            <img width={80} src={commerceCatalystLogo} alt="auras-logo" />
          </div>
          <div className="mt-4 flex flex-col gap-2 items-center w-5/6 text-left">
            {filterData.map((filter) => (
              <div className="ml-2" key={filter.label}>
                <p className="text-md font-bold mb-2">{filter.label}</p>
                {filter.options.slice(0, 6).map((option) => (
                  <div className="ml-2 mb-2" key={option.name}>
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
    <div className="w-30 bg-[#552864] text-white flex ">
      <div className="flex flex-col justify-between items-center h-screen">
        <div className="pt-7">
          <img width={80} src={commerceCatalystLogo} alt="auras-logo" />
        </div>
        <div className="space-y-6 text-xs ">
          <div className="flex flex-col items-center gap-1">
            <img width={22} src={heartIcon} alt="Home" />
            <p>My Wishlist</p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <img width={22} src={returnIcon} alt="Return" />
            <div className="text-center">
              <p>My Orders</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <img width={22} src={trendingIcon} alt="Trending" />
            <p>Top Deals</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-xs gap-4 mb-4">
          <div className="flex flex-col items-center border-y p-3 gap-1">
            <img width={22} src={chatWithTanyaIcon} alt="Chat-icon" />
            <p>Chat with Tanya</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <img width={22} src={languageIcon} alt="language" />
            <p>English</p>
          </div>
        </div>
      </div>
    </div>
  );
}
