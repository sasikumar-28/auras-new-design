import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import CategoryTabs from "@/components/categories/categoryTabs";
import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import useProductsByCategory from "@/hooks/useProductsByCategory";
import CategoryProductCard from "@/components/products/category-product-card";
import { getAccessToken } from "@/utils/getAccessToken";

interface Category {
  categoryId: string;
  categoryName: string;
}

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const token = await getAccessToken();
        const storeCode = localStorage.getItem("storeCode") || "defaultStore"; // Get storeCode dynamically
        if (!storeCode) {
          throw new Error("Store code is missing");
        }
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }api/mycategories?storeCode=${storeCode}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          setCategories(response.data);
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (error: any) {
        console.error("Error fetching categories:", error);
        setError(error.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProductsByCategory({ categoryId: categoryFromUrl });

  const initialActiveTab =
    categories.findIndex((c) => c.categoryId === categoryFromUrl) ?? 0;
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  useEffect(() => {
    setActiveTab(initialActiveTab);
  }, [categoryFromUrl, categories]);

  if (categoriesLoading)
    return <div className="p-4">Loading categories...</div>;
  if (categoriesError)
    return (
      <div className="p-4 mt-20 text-red-500">Error: {categoriesError}</div>
    );

  return (
    <div className="mt-20 w-full">
      <CategoryTabs
        data={categories}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <BreadCrumb
        list={[
          { name: "Home", link: "/" },
          {
            name: categories[activeTab]?.categoryName || "Category",
            link: `/product-listing?category=${
              categories[activeTab]?.categoryId || ""
            }&sortFilter=true`,
          },
        ]}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-6 mt-4 mb-24 h-[65vh] overflow-y-auto">
        {productsLoading ? (
          <div>Loading products...</div>
        ) : productsError ? (
          <div className="p-4 mt-20 text-red-500">Error: {productsError}</div>
        ) : (
          products.map((product, index) => (
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
          ))
        )}
      </div>

      <div className="mb-10"></div>
    </div>
  );
};

export default ProductListingPage;
