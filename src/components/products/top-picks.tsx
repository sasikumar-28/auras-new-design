import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/getAccessToken";

interface Product {
  id: string;
  title: string;
  image: string; // Updated to match API response
  price: number; // Updated to match API response
}

interface Category {
  categoryId: string;
  categoryName: string;
}

const TopPicks: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const REQUIRED_CATEGORIES = ["HAIR", "TOYS", "ACCESSORIES", "BAGS"];

  const getAllCategories = async () => {
    try {
      const token = await getAccessToken();
      const URL = `http://localhost:5000/api/mycategories`;

      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Filter categories to include only the required ones
        return response.data.filter((category: Category) =>
          REQUIRED_CATEGORIES.includes(category.categoryName)
        );
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      setError(error.message || "Failed to fetch categories");
      return [];
    }
  };

  const getProductByCategory = async (categoryId: string) => {
    try {
      const token = await getAccessToken();
      const URL = `http://localhost:5000/api/mycategories/${categoryId}?limit=1`;

      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.length > 0) {
        return response.data[0]; // Return the first product
      }
    } catch (error) {
      console.error(
        `Error fetching product for category ${categoryId}:`,
        error
      );
    }
    return null;
  };

  const fetchTopPicksProducts = async () => {
    try {
      setLoading(true);
      const categories = await getAllCategories(); // Get specific categories

      const productsPromises = categories.map((category: Category) =>
        getProductByCategory(category.categoryId)
      );

      const productsResults = await Promise.all(productsPromises);

      // Filter out null responses (if a category has no products)
      const filteredProducts = productsResults.filter(
        (product) => product !== null
      ) as Product[];

      setProducts(filteredProducts);
    } catch (error: any) {
      console.error("Error fetching trending products:", error);
      setError(error.message || "Failed to fetch trending products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopPicksProducts();
  }, []);

  if (loading) return <div>Loading top picks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-[#F2F2F2] p-5 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Top Picks for You</h2>
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

export default TopPicks;