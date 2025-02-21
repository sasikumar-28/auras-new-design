"use client";
import cartIcon from "@/assets/header-icons/cart-icon.png";
import profileImage from "@/assets/header-icons/profile-image.png";
import { getSearchResults } from "@/utils";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchProduct } from "@/graphQL/queries/types";
export default function Header({
  isSortFilter,
  isProductCard,
}: {
  isSortFilter: boolean;
  isProductCard: boolean;
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);

  const handleSearch = async () => {
    const results: SearchProduct[] = await getSearchResults(searchQuery);
    console.log(results, "results");
    setSearchResults(results);
  };

  useEffect(() => {
    if (searchQuery.length > 2) {
      handleSearch();
    }
    if (searchQuery.length === 0) {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div
      className={`p-4 flex justify-between items-center gap-4
         ${isSortFilter ? "w-[78vw]" : isProductCard ? "w-[78vw]" : "w-[88vw]"}
         `}
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="absolute top-16 left-0 w-4/6 bg-white rounded-xl shadow-md">
          {searchResults.map((result, index) => (
            <div key={index} className="p-4 border-b cursor-pointer">
              <div
                className="flex justify-between items-center"
                onClick={() => {
                  localStorage.setItem("product", JSON.stringify(result));
                  setSearchQuery("");
                  navigate(
                    `/product/${result?.objectID}?category=${result?.categoryPageId[0]}&productCard=true`
                  );
                  setSearchResults([]);
                }}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={result.variants[0].images[0]}
                    alt={result.name["en-US"]}
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-gray-500 hover:underline">
                    {result.name["en-US"]}
                  </p>
                </div>
                <div className="-rotate-45">
                  <Icon
                    icon="line-md:arrow-right"
                    color="gray-500"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex items-center gap-2 bg-[#2C2C2C] rounded-full px-2 ">
          <div className="p-2  bg-[#B93284] rounded-full ">
            <img
              onClick={() => navigate("/cart")}
              width={45}
              src={cartIcon}
              alt="cart"
              className="cursor-pointer"
            />
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
