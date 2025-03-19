/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getSearchResults } from "@/utils";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Product, SearchProduct } from "@/graphQL/queries/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { decryptData, displayData, imageUrlArray } from "@/utils/helper";
import { login, logout } from "@/store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setSelectedProduct } from "@/store/reducers/cartReducer";
import { getShoppingAssistantForStore } from "@/utils/store-helper";
import { fetchStoreConfig } from "@/server/api";
import { setStore } from "@/store/reducers/storeReducer";
export default function Header({
  isSortFilter,
  isProductCard,
}: {
  isSortFilter: boolean;
  isProductCard: boolean;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedProduct = useSelector((state: any) => state.cart.cart);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const storeCode =
    searchParams.get("storeCode") || localStorage.getItem("storeCode");
  const store = useSelector((s: any) => s.store.store);

  const handleSearch = async () => {
    const results: SearchProduct[] = await getSearchResults(
      searchQuery,
      store.searchConfigs
    );
    setSearchResults(results);
  };

  useEffect(() => {
    if (storeCode) {
      fetchStoreConfig(storeCode).then((res) => {
        dispatch(setStore({ ...res, storeCode: storeCode }));
      });

      const storeDetails = getShoppingAssistantForStore(storeCode);
      document
        .getElementById("favicon")
        ?.setAttribute("href",   store.favicon ? store.favicon : storeDetails.favicon);

      document.title = "Loading...";
    }
  }, [storeCode, store?.favicon]);

  useEffect(() => {
    if (store.websiteTitle) {
      document.title = store.websiteTitle;
    }
  }, [store.websiteTitle]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      handleSearch();
    }
    if (searchQuery.length === 0) {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    const cartDetails = localStorage.getItem("cart");
    const selectedDetails = localStorage.getItem("selectedProduct");
    if (userDetails) {
      const decrypted = JSON.parse(decryptData(userDetails));
      dispatch(login(decrypted));
    }
    if (cartDetails) {
      const decrypted = JSON.parse(cartDetails);
      dispatch(setCart(decrypted));
    }
    if (selectedDetails) {
      const decrypted = JSON.parse(selectedDetails);
      dispatch(setSelectedProduct(decrypted));
    }
  }, []);

  if (window.location.pathname.includes("checkout")) {
    return <></>;
  }

  return (
    <div
      className={`p-4 flex justify-between items-center gap-4
         ${isSortFilter ? "w-[78vw]" : isProductCard ? "w-[78vw]" : "w-[99vw]"}
         `}
    >
      <div className=" w-4/6">
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
          {searchResults.slice(0, 5).map((result, index) => (
            <div key={index} className="p-4 border-b cursor-pointer">
              <div
                className="flex justify-between items-center"
                onClick={() => {
                  localStorage.setItem("product", JSON.stringify(result));
                  setSearchQuery("");
                  navigate(
                    `/product/${result?.objectID}?category=${
                      storeCode == "applebees"
                        ? result?.categoryId
                        : result?.categoryPageId[0]
                    }&productCard=true`
                  );
                  setSearchResults([]);
                }}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={imageUrlArray(result)[0]}
                    alt={
                      storeCode == "applebees"
                        ? result?.title
                        : displayData(result?.name["en-US"])
                    }
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-gray-500 hover:underline">
                    {storeCode == "applebees"
                      ? result?.title
                      : displayData(result?.name["en-US"])}
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

      <div className="flex w-2/6 items-center gap-6">
        <div className="flex items-center gap-2 bg-[#2C2C2C] h-[53px] min-w-[172px] rounded-full px-2 ">
          <div
            className="p-2 rounded-full "
            style={{ backgroundColor: `${store.themeColor}` }}
          >
            <Icon
              icon="mdi:cart-outline"
              width="20"
              height="20"
              color="white"
            />
          </div>
          <p className="text-white text-sm">
            {selectedProduct.reduce(
              (acc: number, item: Product) => acc + (item.quantity || 0),
              0
            )}
          </p>
          <p className="text-gray-500 text-sm">|</p>
          <p className="text-white text-sm">
            {selectedProduct
              .reduce(
                (acc: number, item: Product) =>
                  acc +
                  (item?.masterVariant?.prices[0]?.value?.centAmount || 0) *
                    (item.quantity || 1),
                0
              )
              .toLocaleString("en-US", {
                style: "currency",
                currency:
                  selectedProduct[0]?.masterVariant?.prices[0]?.value
                    ?.currencyCode || "USD",
                minimumFractionDigits: 0, // Ensure no decimal points
                maximumFractionDigits: 0, // Limit to whole numbers only
              })}
          </p>
        </div>
        <div className="w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                className="cursor-pointer h-12 w-12"
                src={"/images/user.png"}
                alt="profile"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44 bg-white shadow-xl p-2 rounded">
              <DropdownMenuGroup className="flex flex-col gap-y-2">
                <DropdownMenuItem className="text-[13px] cursor-pointer flex gap-4 items-center">
                  <div>
                    <Icon icon="prime:user" width="24" height="24" />
                  </div>
                  <div>My Account</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[13px] cursor-pointer flex gap-4 items-center">
                  <div>
                    <Icon icon="ph:chat-light" width="24" height="24" />
                  </div>
                  <div>Recommendations</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[13px] cursor-pointer flex gap-4 items-center">
                  <div>
                    <Icon icon="bxs:hot" width="24" height="24" />
                  </div>
                  <div>Trending</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[13px] cursor-pointer flex gap-4 items-center">
                  <div>
                    <Icon
                      icon="icon-park-outline:return"
                      width="24"
                      height="24"
                    />
                  </div>
                  <div> Return & Refund</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[13px] cursor-pointer flex gap-4 items-center">
                  <div>
                    <Icon icon="proicons:cart" width="24" height="24" />
                  </div>
                  <div>Buy it Again</div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-[13px] cursor-pointer flex gap-4 items-center"
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                  }}
                >
                  <div>
                    <Icon
                      icon="qlementine-icons:log-out-16"
                      width="24"
                      height="24"
                    />{" "}
                  </div>
                  <div>Logout</div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}