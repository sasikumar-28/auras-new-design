import Header from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Outlet } from "react-router";
import { useSearchParams, useNavigate } from "react-router";
import ProductDetailSidebar from "@/components/products/ProductDetailSidebar";
import { useEffect } from "react";
import { getShoppingAssistantForStore } from "@/utils/store-helper";

const AppLayout = () => {
  const [searchParams] = useSearchParams();
  const sortFilter = searchParams.get("sortFilter");
  const productCard = searchParams.get("productCard");
  let storeCode =
    searchParams.get("storeCode") || localStorage.getItem("storeCode");
  const storeDetails = getShoppingAssistantForStore(storeCode || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (storeCode) {
      localStorage.setItem("storeCode", storeCode);
    } else {
      const storedStoreCode = localStorage.getItem("storeCode");
      if (storedStoreCode) {
        navigate(`?storeCode=${storedStoreCode}`, { replace: true });
      }
    }
  }, [storeCode, navigate]);

  // 🎨 Select Theme Color Based on storeCode
  const themeColor = storeDetails.background;

  return (
    <>
      <div className="flex justify-between h-[100vh] overflow-hidden">
        <div
          className={`flex w-full ${
            productCard
              ? "bg-gradient-to-r from-[#552864] via-[#552864] to-[#F2DCF9]"
              : "bg-[#552864]"
          }`}
        >
          <Sidebar sortFilter={!!sortFilter} storeCode={storeCode || ""} />
          {/* Apply Dynamic Theme Here */}
          <div className={`flex-1 w-full ${themeColor}`}>
            <main
              className={`bg-white px-4 w-full min-h-screen ${
                sortFilter || productCard
                  ? "rounded-[3vw] rounded-l-[3vw] py-1"
                  : "rounded-l-[3vw] py-6"
              }`}
            >
              <Outlet />
            </main>
          </div>
        </div>

        {/* Header Section */}
        <div
          className={`fixed z-50 ${
            sortFilter ? "ml-56" : productCard ? "ml-28" : "ml-36"
          }`}
        >
          <Header isSortFilter={!!sortFilter} isProductCard={!!productCard} />
        </div>

        {/* Right Sidebar */}
        {sortFilter && (
          <Sidebar isRightSidebar={true} storeCode={storeCode || ""} />
        )}

        {/* Product Detail Sidebar */}
        {productCard && <ProductDetailSidebar />}
      </div>
    </>
  );
};

export default AppLayout;
