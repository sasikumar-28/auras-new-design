import CarouselSection from "@/components/carousel";
import TanyaShoppingAssistantStream from "@/components/tanya-shopping-assistant/tanya-shopping-assistant-stream";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import DefaultSkeleton from "@/components/landingPage/DefaultSkeleton";
import {
  fetchCarouselImages,
  fetchSquareImages,
} from "@/store/reducers/cmsReducer";
import type { AppDispatch } from "@/store";

const Home = () => {
  const [searchParams] = useSearchParams();
  const storeCode =
    searchParams.get("storeCode") || localStorage.getItem("storeCode") || "";

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (storeCode) {
      dispatch(fetchCarouselImages(storeCode));
      dispatch(fetchSquareImages(storeCode));
    }
  }, [dispatch, storeCode])

  return (
    <div className="flex flex-col h-[94vh] overflow-hidden">
      {/* Main Content */}
      <div className="flex flex-col mt-[8rem] h-full">
        {/* Categories Section (Fixed) */}
        {/* <CategoriesList /> */}
        <div className="fixed left-3 bottom-5 z-50">
          {/* <TanyaShoppingAssistant /> */}
          <TanyaShoppingAssistantStream />
        </div>
        {/* Scrollable Section */}
        <div className="overflow-y-auto scrollbar-none p-4">
          <CarouselSection />
          <DefaultSkeleton />
          {/* {storeCode == "applebees" ? (
            <AppleBeesItemDisplay />
          ) : (
            <>
              <TrendingProducts />
              <SalesBanner />
              <BestSellersInToys />
              <NewAarrivals />
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
