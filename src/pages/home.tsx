import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CarouselSection from "@/components/carousel";
import TanyaShoppingAssistantStream from "@/components/tanya-shopping-assistant/tanya-shopping-assistant-stream";
import DefaultSkeleton from "@/components/landingPage/DefaultSkeleton";
import {
  fetchCarouselImages,
  fetchSquareImages,
} from "@/store/reducers/cmsReducer";
import type { AppDispatch, RootState } from "@/store";
import ScrollToTopButton from "@/components/ui/scroll-to-top";

const Home = () => {
  const [searchParams] = useSearchParams();
  const storeCode =
    searchParams.get("storeCode") || localStorage.getItem("storeCode") || "";
  const dispatch = useDispatch<AppDispatch>();

  const storeDetails = useSelector((state: RootState) => state.store.store);

  useEffect(() => {
    if (storeCode) {
      dispatch(fetchCarouselImages(storeCode));
      dispatch(fetchSquareImages(storeCode));
    }
  }, [dispatch, storeCode]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-col mt-[6.5rem] h-full">
        {/* Scrollable Section */}
        <div className="overflow-y-auto scrollbar-none p-4 h-full scrollable-content">
          <CarouselSection />
          <DefaultSkeleton />
        </div>

        {/* Shopping Assistant */}
        <div className="fixed right-3 bottom-5 z-50">
          <TanyaShoppingAssistantStream />
        </div>

        {/* Scroll-To-Top Button */}
        <div className="fixed right-3 bottom-[4rem] z-50">
          <ScrollToTopButton themeColor={storeDetails?.themeColor} />
        </div>
      </div>
    </div>
  );
};

export default Home;
