import { useSelector } from "react-redux";
import CategoryProductList from "./CategoryProductList";
import { RootState } from "@/store";

const DefaultSkeleton = () => {
  const { homePageCategories, storeCode } = useSelector((state: RootState) => 
    state?.store?.store ?? { homePageCategories: [], storeCode: "" });
  
  const squareImages = useSelector((state: RootState) => state.cmsImage.squareImages);
  const selectedCategories = homePageCategories?.slice(0, 3) || [];


  return (
    <div className="mb-10">
      {selectedCategories?.map((category, index) => (
        <CategoryProductList
          key={index}
          category={category}
          index={index}
          bannerImages={squareImages}
          storeCode={storeCode}
        />
      ))}
    </div>
  );
};

export default DefaultSkeleton;
