import { useEffect, useState } from "react";
import TopPicks from "./products/top-picks";
import { getContentfulImages } from "@/contentful/getContentfulImages";

const SalesBanner = () => {
  const [salesBanner, setSalesBanner] = useState<string[]>([]);

  useEffect(() => {
    const getSalesBanner = async () => {
      try {
        const images = await getContentfulImages("commerceCatalystSalesBanner");
        setSalesBanner(images);
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
        return [];
      }
    };
    getSalesBanner();
  }, []);

  return (
    <div>
      <div className="relative flex flex-wrap gap-4 my-10 h-80">
        <div className="relative flex flex-col bg-[#EBE2F4] p-4 pt-32 drop-shadow-lg rounded-xl w-[32%] h-60 mt-16">
          <img
            src={salesBanner[0]}
            width={200}
            alt="square image 1"
            className="absolute -top-14 right-0 object-cover rounded-md mb-2"
          />
          <div className="absolute flex bottom-0 text-sm pb-4">
            <p className="text-3xl w-2/3">SPECIAL SALE 60% OFFER</p>
            <button className="absolute  w-16 font-bold px-1 py-4 right-3 bottom-3 bg-[#552864] rounded-3xl text-white text-xs">
              SHOP NOW
            </button>
          </div>
        </div>

        <div className="relative flex flex-col bg-[#D3F1EC] p-4 drop-shadow-lg rounded-xl w-[32%] h-60 ">
          <img
            src={salesBanner[1]}
            width={250}
            alt="square image 1"
            className="absolute -bottom-24 right-14 object-cover rounded-md mb-2"
          />
          <div className="absolute flex top-0 text-sm pt-4">
            <p className="text-3xl w-2/3">SPECIAL SALE 80% OFFER</p>
            <button className="absolute  w-16 font-bold px-1 py-4 right-3 top-3 bg-[#065E9E] rounded-3xl text-white text-xs">
              SHOP NOW
            </button>
          </div>
        </div>

        <div className="relative flex flex-col bg-[#EFEFEF] p-4 drop-shadow-lg rounded-xl w-[32%] h-60  mt-16">
          <img
            src={salesBanner[2]}
            width={250}
            alt="square image 1"
            className="absolute -top-14 right-0 object-cover rounded-md mb-2"
          />
          <div className="absolute w-full flex justify-between bottom-0 text-sm pb-4">
            <div className="flex flex-col">
              <p className="text-3xl ">DISCOUNT </p>
              <p className="text-3xl"> SALE</p>
              <p className="text-3xl">UPTO 20%</p>
            </div>
            <button className="absolute w-16 font-bold px-1 py-4 right-6 bottom-3 bg-[#552864] rounded-3xl text-white text-xs">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <TopPicks />
      </div>

      {/* FASHION SALE */}
      <div className="flex flex-wrap gap-4 mb-6 h-64 pt-10">
        <div className="flex  bg-[#9A9576] p-4 drop-shadow-lg rounded-xl h-48 w-[48%]">
          <img
            src={salesBanner[3]}
            width={200}
            alt="square image 1"
            className="absolute -bottom-2 object-cover rounded-md mb-2"
          />
          <div className="absolute  left-1/2 text-sm">
            <p className="text-3xl w-1/2 text-white mb-3">WOMENS FASION SALE</p>
            <button className="px-5 py-2 bg-[#57492B] rounded text-white text-xs font-bold">
              SHOP NOW
            </button>
          </div>
        </div>

        <div className="flex flex-col bg-[#ABAFB2] p-4 drop-shadow-lg rounded-xl h-48 w-[48%]">
          <img
            src={salesBanner[4]}
            width={200}
            alt="square image 1"
            className="absolute -bottom-2 object-cover rounded-md mb-2"
          />
          <div className="absolute  left-1/2 text-sm">
            <p className="text-3xl w-1/2 text-white mb-3">MENS FASION SALE</p>
            <button className="px-5 py-2 bg-[#57595A] rounded text-white text-xs font-bold">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesBanner;
