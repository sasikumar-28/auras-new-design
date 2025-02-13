import React, { useEffect, useState } from "react";
import { CategoriesResponse, Category } from "@/graphQL/queries/types";
import { Icon } from "@iconify/react";
import BreadCrumb from "../breadcrumb/BreadCrumb";
import { useNavigate, useSearchParams } from "react-router-dom";
import useProductsByCategory from "@/hooks/useProductsByCategory";
import CategoryProductCard from "../products/category-product-card";

const CategoryTabs = ({ data }: { data: CategoriesResponse }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const { products, loading, error } = useProductsByCategory({
    limit: 100, // Number of products per category
    offset: 1, // Starting point for fetching
    categoryId: categoryFromUrl,
  });

  const initialActiveTab =
    data?.categories.results.findIndex((c) => c.id === categoryFromUrl) ?? 0;

  const [activeTab, setActiveTab] = useState(initialActiveTab);

  useEffect(() => {
    setActiveTab(initialActiveTab);
  }, [categoryFromUrl, data]);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-4">
        {/* Tabs Container */}
        <div className="flex space-x-4 border-b border-gray-300 w-full">
          {data?.categories.results.map((category: Category, index: number) => (
            <button
              key={index}
              className={`relative px-4 py-2 text-gray-600 font-medium transition-all 
              ${activeTab === index ? "text-[#1E1E1E]" : "hover:text-primary"}`}
              onClick={() => {
                setActiveTab(index);
                navigate(
                  `/product-listing?category=${category.id}&sortFilter=true`
                );
              }}
            >
              {category.name}
              {/* Active indicator */}
              {activeTab === index && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#B93284]"></span>
              )}
            </button>
          ))}
        </div>

        {/* Sort Icon with Badge */}
        <div className="relative bg-[#B93284] rounded-full p-2 cursor-pointer">
          <Icon
            icon="mdi:sort"
            className="text-white text-2xl transition"
            height={17}
            width={17}
          />
        </div>
      </div>

      {/* Breadcrumb Component */}
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-6 mt-4 mb-24 h-[65vh] overflow-y-auto">
        {products.map((product, index) => (
          <CategoryProductCard
            key={product.id}
            product={product}
            index={index}
            className={`relative rounded-xl transition-all flex flex-col justify-between p-4 
        ${
          index === 0
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

export default CategoryTabs;
