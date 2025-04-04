import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import CarouselSection from "@/components/carousel";
import TanyaShoppingAssistantStream from "@/components/tanya-shopping-assistant/tanya-shopping-assistant-stream";
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
  }, [dispatch, storeCode]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col mt-[6.5rem] flex-1">
        {/* Scrollable Section */}
        <div className="overflow-y-auto scrollbar-none p-4 flex-1">
          <CarouselSection />
          <DefaultSkeleton />
        </div>
      </div>

      {/* Shopping Assistant */}
      <div className="fixed right-3 bottom-5 z-50">
        <TanyaShoppingAssistantStream />
      </div>
    </div>
  );
};

export default Home;
