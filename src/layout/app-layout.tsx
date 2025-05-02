import Header from "@/components/header";
import { Outlet } from "react-router";
import { useSearchParams, useNavigate } from "react-router";
import ProductDetailSidebar from "@/components/products/ProductDetailSidebar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ScrollToTopButton from "@/components/ui/scroll-to-top";

const AppLayout = () => {
  const [searchParams] = useSearchParams();
  const sortFilter = searchParams.get("sortFilter");
  const productCard = searchParams.get("productCard");
  const storeCode =
    searchParams.get("storeCode") || localStorage.getItem("storeCode");
  const storeDetails = useSelector((state: any) => state.store.store);
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
  const themeColor = storeDetails.themeContrastColor;

  return (
    <>
      <div className="flex justify-between min-h-screen">
        <div
          className={`flex w-full ${
            productCard
              ? "bg-gradient-to-r from-[#552864] via-[#552864] to-[#F2DCF9]"
              : "bg-[#552864]"
          }`}
        >
          {/* Apply Dynamic Theme Here */}
          <div className={`flex-1 w-full bg-[${themeColor}]`}>
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
          <Header />
        </div>

        {/* Product Detail Sidebar */}
        {productCard && <ProductDetailSidebar />}
      </div>

      {/* Scroll-To-Top Button (Always Visible on Every Page) */}
      <ScrollToTopButton themeColor={themeColor} />
    </>
  );
};

export default AppLayout;
