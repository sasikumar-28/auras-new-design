/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category, homePageCategories, Product } from "@/graphQL/queries/types";
import { getAccessToken } from "@/utils/getAccessToken";
import axios from "axios";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


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
        category: string
      }[]
    | Product[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();


  const store = useSelector((s: any) => s.store.store);


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

  const getProductsByCategory = async (categoryId: string, pageNum: number) => {
    try {
      const limit = 4;
      const token = await getAccessToken();

      const URL = `${
        import.meta.env.VITE_SERVER_BASE_URL
      }api/productByCategoryId/${categoryId}?storeCode=${storeCode}&hitsPerPage=${limit}&page=${pageNum}`;

      console.log(`Requesting: ${URL}`);

      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "x-search-endpoint": store?.searchConfigs?.endpoint,
        },
      });

      console.log("API Response:", response.data);

      if (response.status === 200 && response.data.hits?.length > 0) {
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

  const fetchCategoryProducts = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      setProducts([]); // Clear products while loading

      const categories: Category[] = await getAllCategories();

      const slicedCategories = categories
        .filter((c: any) => c.categoryId == category.categoryID)
        .slice(0, 3);

      const reqParamId = slicedCategories[0]?.requestParam?.join(",") || "";
      if (!reqParamId) {
        throw new Error("Request parameter ID is missing");
      }

      const products = await getProductsByCategory(reqParamId, pageNum);

      setProducts(products);
    } catch (error: any) {
      console.error("Error fetching category products:", error);
      setError(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts(page);
  }, [storeCode, page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div
      key={category.categoryID}
      className="space-y-8 max-w-6xl mx-auto relative"
    >
      <h2 className="text-2xl font-bold text-[#1E1E1E] text-center mb-8">
        {category.carouselTitle}
      </h2>

      <div className="relative max-w-6xl mx-auto">
        {/* Show error message if there's an error or no products */}
        {error || (!loading && products.length === 0) ? (
          <div className="text-center text-red-600 font-semibold">
            {error ? error : "No products available for this category."}
          </div>
        ) : (
          <>
            {/* Previous Button (Hidden if error or no products) */}
            {!loading && products.length > 0 && (
              <button
                className={`absolute left-[-45px] top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow-md transition z-10 ${
                  page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                <Icon
                  icon="mdi:chevron-left"
                  className="text-gray-700"
                  width={30}
                  height={30}
                />
              </button>
            )}

            {/* Products Grid or Skeleton Loader */}
            <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-300 animate-pulse p-4 rounded-xl shadow-xl w-full max-w-[250px] text-center"
                    >
                      <div className="aspect-square bg-gray-400 rounded-lg mb-4"></div>
                      <p className="h-6 bg-gray-400 rounded-md w-3/4 mx-auto mb-2"></p>
                      <p className="h-5 bg-gray-400 rounded-md w-1/2 mx-auto"></p>
                    </div>
                  ))
                : products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white p-4 rounded-xl shadow-xl cursor-pointer w-full max-w-[250px] text-center"
                      onClick={() => navigate(
                        `/product/${product.id}?category=${product?.category}`,
                      )}
                    >
                      <div className="aspect-square overflow-hidden rounded-lg mb-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover rounded-[10px]"
                        />
                      </div>
                      <p className="text-xl font-bold">${product.price}</p>
                      <h3 className="text-lg truncate mb-2">{product.title}</h3>
                    </div>
                  ))}
            </div>

            {/* Next Button (Hidden if error or no products) */}
            {!loading && products.length > 0 && (
              <button
                className="absolute right-[-45px] top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow-md transition z-10"
                onClick={handleNextPage}
                disabled={loading}
              >
                <Icon
                  icon="mdi:chevron-right"
                  className="text-gray-700"
                  width={30}
                  height={30}
                />
              </button>
            )}
          </>
        )}
      </div>

      {/* Banner Images */}
      <div className="flex justify-center mt-12">
        {bannerImages.slice(index * 2, index * 2 + 2).map((image, i) => (
          <img
            key={i}
            src={image}
            alt={`category banner`}
            className="p-[15px] w-1/2 object-cover rounded-[10px]"
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryProductList;
