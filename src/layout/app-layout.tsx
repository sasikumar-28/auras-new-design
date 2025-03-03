import Header from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Outlet } from "react-router";
import { useSearchParams , useNavigate} from "react-router";
import ProductDetailSidebar from "@/components/products/ProductDetailSidebar";
import {  useEffect } from "react";

const AppLayout = () => {
  const [searchParams] = useSearchParams();
  const sortFilter = searchParams.get("sortFilter");
  const productCard = searchParams.get("productCard");
  let storeCode = searchParams.get("storeCode") || localStorage.getItem("storeCode");
  const navigate = useNavigate();

  useEffect(() => {
    if (storeCode) {
      localStorage.setItem("storeCode", storeCode);
    } else {
      // If storeCode is missing, redirect with stored value
      const storedStoreCode = localStorage.getItem("storeCode");
      if (storedStoreCode) {
        navigate(`?storeCode=${storedStoreCode}`, { replace: true });
      }
    }
  }, [storeCode, navigate]);

  console.log(sortFilter);
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
          <Sidebar sortFilter={sortFilter ? true : false} storeCode={storeCode || ""}/>
          <div className="flex-1 w-full">
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
        <div
          className={`fixed z-50  ${
            sortFilter ? "ml-56" : productCard ? "ml-28" : "ml-36"
          }`}
        >
          <Header
            isSortFilter={sortFilter ? true : false}
            isProductCard={productCard ? true : false}
          />
        </div>
        {sortFilter && <Sidebar isRightSidebar={true}  storeCode={storeCode || ""} />}
        {productCard && <ProductDetailSidebar />}
      </div>
    </>
  );
};

export default AppLayout;
