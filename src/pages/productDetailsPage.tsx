import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import { getAccessToken } from "@/utils/getAccessToken";
import Rating from "../components/ui/rating.tsx"
interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  rating?: {
    rate: number;
    count: number;
  };
}

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const store = useSelector((s: any) => s.store.store);
  const categories = useSelector((state: any) => state.category.categories);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Invalid product ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const token = await getAccessToken();
        const URL = `${import.meta.env.VITE_SERVER_BASE_URL}api/product/${id}`;

        const response = await axios.get(URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 && response.data) {
          setProduct(response.data);
        } else {
          throw new Error("Failed to fetch product details");
        }
      } catch (err: unknown) {
        console.error("Error fetching product:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const currentCategory =
    (categories &&
      categories.find((cat: any) => cat.categoryId === categoryFromUrl)
        ?.categoryName) ||
    "Category";

  if (loading) {
    return (
      <div className="mt-20 flex justify-center items-center h-[50vh]">
        <ClipLoader size={50} color={store.themeColor || "#2B6ECA"} />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="mt-24 w-full px-4">
      {" "}
      {/* added more top margin and side padding */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Left: Image and Breadcrumb */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <BreadCrumb
            list={[
              { name: "Home", link: "/" },
              {
                name: currentCategory,
                link: `/product-listing?category=${categoryFromUrl || ""}&sortFilter=true`,
              },
              {
                name: product?.title || "Product",
                link: `/product/${id}?category=${categoryFromUrl || ""}&productCard=true`,
              },
            ]}
          />
          <div className="w-full h-[480px] flex items-center justify-center bg-white rounded-xl overflow-hidden group">
            <img
              src={product?.image || "/placeholder.jpg"}
              alt={product?.title || "Product image"}
              className="max-w-full max-h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-150"
            />
          </div>
          <div className="flex gap-2 justify-center mt-2">
            {[product?.image].map((image, index) => (
              <div
                key={index}
                className="w-1/6 rounded-xl p-2 cursor-pointer"
                style={{ border: `2px solid ${store.themeColor}` }}
              >
                <img
                  src={image || "/placeholder.jpg"}
                  alt="Thumbnail"
                  className="rounded-xl object-cover w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-full lg:w-[30%] flex flex-col gap-4 pt-6">
          <h1 className="text-2xl font-bold pt-2">{product?.title}</h1>

          <div className="flex gap-2 items-center text-yellow-500 text-lg">
            <Rating rating={product?.rating?.count || 0} reviewCount={product?.rating?.rate || 0} />
          </div>

          <div className="text-lg mt-2">
            <span className="font-semibold">Price:</span>{" "}
            {product?.price !== undefined
              ? product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              : "N/A"}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <input
              type="number"
              min="1"
              defaultValue={1}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                if (parseInt(target.value) < 1) target.value = "1";
              }}
            />
            <button
              className="bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition w-full sm:w-auto"
              onClick={() => console.log("Add to cart")}
              style={{ background: store?.themeColor }}
            >
              Add to Cart
            </button>
          </div>

          <details className="mt-4 cursor-pointer">
            <summary className="text-md font-bold text-gray-800">
              Description
            </summary>
            <div className="mt-2 text-sm text-gray-700">
              <p
                dangerouslySetInnerHTML={{
                  __html: product?.description || "No description available.",
                }}
              />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
