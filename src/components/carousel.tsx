/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { getAccessToken } from "@/utils/getAccessToken";
import axios from "axios";

const CarouselSection = () => {
  const [images, setImages] = useState<string[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    const fetchLogo = async () => {
      const storeCode = localStorage.getItem("storeCode");
      try {
        const token = await getAccessToken();
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }api/logo?storeCode=${storeCode}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;
          setImages(data.carouselImages.web);
        } else {
          throw new Error("Failed to fetch logo details");
        }
      } catch (error: any) {
        console.error("Error fetching logo details:", error);
      }
    };

    fetchLogo();
  }, []);

  // useEffect(() => {
  //   const getCarouselImages = async () => {
  //     const storeCode = localStorage.getItem("storeCode");
  //     try {
  //       const images = await getContentfulImages(
  //         storeCode == "applebees" ? storeCode : "bannerImagesSecond"
  //       );
  //       // setImages(images);
  //     } catch (error) {
  //       console.error("Error fetching Contentful data:", error);
  //       return [];
  //     }
  //   };
  //   getCarouselImages();
  // }, []);

  return (
    <>
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
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="w-full flex justify-center ">
                  <img
                    src={image}
                    alt={"Carousel"}
                    className="rounded-[10px]"
                  />
                  {/* {image} */}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="py-3 text-center">
          <div className="flex justify-center space-x-2">
            {Array.from({ length: 3 }).map((_, index) => (
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
    </>
  );
};

export default CarouselSection;
