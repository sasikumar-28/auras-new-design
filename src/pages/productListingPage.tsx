import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import { ClipLoader } from "react-spinners";
import { getAccessToken } from "@/utils/getAccessToken";
import { useSelector } from "react-redux";
import PriceFacet from "@/components/PriceFacet";
import RatingFacet from "@/components/RatingFacet";
import Pagination from "@/components/Pagination";

interface Product {
  id: string;
  title: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

interface Category {
  categoryId: string;
  categoryName: string;
  children: Category[];
  requestParam: number[];
  active: boolean;
  attributes: unknown[];
  categoryDescription: string;
}

const ProductListingPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { categoryId, subCategoryId, subSubCategoryId } = useParams();
  const [productsError, setProductsError] = useState<string | null>(null);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [productDetails, setProductsDetails] = useState<Record<string, number>>(
    {},
  );
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState<string>("");
  const [selectedRatings, setSelectedRatings] = useState<string>("0TO5");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 60;

  const { categories, loading } = useSelector((state: any) => state?.category);

  // Only find selected category after categories are loaded and categoryId is available
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const store = useSelector((s: any) => s.store.store);

  useEffect(() => {
    if (categories && categoryId) {
      const category = categories.find(
        (c: Category) => c.categoryId === categoryId,
      );
      if (category) {
        setSelectedCategory(category);
      } else {
        setProductsError("Category not found");
        setProductsLoading(false);
      }
    }
  }, [categories, categoryId]);

  const findCategoryRequestParams = (
    categories: Category[],
    selectedCategoryIds: string[],
  ): number[] | null => {
    const currentCategoryId = selectedCategoryIds[0];
    const category = categories.find(
      (cat) => cat.categoryId === currentCategoryId,
    );
    if (!category) return null;

    if (selectedCategoryIds.length === 1) {
      return category.requestParam;
    }

    const subCategory = category.children.find(
      (child) => child.categoryId === selectedCategoryIds[1],
    );
    if (subCategory && selectedCategoryIds.length === 2) {
      return subCategory.requestParam;
    }

    if (subCategory && selectedCategoryIds.length === 3) {
      const subSubCategory = subCategory.children.find(
        (child) => child.categoryId === selectedCategoryIds[2],
      );
      return subSubCategory ? subSubCategory.requestParam : null;
    }

    return null;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryId) {
        setProductsError("Invalid Category ID");
        setProductsLoading(false);
        return;
      }

      // Ensure category is selected before fetching
      if (!selectedCategory) {
        setProductsError("Category not found");
        setProductsLoading(false);
        return;
      }

      const selectedCategoryIds = [
        categoryId,
        subCategoryId,
        subSubCategoryId,
      ].filter(Boolean);

      const filteredCategoryIds = selectedCategoryIds.filter(
        (id): id is string => typeof id === "string",
      );
      const requestParams = findCategoryRequestParams(
        categories,
        filteredCategoryIds,
      );

      if (!requestParams) {
        setProductsError("Invalid category or subcategory");
        setProductsLoading(false);
        return;
      }

      try {
        setProductsLoading(true);
        const token = await getAccessToken();
        const limit = 60;
        const URL = `${
          import.meta.env.VITE_SERVER_BASE_URL
        }api/productByCategoryId/${requestParams}?${priceRange ? `priceRange=${priceRange}&` : ""}ratingRange=${selectedRatings}&hitsPerPage=${limit}&page=${currentPage}`;

        const response = await axios.get(URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setProducts(response?.data?.hits);
          setProductsDetails(response?.data);
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (error: unknown) {
        console.error("Error fetching products:", error);

        if (error instanceof Error) {
          setProductsError(error.message);
        } else {
          setProductsError("Something went wrong");
        }
      } finally {
        setProductsLoading(false);
      }
    };

    // Fetch products only when categoryId is valid
    if (categoryId && selectedCategory) {
      fetchProducts();
    }
  }, [
    categoryId,
    subCategoryId,
    subSubCategoryId,
    categories,
    selectedCategory,
    currentPage,
    selectedRatings,
    priceRange,
  ]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handlePriceFilterChange = (min: number, max: number) => {
    setPriceRange(`${min}TO${max}`);
    console.log(`Filtering products between $${min} and $${max}`);
  };

  const getLastCategory = () => {
    if (subSubCategoryId) {
      return categories
        ?.find((cat: Category) => cat.categoryId === categoryId)
        ?.children.find(
          (subCat: Category) => subCat.categoryId === subCategoryId,
        )
        ?.children.find(
          (subSubCat: Category) => subSubCat.categoryId === subSubCategoryId,
        );
    } else if (subCategoryId) {
      return categories
        ?.find((cat: Category) => cat.categoryId === categoryId)
        ?.children.find(
          (subCat: Category) => subCat.categoryId === subCategoryId,
        );
    } else if (selectedCategory) {
      return selectedCategory;
    }
    return null;
  };

  const lastCategory = getLastCategory();

  const handleRatingFilterChange = (selected: number | string | null) => {
    setSelectedRatings(`${selected}TO5`);
    console.log("Selected Ratings:", `${selected}TO5`);
    // Add logic to filter products based on selected ratings
  };

  return (
    <div className="mt-[7.5rem] w-full">
      <BreadCrumb
        list={[
          { name: "Home", link: "/" },
          categoryId && selectedCategory
            ? {
                name: selectedCategory?.categoryName || "Category",
                link: `/product-listing/${selectedCategory?.categoryId || ""}`,
              }
            : undefined,
          subCategoryId && categoryId && subCategoryId
            ? {
                name:
                  categories
                    ?.find((cat: Category) => cat.categoryId === categoryId)
                    ?.children.find(
                      (subCat: Category) => subCat.categoryId === subCategoryId,
                    )?.categoryName || "Subcategory",
                link: `/product-listing/${categoryId}/${subCategoryId}`,
              }
            : undefined,
          subSubCategoryId && categoryId && subCategoryId && subSubCategoryId
            ? {
                name:
                  categories
                    ?.find((cat: Category) => cat.categoryId === categoryId)
                    ?.children.find(
                      (subCat: Category) => subCat.categoryId === subCategoryId,
                    )
                    ?.children.find(
                      (subSubCat: Category) =>
                        subSubCat.categoryId === subSubCategoryId,
                    )?.categoryName || "Sub-subcategory",
                link: `/product-listing/${categoryId}/${subCategoryId}/${subSubCategoryId}`,
              }
            : undefined,
        ].filter(
          (item): item is { name: string; link: string } => item !== undefined,
        )}
      />

      <div className="flex gap-6 p-4">
        <div className="w-1/6 sticky top-20 self-start">
          <div>
            <PriceFacet
              themeColor={store?.themeColor}
              onFilterChange={handlePriceFilterChange}
              loading={loading || productsLoading}
            />
          </div>
          <div>
            <RatingFacet
              themeColor={store?.themeColor}
              onFilterChange={handleRatingFilterChange}
              loading={loading || productsLoading}
            />
          </div>
        </div>
        {/* New Flexbox Layout */}
        {loading || productsLoading ? (
          <div className="flex justify-center items-center w-full h-[50vh]">
            <ClipLoader color={store?.themeColor} size={50} />
          </div>
        ) : (
          <>
            {/* Right Side - Product Grid */}
            <div className="w-full">
              <div className="text-lg mb-4">
                {lastCategory?.categoryName} ({productDetails?.totalHits})
              </div>
              <div className="pr-[15px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 ">
                {productsError ? (
                  <div className="p-4 mt-20 text-red-500">
                    Error: {productsError}
                  </div>
                ) : Array.isArray(products) && products.length > 0 ? (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 border border-gray-200 rounded-lg shadow-sm transition-all hover:shadow-md cursor-pointer"
                      onClick={() => navigate(`/product/${product?.id}?category=${product?.category}`)}
                      
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-40 object-cover rounded-md mb-3"
                      />
                      <h3
                        className="text-xs font-bold line-clamp-2 overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                        }}
                        title={product.title}
                      >
                        {product.title}
                      </h3>
                      <p className="text-gray-700 text-xs mt-1">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div>No products found</div>
                )}
              </div>
              <Pagination
                pageCount={Math.ceil(productDetails?.totalHits / itemsPerPage)}
                currentPage={productDetails?.page}
                onPageChange={handlePageChange}
                themeColor={store?.themeColor}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;
