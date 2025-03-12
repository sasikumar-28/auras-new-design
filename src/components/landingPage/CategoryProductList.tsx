import { Category, homePageCategories, Product } from "@/graphQL/queries/types";
import { getAccessToken } from "@/utils/getAccessToken";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CategoryProductList = ({
  category,
  index,
  bannerImages,
  storeCode,
}: {
  category: homePageCategories;
  index: number;
  bannerImages: string[];
  storeCode: string;
}) => {
  const [products, setProducts] = useState<
    | {
        id: string;
        title: string;
        image: string;
        price: number;
      }[]
    | Product[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getAllCategories = async () => {
    try {
      const token = await getAccessToken();
      if (!storeCode) {
        throw new Error("Store code is missing");
      }
      const URL = `${
        import.meta.env.VITE_SERVER_BASE_URL
      }api/mycategories?storeCode=${storeCode}`;

      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (error: any) {
      setError(error.message || "Failed to fetch categories");
      return [];
    }
  };

  const getProductsByCategory = async (categoryId: string) => {
    try {
      const token = await getAccessToken();
      const URL = `${
        import.meta.env.VITE_SERVER_BASE_URL
      }api/productByCategoryId/${categoryId}?limit=6`;

      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 && response.data.hits.length > 0) {
        return response.data.hits; // Limit to 6 products
      }
    } catch (error) {
      console.error(
        `Error fetching products for category ${categoryId}:`,
        error
      );
    }
    return [];
  };

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      const categories: Category[] = await getAllCategories();

      const firstSixCategories = categories
        .filter((c) => c.categoryId == category.categoryID)
        .slice(0, 6);
      let categoriesData: Product[] = [];
      for (const category of firstSixCategories) {
        let allProducts: Product[] = [];

        if (storeCode == "applebees") {
          if (category.children && category.children.length > 0) {
            for (const childCategory of category.children) {
              const products = await getProductsByCategory(
                childCategory.categoryId
              );
              allProducts = [...allProducts, ...products];
              if (allProducts.length >= 8) break; // Stop once we have 6 products
            }
          }

          if (allProducts.length > 0) {
            categoriesData = allProducts.slice(0, 8);
          }
        } else {
          const products = await getProductsByCategory(category.categoryId);
          categoriesData = products;
        }

        setProducts(categoriesData);
      }
    } catch (error: any) {
      console.error("Error fetching category products:", error);
      setError(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [storeCode]);

  return (
    <div key={category.categoryID} className="space-y-8">
      {/* Main Category Name */}
      <h2 className="text-2xl font-bold text-[#1E1E1E] text-center mb-8">
        {category.carouselTitle}
      </h2>

      {/* Products Grid - Centered */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 justify-items-center">
          {products
            .slice(0, Math.min((products.length / 4) * 4, 8))
            .map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-xl shadow-xl w-full max-w-[300px] text-center"
              >
                <div className="aspect-square overflow-hidden rounded-lg mb-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                </div>
                <p className=" text-xl font-bold">${product.price}</p>
                <h3 className=" text-lg truncate mb-2">{product.title}</h3>
              </div>
            ))}
        </div>
      </div>

      {/* Banner image - Centered */}
      <div className="flex justify-center mt-12">
        {bannerImages.slice(index * 3, index * 3 + 3).map((image, i) => (
          <img
            key={i}
            src={image}
            alt={`category banner`}
            className="h-80 w-80 rounded-[10px] mr-4"
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryProductList;
