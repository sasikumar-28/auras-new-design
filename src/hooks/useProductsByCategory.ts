import { useEffect, useState } from "react";
import axios from "axios";

/**
 * Custom hook to fetch products by category.
 *
 * @param params - Object containing parameters to control the query.
 * @param params.limit - The maximum number of products to fetch per category (default is 1).
 * @param params.offset - The starting point to fetch products from (default is 0).
 * @param params.categoryId - The ID of the specific category to fetch products from. If null, fetches from all categories.
 */

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}

const useProductsByCategory = ({
  categoryId,
}: {
  categoryId: string | null;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) return; // Don't fetch if categoryId is null

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}api/productByCategoryId/${categoryId}`,
          {
            params: { limit: 100, offset: 1 },
            headers: { "Content-Type": "application/json" },
          },
        );

        if (response.status === 200) {
          setProducts(response.data.hits);
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (error: any) {
        console.error("Error fetching products:", error);
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return { products, loading, error };
};

export default useProductsByCategory;
