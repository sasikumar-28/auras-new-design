import Header from "@/components/header";
import CategoriesList from "@/components/categories/categories-list";
import NewAarrivals from "@/components/products/new-arrivals/new-arrivals";
import BestSellarsInKitchen from "@/components/products/kitchen/best-sellars-in-kitchen";
import TrendingProducts from "@/components/products/trending-products";
import CarouselSection from "@/components/carousel";
import SalesBanner from "@/components/sales-banner";
import TanyaShoppingAssistant from "@/components/tanya-shopping-assistant/tanya-shopping-assistant";

const Home = () => {
  return (
    <div className="flex flex-col h-[94vh] overflow-hidden">
      {/* Fixed Header */}
      <div className="fixed z-50">
        <Header />
      </div>

      {/* Main Content */}
      <div className="flex flex-col mt-[6rem] h-full">
        {/* Categories Section (Fixed) */}
        <CategoriesList />
        <div className="fixed right-3 bottom-5 z-50">
          <TanyaShoppingAssistant />
        </div>
        {/* Scrollable Section */}
        <div className="mt-[8rem] overflow-y-auto scrollbar-none p-4">
          <CarouselSection />
          <TrendingProducts />
          {/* special sale */}
          <SalesBanner />
          <BestSellarsInKitchen />
          <NewAarrivals />
        </div>
      </div>
    </div>
  );
};

export default Home;
