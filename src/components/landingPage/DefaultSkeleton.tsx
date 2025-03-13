import { Store } from "@/graphQL/queries/types";
import { useSelector } from "react-redux";
import CategoryProductList from "./CategoryProductList";

const DefaultSkeleton = () => {
  const { homePageCategories, otherImages, storeCode }: Store = useSelector(
    (state: any) => state.store.store
  );

  return (
    <div className="mb-10">
      {homePageCategories?.map((category, index) => (
        <CategoryProductList
          key={index}
          category={category}
          index={index}
          bannerImages={otherImages.web}
          storeCode={storeCode}
        />
      ))}
    </div>
  );
};

export default DefaultSkeleton;
