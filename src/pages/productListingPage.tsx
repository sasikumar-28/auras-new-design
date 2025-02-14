import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/graphQL/queries/queries";
import { CategoriesResponse } from "@/graphQL/queries/types";
import CategoryTabs from "@/components/categories/categoryTabs";
import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import useProductsByCategory from "@/hooks/useProductsByCategory";
import CategoryProductCard from "@/components/products/category-product-card";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const { products } = useProductsByCategory({
    limit: 100,
    offset: 1,
    categoryId: categoryFromUrl,
  });

  const { loading, error, data } = useQuery<CategoriesResponse>(GET_CATEGORIES);
  const initialActiveTab =
    data?.categories.results.findIndex((c) => c.id === categoryFromUrl) ?? 0;

  const [activeTab, setActiveTab] = useState(initialActiveTab);
  useEffect(() => {
    setActiveTab(initialActiveTab);
  }, [categoryFromUrl, data]);

  if (loading) return <div className="p-4">Loading categories...</div>;
  if (error)
    return <div className="p-4 mt-20 text-red-500">Error: {error.message}</div>;
  if (!data) return <div className="p-4 mt-20 text-red-500">No data</div>;

  return (
    <div className="mt-20 w-full">
      <CategoryTabs
        data={data}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <BreadCrumb
        list={[
          { name: "Home", link: "/" },
          {
            name: data?.categories.results[activeTab]?.name || "Category",
            link: `/product-listing?category=${
              data?.categories.results[activeTab]?.id || ""
            }&sortFilter=true`,
          },
        ]}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-6 mt-4 mb-24 h-[65vh] overflow-y-auto">
        {products.map((product, index) => (
          <CategoryProductCard
            key={product.id}
            product={product}
            index={index}
            categoryId={categoryFromUrl || ""}
            className={`relative rounded-xl transition-all flex flex-col justify-between p-4 
        ${
          index % 10 === 0
            ? "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2 h-[50vh] sm:h-[60vh]"
            : "h-[25vh] sm:h-[30vh]"
        }
      `}
          />
        ))}
      </div>

      <div className="mb-10"></div>
    </div>
  );
};

export default ProductListingPage;
