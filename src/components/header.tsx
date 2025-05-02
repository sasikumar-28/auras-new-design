/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getSearchResults } from "@/utils";
import { Icon } from "@iconify/react";
import { useEffect, useState, useMemo } from "react";
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
import { login } from "@/store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setSelectedProduct } from "@/store/reducers/cartReducer";
import { fetchStoreConfig } from "@/server/api";
import { setStore } from "@/store/reducers/storeReducer";
import NavBar from "./nav-bar";
import Ribbon from "./ribbon";
import axios from "axios";
import { getAccessToken } from "@/utils/getAccessToken";
import {
  setCategories,
  setLoading,
  setError,
} from "@/store/reducers/categoryReducer";
import { fetchStoreAssets } from "@/store/reducers/cmsReducer";
import type { AppDispatch } from "@/store";
import { RootState } from "@/store";

const logout = () => {
  localStorage.clear();
  window.location.reload();
};

export default function Header() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedProduct = useSelector((state: any) => state.cart.cart);
  
  const storeFavicon = useSelector(
    (state: RootState) => state.cmsImage.favicon || ""
  );
  const storeLogo = useSelector(
    (state: RootState) => state.cmsImage.logo || ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const store = useSelector((s: any) => s.store.store);
  const isLogin = localStorage.getItem("isLoggedIn");
  const { categories, error } = useSelector((state: any) => state?.category);

  const storeCode = useMemo(
    () => searchParams.get("storeCode") || localStorage.getItem("storeCode"),
    [searchParams]
  );

  const themeColor = useMemo(() => store?.themeColor, [store]);

  const handleSearch = async () => {
    const results: SearchProduct[] = await getSearchResults(
      searchQuery,
      store.searchConfigs
    );
    setSearchResults(results);
  };

  const getCategories = async () => {
    try {
      dispatch(setLoading(true));
      const token = await getAccessToken();
      if (!token) throw new Error("Failed to fetch token");

      const storeCode = localStorage.getItem("storeCode") || "defaultStore";
      if (!storeCode) throw new Error("Store code is missing");

      const URL = `${
        import.meta.env.VITE_SERVER_BASE_URL
      }api/mycategories?storeCode=${storeCode}`;
      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        dispatch(setCategories(response.data));
      } else {
        throw new Error("Failed to fetch backend response");
      }
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      dispatch(setError(error.message || "Failed to fetch categories"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (storeCode) {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        localStorage.setItem("isLoggedIn", "false");
        localStorage.setItem(
          "customerNumber",
          JSON.stringify(new Date().getTime())
        );
      }

      dispatch(fetchStoreAssets(storeCode));
      fetchStoreConfig(storeCode).then((res) => {
        dispatch(setStore({ ...res, storeCode }));
      });
      getCategories();

      document.getElementById("favicon")?.setAttribute("href", storeFavicon);

      document.title = store.websiteTitle || "Loading...";
    }
  }, [storeCode, store?.favicon, store.websiteTitle, dispatch, storeFavicon]);

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

  const BagIcon = ({ size = 24, color = "black" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="M7 7V6a5 5 0 0 1 10 0v1" />
    </svg>
  );
  

  return (
    <>
      <Ribbon text="🎉 50% Discount on All Products – Limited Time Offer! 🎉" />
      <div
        className="fixed left-0 right-0 top-8 h-[60px]"
        style={{ backgroundColor: themeColor }}
      >
        <div
          className="flex justify-between items-center gap-8 px-4 h-full max-w-[1440px] w-full mx-auto"
          style={{ color: store?.themeContrastColor }}
        >
          {/* First child div */}
          <div className="w-[200px] flex justify-center">
            <div
              className="h-full flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              {storeLogo && (
                <img
                  src={storeLogo}
                  alt="logo"
                  className="max-w-[110px] max-h-[50px] object-contain"
                />
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-[600px] relative">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Icon
                  icon="mdi:search"
                  className="text-black"
                  height={25}
                  width={25}
                />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="border-[2px] border-black w-full bg-[#EFEFEF] pl-12 pr-6 py-3 rounded-[5px] h-[40px] text-black"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white rounded-xl shadow-md mt-1">
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
            )}
          </div>

          {/* Icons Section */}
          <div className="flex w-[300px] items-center justify-center gap-6">
            <div className="p-1 relative flex flex-col items-center text-white">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex flex-col items-center cursor-pointer">
                    <Icon
                      icon="mdi:account-outline"
                      style={{ color: store?.themeContrastColor || "#ffffff", opacity: 0.9 }}
                      width={26}
                      height={26}
                    />
                    <span className="text-sm font-medium"  style={{ color: store?.themeContrastColor || "#ffffff", opacity: 0.9 }}>Account</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44 bg-white shadow-xl p-2 rounded">
                  <DropdownMenuGroup className="flex flex-col gap-y-2 text-black">
                    <DropdownMenuItem className="text-[13px] cursor-pointer flex gap-4 items-center">
                      {isLogin === "true" ? (
                        <button
                          onClick={() => {
                            navigate("/account");
                          }}
                          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md border border-blue-600"
                        >
                          My Account
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            navigate("/login");
                          }}
                          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md border border-blue-600"
                        >
                          Sign In
                        </button>
                      )}
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
                    {isLogin !== null && (
                      <DropdownMenuItem
                        className="text-[13px] cursor-pointer flex gap-4 items-center"
                        onClick={() => {
                          logout();
                        }}
                      >
                        <div>
                          <Icon
                            icon="qlementine-icons:log-out-16"
                            width="24"
                            height="24"
                          />
                        </div>
                        <div>Logout</div>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="p-1 relative flex flex-col items-center text-white cursor-pointer">
              <Icon
                icon="mdi:heart-outline"
                style={{ color: store?.themeContrastColor || "#ffffff", opacity: 0.9 }}
                width={25}
                height={25}
              />
              <span className="text-sm font-medium"  style={{ color: store?.themeContrastColor || "#ffffff", opacity: 0.9 }}>Wishlist</span>
            </div>

            <div className="p-1 relative flex flex-col items-center text-white cursor-pointer">
            <BagIcon size={24} color={store?.themeContrastColor || "white"} />
              <span className="text-sm font-medium"  style={{ color: store?.themeContrastColor || "#ffffff", opacity: 0.9 }}>Cart</span>
              {/* Product count badge */}
              <p className="absolute  -right-1 bg-white text-black text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {selectedProduct.reduce(
                  (acc: number, item: Product) => acc + (item.quantity || 0),
                  0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <NavBar categories={categories} error={error} />
    </>
  );
}
