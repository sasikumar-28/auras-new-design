/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const CarouselSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  const images = useSelector(
    (state: RootState) => state.cmsImage.carouselImages,
  );

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mb-3 flex justify-center items-center flex-col w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {images?.map((image, index) => (
            <CarouselItem key={index}>
              <div className="w-full flex justify-center ">
                <img src={image} alt="Carousel" className="rounded-[10px]" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="py-3 text-center">
        <div className="flex justify-center space-x-2">
          {images &&
            images.length > 1 &&
            images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  current === index + 1
                    ? "bg-[#552864] border border-[#552864]"
                    : "bg-[#FFFFFF] border border-[#552864]"
                }`}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselSection;
