import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/graphQL/queries/queries";
import { CategoriesResponse } from "@/graphQL/queries/types";
import CategoryTabs from "@/components/categories/categoryTabs";

const ProductListingPage = () => {
  const { loading, error, data } = useQuery<CategoriesResponse>(GET_CATEGORIES);
  if (loading) return <div className="p-4">Loading categories...</div>;
  if (error)
    return <div className="p-4 mt-20 text-red-500">Error: {error.message}</div>;
  if (!data) return <div className="p-4 mt-20 text-red-500">No data</div>;

  return (
    <div className="mt-20 ">
      <CategoryTabs data={data} />
    </div>
  );
};

export default ProductListingPage;
