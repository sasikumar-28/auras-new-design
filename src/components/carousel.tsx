import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { getContentfulImages } from "@/contentful/getContentfulImages";
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
          console.log(data, "datamy");
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

  useEffect(() => {
    const getCarouselImages = async () => {
      const storeCode = localStorage.getItem("storeCode");
      try {
        const images = await getContentfulImages(
          storeCode == "applebees" ? storeCode : "bannerImagesSecond"
        );
        console.log(images, "the images");
        // setImages(images);
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
        return [];
      }
    };
    getCarouselImages();
  }, []);

  if (images.length === 0) return <p>Not found</p>;

  return (
    <>
      <div className="mb-3">
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
                <div>
                  <img src={image} alt={"Carousel"} />
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
