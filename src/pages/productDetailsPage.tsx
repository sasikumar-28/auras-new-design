import BreadCrumb from "@/components/breadcrumb/BreadCrumb";
import CategoryTabs from "@/components/categories/categoryTabs";
import { GET_CATEGORIES } from "@/graphQL/queries/queries";
import { CategoriesResponse, Product } from "@/graphQL/queries/types";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
const ProductDetailsPage = () => {
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
      setProduct(JSON.parse(product));
      console.log(JSON.parse(product));
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
            name: product?.name || "Product",
            link: `/product/${id}?category=${
              data?.categories.results[activeTab]?.id || ""
            }&productCard=true`,
          },
        ]}
      />
      <div className="p-4 mt-4 overflow-y-auto h-[73vh]">
        <div className="flex gap-4 w-full">
          <div className="max-w-[600px]">
            <img
              src={product?.masterVariant.images[selectedImageIndex].url}
              alt=""
              className="w-full h-[500px] object-cover"
            />
            <div className="flex gap-2">
              {product?.masterVariant.images.map((image, index) => (
                <div
                  className={`w-1/4 ${
                    selectedImageIndex === index
                      ? "border-2 border-[#552864] rounded-xl"
                      : ""
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image.url}
                    alt=""
                    className="rounded-xl object-cover w-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 p-3">
            <h1 className="text-2xl font-bold">{product?.name}</h1>
            <div className="flex gap-2">
              <div>Price</div>
              <div>${product?.masterVariant.prices[0].value.centAmount}</div>
            </div>
            <p>{product?.description}</p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ProductDetailsPage;
