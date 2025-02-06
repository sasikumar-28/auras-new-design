"use client";

import commerceCatalystLogo from "@/assets/sidebar-icons/commerce-catalyst-logo.png"; 
import heartIcon from "@/assets/sidebar-icons/heart-icon.png";
import returnIcon from "@/assets/sidebar-icons/return-icon.png";
import trendingIcon from "@/assets/sidebar-icons/Icon feather-trending-up.png";
import chatWithTanyaIcon from "@/assets/sidebar-icons/chat-with-tanya-icon.png";
import languageIcon from "@/assets/sidebar-icons/language-icon.png";

export function Sidebar() {
  return (
    <div className="w-40 bg-[#552864] text-white flex ">
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
