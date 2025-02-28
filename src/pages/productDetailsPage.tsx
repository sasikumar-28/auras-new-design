import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import CategoryTabs from "@/components/categories/categoryTabs";
import { GET_CATEGORIES } from "@/graphQL/queries/queries";
import { CategoriesResponse, Product } from "@/graphQL/queries/types";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { setProducts as setProductsAction } from "@/store/reducers/productReducer";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  currencyFormatter,
  displayData,
  imageUrlArray,
  priceFormatter,
} from "@/utils/helper";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const categoryFromUrl = searchParams.get("category");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { id } = useParams();
  const { loading, error, data } = useQuery<CategoriesResponse>(GET_CATEGORIES);
  const initialActiveTab =
    data?.categories.results.findIndex((c) => c.id === categoryFromUrl) ?? 0;
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  useEffect(() => {
    setActiveTab(initialActiveTab);
    const product = localStorage.getItem("product");
    if (product) {
      const parsedProduct = JSON.parse(product);
      setProduct(parsedProduct);
      dispatch(setProductsAction({ ...parsedProduct, quantity: 1 }));
      console.log(parsedProduct);
    }
  }, [categoryFromUrl, data]);

  if (loading) return <div className="p-4">Loading categories...</div>;
  if (error) return <div className="p-4">Error loading categories...</div>;
  if (!data) return <div className="p-4">No data found</div>;
  return (
    <div className="mt-20 w-full">
      <CategoryTabs
        data={data}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <BreadCrumb
        list={[
          { name: "Home", link: "/" },
          {
            name: data?.categories.results[activeTab]?.name || "Category",
            link: `/product-listing?category=${
              data?.categories.results[activeTab]?.id || ""
            }&sortFilter=true`,
          },
          {
            name: displayData(product?.name ?? "Product"),
            link: `/product/${id}?category=${
              data?.categories.results[activeTab]?.id || ""
            }&productCard=true`,
          },
        ]}
      />
      <div className="p-4 mt-4 overflow-y-auto h-[73vh]">
        <div className="flex gap-4 w-full">
          <div className="max-w-[560px]">
            {product && (
              <>
                <img
                  src={imageUrlArray(product)[selectedImageIndex]}
                  alt=""
                  className="w-full h-[400px] object-cover rounded-xl"
                />
                <div className="flex gap-2 justify-center mt-2">
                  {imageUrlArray(product).map((image, index) => (
                    <div
                      key={index}
                      className={`w-1/6 border-2 border-[#B93284] rounded-xl p-2`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt=""
                        className="rounded-xl object-cover w-full"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
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
            {product?.name && (
              <h1 className="text-2xl font-bold">
                {displayData(product?.name)}
              </h1>
            )}
            <div className="flex gap-2 font-sm mt-4 mb-4">
              <div>Price</div>
              <div>
                {product &&
                  currencyFormatter(
                    priceFormatter(product)?.centAmount || 0,
                    priceFormatter(product)?.currencyCode || "USD"
                  )}
              </div>
            </div>
            <div className="text-md font-bold">About this item:</div>
            {product?.description && <p>{displayData(product?.description)}</p>}
          </div>
          <div className="flex flex-col gap-2 p-3">
            <Icon
              height={30}
              width={30}
              onClick={() => setLiked(!liked)}
              icon={liked ? "mdi:heart" : "mdi:heart-outline"}
              className="text-2xl cursor-pointer"
              color={liked ? "#B93284" : "gray"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
