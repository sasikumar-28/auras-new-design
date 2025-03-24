import { Store } from "@/graphQL/queries/types";
import { useSelector } from "react-redux";
import CategoryProductList from "./CategoryProductList";
import { RootState } from "@/store";

const DefaultSkeleton = () => {
  const { homePageCategories, storeCode }: Store = useSelector(
    (state: any) => state.store.store
  );

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
