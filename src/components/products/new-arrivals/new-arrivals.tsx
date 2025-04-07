import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/getAccessToken";

interface Category {
  categoryId: string;
  categoryName: string;
}

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const REQUIRED_CATEGORY_NAMES = ["WOMEN'S CLOTHING", "BAGS"]; // Multiple categories

  const getAllCategories = async () => {
    try {
      const token = await getAccessToken();

      const storeCode = localStorage.getItem("storeCode") || "defaultStore";
      if (!storeCode) {
        throw new Error("Store code is missing");
      }

      const categoriesResponse = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}api/mycategories?storeCode=${storeCode}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (categoriesResponse.status === 200) {
        const categories: Category[] = categoriesResponse.data;

        // Find categories matching REQUIRED_CATEGORY_NAMES
        const matchedCategories = categories.filter((category) =>
          REQUIRED_CATEGORY_NAMES.includes(category.categoryName.toUpperCase()),
        );

        if (matchedCategories.length > 0) {
          const allProducts: Product[] = [];

          // Fetch products for each matched category
          for (const matchedCategory of matchedCategories) {
            const categoryProducts = await getProductByCategory(
              matchedCategory.categoryId,
            );
            allProducts.push(...categoryProducts);
          }

          setProducts(allProducts.slice(0, 4)); // Show only 4 products
        } else {
          setError(
            `Categories "${REQUIRED_CATEGORY_NAMES.join(", ")}" not found.`,
          );
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const getProductByCategory = async (categoryId: string) => {
    try {
      const token = await getAccessToken();
      const URL = `${import.meta.env.VITE_SERVER_BASE_URL}api/productByCategoryId/${categoryId}`;

      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.hits.length > 0) {
        return response.data.hits;
      }
    } catch (error) {
      console.error(
        `Error fetching products for category ${categoryId}:`,
        error,
      );
    }
    return [];
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  if (loading) return <div className="p-4">Loading categories...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-[#F2F2F2] p-5 rounded-xl mb-32">
      <h2 className="text-xl font-semibold mb-4">New Arrivals</h2>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex bg-white p-4 drop-shadow-lg rounded-xl h-28 gap-4 items-center"
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.title || "Product Image"}
                className="w-20 h-20 object-cover rounded-md"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                <span className="text-xs text-gray-500">No Image</span>
              </div>
            )}
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              <p
                className="text-sm font-medium truncate overflow-hidden text-ellipsis whitespace-nowrap"
                title={product.title}
              >
                {product.title || "No Title"}
              </p>
              <p className="text-sm font-bold text-gray-700 mt-1">
                {product.price !== undefined
                  ? `$${product.price.toFixed(2)}`
                  : "Price Unavailable"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
