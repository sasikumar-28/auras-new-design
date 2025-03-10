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

const TrendingProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getAllCategories = async () => {
    try {
      const token = await getAccessToken();
      const storeCode = localStorage.getItem("storeCode") || "defaultStore"; // Get storeCode dynamically
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
        return response.data.slice(0, 4); // Ensure only 4 categories are returned
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
      const URL = `${
        import.meta.env.VITE_SERVER_BASE_URL
      }api/productByCategoryId/${categoryId}?limit=1`;

      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.hits.length > 0) {
        return response.data.hits[0]; // Return the first product
      }
    } catch (error) {
      console.error(
        `Error fetching product for category ${categoryId}:`,
        error
      );
    }
    return null;
  };

  const fetchTrendingProducts = async () => {
    try {
      setLoading(true);
      const categories = await getAllCategories(); // Get categories

      const productsPromises = categories.map((category: Category) =>
        getProductByCategory(category.children[0].categoryId)
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
    fetchTrendingProducts();
  }, []);

  if (loading) return <div>Loading trending products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-[#F2F2F2] p-5 rounded-xl mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Trending products you may like
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex bg-white p-4 drop-shadow-lg rounded-xl h-24 gap-9"
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.title || "Product Image"}
                className="w-22 h-full object-cover rounded-md mb-2"
              />
            ) : (
              <div className="w-22 h-full bg-gray-200 rounded-md mb-2 flex items-center justify-center">
                <span className="text-xs text-gray-500">No Image</span>
              </div>
            )}
            <div className="text-sm">
              <p className="line-clamp-2">{product.title || "No Title"}</p>
              <p className="font-bold">
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

export default TrendingProducts;
