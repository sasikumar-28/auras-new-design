import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import CategoryTabs from "@/components/categories/categoryTabs";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { setProducts as setProductsAction } from "@/store/reducers/productReducer";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getAccessToken } from "@/utils/getAccessToken";
import axios from "axios";

interface Category {
  categoryId: string;
  categoryName: string;
}

interface Product {
  id: string;
  title: string;
  image: string; // Change from array to string
  price: number; // Change from object to number
  description: string;
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
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}api/mycategories`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
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

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const categoryFromUrl = searchParams.get("category");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  console.log(selectedImageIndex);
  const { id } = useParams();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const initialActiveTab =
    categories.findIndex((c) => c.categoryId === categoryFromUrl) ?? 0;
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  useEffect(() => {
    setActiveTab(initialActiveTab);
    const storedProduct = localStorage.getItem("product");
    if (storedProduct) {
      const parsedProduct: Product = JSON.parse(storedProduct);
      setProduct(parsedProduct);
      dispatch(setProductsAction(parsedProduct));
    }
  }, [categoryFromUrl, categories]);

  if (categoriesLoading)
    return <div className="p-4">Loading categories...</div>;
  if (categoriesError)
    return <div className="p-4">Error loading categories...</div>;

  const currentCategory = categories[activeTab]?.categoryName || "Category";

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
            name: currentCategory,
            link: `/product-listing?category=${
              categories[activeTab]?.categoryId || ""
            }&sortFilter=true`,
          },
          {
            name: product?.title || "Product",
            link: `/product/${id}?category=${
              categories[activeTab]?.categoryId || ""
            }&productCard=true`,
          },
        ]}
      />
      <div className="p-4 mt-4 overflow-y-auto h-[73vh]">
        <div className="flex gap-4 w-full">
          <div className="max-w-[560px]">
            <img
              src={product?.image || "/placeholder.jpg"} // Ensure it's a string
              alt={product?.title || "Product image"}
              className="w-full h-[400px] object-cover rounded-xl"
            />
            <div className="flex gap-2 justify-center mt-2">
              {/* Since product.image is a string, we wrap it in an array */}
              {[product?.image].map((image, index) => (
                <div
                  // key={index}
                  className={`w-1/6 border-2 border-[#B93284] rounded-xl p-2`
                    // selectedImageIndex === index
                    //   ? "border-4 border-[#B93284]"
                    //   : ""
                  }
                  onClick={() => setSelectedImageIndex(index)}
                
                  // onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image || "/placeholder.jpg"}
                    alt="Thumbnail"
                    className="rounded-xl object-cover w-full"
                  />
                </div>
              ))}
            </div>
            <div
              onClick={() => navigate(-1)}
              className="flex gap-2 justify-center mt-2 text-sm underline text-[#B93284] cursor-pointer"
            >
              Go Back
            </div>
          </div>
          <div className="flex flex-col gap-2 p-3">
            <div
              onClick={() => navigate(-1)}
              className="mb-2 text-md underline text-[#B93284] cursor-pointer"
            >
              Visit Store
            </div>
            <h1 className="text-2xl font-bold">{product?.title}</h1>
            <div className="flex gap-2 font-sm mt-4 mb-4">
              <div>Price:</div>
              <div>
                {product?.price !== undefined
                  ? product.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD", // Default to USD
                    })
                  : "N/A"}
              </div>
            </div>
            <div className="text-md font-bold">About this item:</div>
            {/* Use dangerouslySetInnerHTML to properly render the description */}
            <p
              dangerouslySetInnerHTML={{
                __html: product?.description || "No description available.",
              }}
            ></p>
          </div>
          <div className="flex flex-col gap-2 p-3">
            <Icon
              icon="mdi:heart-outline"
              className="text-2xl cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
