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

const BestSellarsInKitchen: React.FC = () => {
  const [toysProducts, setToysProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const REQUIRED_CATEGORY_NAME = "BEAUTY"; // Required category name

  const fetchCategories = async () => {
    try {
      const token = await getAccessToken();
      const categoriesResponse = await axios.get(
        "http://localhost:5000/api/mycategories", // Endpoint to fetch categories
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (categoriesResponse.status === 200) {
        const categories: Category[] = categoriesResponse.data;
        const toysCategory = categories.find(
          (category) =>
            category.categoryName.toLowerCase() ===
            REQUIRED_CATEGORY_NAME.toLowerCase()
        );

        if (toysCategory) {
          // Fetch products for the "TOYS" category
          const products = await getProductByCategory(toysCategory.categoryId);
          // Limit to 4 products
          setToysProducts(products.slice(0, 4));
        } else {
          setError(`Category "${REQUIRED_CATEGORY_NAME}" not found.`);
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
      const URL = `http://localhost:5000/api/mycategories/${categoryId}`;

      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.length > 0) {
        return response.data; // Return all products
      }
    } catch (error) {
      console.error(
        `Error fetching products for category ${categoryId}:`,
        error
      );
    }
    return [];
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <div className="p-4">Loading categories...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-[#F2F2F2] p-5 rounded-xl mb-6">
      <h2 className="text-xl font-semibold mb-4">Best Sellers in Beauty</h2>
      <div className="grid grid-cols-4 gap-4">
        {toysProducts.map((product) => (
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
              {/* Title with truncation */}
              <p
                className="text-sm font-medium truncate overflow-hidden text-ellipsis whitespace-nowrap"
                title={product.title}
              >
                {product.title || "No Title"}
              </p>
              {/* Price */}
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

export default BestSellarsInKitchen;
