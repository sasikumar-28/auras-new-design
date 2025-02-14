import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import CategoryTabs from "@/components/categories/categoryTabs";
import { GET_CATEGORIES } from "@/graphQL/queries/queries";
import { CategoriesResponse } from "@/graphQL/queries/types";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
const ProductDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const { id } = useParams();
  const { loading, error, data } = useQuery<CategoriesResponse>(GET_CATEGORIES);
  const initialActiveTab =
    data?.categories.results.findIndex((c) => c.id === categoryFromUrl) ?? 0;

  const [activeTab, setActiveTab] = useState(initialActiveTab);
  useEffect(() => {
    setActiveTab(initialActiveTab);
  }, [categoryFromUrl, data]);

  if (loading) return <div className="p-4">Loading categories...</div>;
  if (error) return <div className="p-4">Error loading categories...</div>;
  if (!data) return <div className="p-4">No data found</div>;
  return (
    <div className="mt-20 w-ful">
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
          {
            name: data?.categories.results[activeTab]?.name || "Product",
            link: `/product/${id}?category=${
              data?.categories.results[activeTab]?.id || ""
            }&productCard=true`,
          },
        ]}
      />
      <div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ProductDetailsPage;
