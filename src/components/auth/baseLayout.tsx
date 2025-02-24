import { useEffect, useState } from "react";
import "./auth.css";
const carouselData = [
  {
    image: "/images/iphone16.png",
    className: "w-[442px] h-[442px]",
    text: "ELECTRONICS",
  },
  {
    image: "/images/bags.png",
    className: "w-[442px] h-[442px]",
    text: "B A G S",
  },
  {
    image: "/images/headphones.png",
    className: "w-[442px] h-[442px]",
    text: "ELECTRONICS",
  },
];
const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-[100vw] h-[100vh] bg-red-300">
      <div className="w-4/6 bg-blue-200 relative">
        <div className="flex justify-between items-center w-full absolute top-7 p-4">
          <img
            src="/images/auras_logo_white_large.png"
            className="w-[79px] h-[71px]"
          />
          <img
            src="/images/aspire_systems_logo_white.png"
            className="w-[166px] h-[92px]"
          />
        </div>
        <div className="absolute h-full w-full flex justify-center items-center text-center opacity-70">
          <div className="baseFont">{carouselData[currentIndex].text} </div>
        </div>
        <div className="absolute h-full w-full flex justify-center items-center text-center top-1 opacity-70">
          <div className="baseFont">{carouselData[currentIndex].text} </div>
        </div>
        <div className="absolute h-full w-full flex justify-center items-center">
          <img
            src={carouselData[currentIndex].image}
            className={`${carouselData[currentIndex].className} transition-all slide-in-from-left-10`}
          />
        </div>
        <div className="absolute flex bottom-3 gap-2 justify-center w-full">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`rounded-full h-3 w-3 transition-all ${
                currentIndex === i ? "bg-white" : ""
              }`}
              style={{ border: "1px solid white" }}
            ></div>
          ))}
        </div>
      </div>
      <div className="w-2/6 h-full">{children}</div>
    </div>
  );
};

export default BaseLayout;
