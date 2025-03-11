/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/getAccessToken";
import { useSearchParams } from "react-router-dom";
import { Product } from "./products/top-picks";

const description = [
  {
    categoryID: "96",
    carouselTitle: "Start with a Crunch - Appetizers That Steal the Spotlight!",
  },
  {
    categoryID: "104",
    carouselTitle: "Sip, Savor, Refresh - Perfect Beverages for Every Moment!",
  },
  {
    categoryID: "112",
    carouselTitle: "Sweeten Every Moment - Indulge in Irresistible Desserts!",
  },
];

interface CategoryChild {
  categoryId: string;
  categoryName: string;
}

interface Category {
  categoryId: string;
  categoryName: string;
  children: CategoryChild[];
}

interface CategoryWithProducts {
  categoryId: string;
  categoryName: string;
  products: Product[];
  categoryDescription?: string;
}

const AppleBeesItemDisplay = () => {
  const [searchParams] = useSearchParams();
  const [categoriesWithProducts, setCategoriesWithProducts] = useState<
    CategoryWithProducts[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const storeCode =
    searchParams.get("storeCode") || localStorage.getItem("storeCode");

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
      console.error("Error fetching categories:", error);
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
        return response.data.hits.slice(0, 6); // Limit to 6 products
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

      if (categories.length > 0) {
        const firstSixCategories = categories.slice(0, 6);
        const categoriesData: CategoryWithProducts[] = [];

        for (const category of firstSixCategories) {
          let allProducts: Product[] = [];

          // Get products from child categories
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
            categoriesData.push({
              categoryId: category.categoryId,
              categoryName: category.categoryName,
              products: allProducts.slice(0, 8), // Ensure only 6 products
            });
          }
        }

        setCategoriesWithProducts(categoriesData);
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
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const bannerImages = [
    "/images/banner-images/image (2).jpeg",
    "/images/banner-images/image (1).jpeg",
    "/images/banner-images/image.jpeg",
    "/images/banner-images/image (1).jpeg",
    "/images/banner-images/image (2).jpeg",
    "/images/banner-images/image.jpeg",
    "/images/banner-images/image (2).jpeg",
    "/images/banner-images/image.jpeg",
    "/images/banner-images/image (1).jpeg",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-16 mb-16">
      {categoriesWithProducts.slice(0, 3).map((category, index) => (
        <div key={category.categoryId} className="space-y-8">
          {/* Main Category Name */}
          <h2 className="text-2xl font-bold text-[#1E1E1E] text-center mb-8">
            {
              description.find((c) => c.categoryID == category.categoryId)
                ?.carouselTitle
            }
          </h2>

          {/* Products Grid - Centered */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 justify-items-center">
              {category.products.map((product) => (
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
                alt={`${category.categoryName} banner`}
                className="h-80 w-80 rounded-[10px] mr-4"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppleBeesItemDisplay;
