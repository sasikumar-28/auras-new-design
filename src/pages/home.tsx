import CategoriesList from "@/components/categories/categories-list";
import NewAarrivals from "@/components/products/new-arrivals/new-arrivals";
import BestSellersInToys from "@/components/products/toys/best-sellers-in-toys";
import TrendingProducts from "@/components/products/trending-products";
import CarouselSection from "@/components/carousel";
import SalesBanner from "@/components/sales-banner";
// import TanyaShoppingAssistant from "@/components/tanya-shopping-assistant/tanya-shopping-assistant";
import TanyaShoppingAssistantStream from "@/components/tanya-shopping-assistant/tanya-shopping-assistant-stream";
import { useSearchParams } from "react-router-dom";
import AppleBeesItemDisplay from "@/components/AppleBeesItemDisplay";

const Home = () => {
  const [searchParams] = useSearchParams();
  const storeCode =
    searchParams.get("storeCode") || localStorage.getItem("storeCode");
  return (
    <div className="flex flex-col h-[94vh] overflow-hidden">
      {/* Main Content */}
      <div className="flex flex-col mt-[6rem] h-full">
        {/* Categories Section (Fixed) */}
        <CategoriesList />
        <div className="fixed right-3 bottom-5 z-50">
          {/* <TanyaShoppingAssistant /> */}
          <TanyaShoppingAssistantStream />
        </div>
        {/* Scrollable Section */}
        <div className="mt-[8rem] overflow-y-auto scrollbar-none p-4">
          <CarouselSection />
          {storeCode == "applebees" ? (
            <AppleBeesItemDisplay />
          ) : (
            <>
              <TrendingProducts />
              <SalesBanner />
              <BestSellersInToys />
              <NewAarrivals />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
