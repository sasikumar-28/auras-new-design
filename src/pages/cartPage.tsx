/* eslint-disable @typescript-eslint/no-explicit-any */
import CategoryTabs from "@/components/categories/categoryTabs";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {  Product } from "@/graphQL/queries/types";
import { GET_CATEGORIES } from "@/graphQL/queries/queries";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProductCard from "@/components/cart/productCard";
import { useDispatch, useSelector } from "react-redux";
import DataNotFound from "@/components/dataNotAvailable/dataNotFound";
import axios from "axios";
import { getAccessToken } from "@/utils/getAccessToken";

interface Category {
  categoryId: string;
  categoryName: string;
}

interface CategoriesResponse {
  categories: {
    total: number;
    results: Category[];
  };
}

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const { data } = useQuery<CategoriesResponse>(GET_CATEGORIES);
  const cartItems = useSelector((state: any) => state.cart.cart);
  const [selectedProduct, setSelectedProduct] = useState<Product[]>([]);
  const initialActiveTab =
    data?.categories.results.findIndex((c) => c.categoryId === categoryFromUrl) ?? 0;
  const [activeTab, setActiveTab] = useState(initialActiveTab);
const [categories, setCategories] = useState<CategoriesResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {}, [selectedProduct]);

  function removeAllSelectedProduct(): any {
    throw new Error("Function not implemented.");
  }

  const getCategories = async () => {
    try {
      setLoading(true);
      const token = await getAccessToken();
      if (!token) {
        throw new Error("Failed to fetch token");
      }

      const storeCode = localStorage.getItem("storeCode") || "defaultStore"; // Get storeCode dynamically
      if (!storeCode) {
        throw new Error("Store code is missing");
      }
      
      const URL = `${import.meta.env.VITE_SERVER_BASE_URL}api/mycategories?storeCode=${storeCode}`;
      const response = await axios.get<CategoriesResponse>(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCategories(response.data);
      } else {
        throw new Error("Failed to fetch backend response");
      }
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return <div className="p-4">Loading data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }
  return (
    <div className="mt-20 w-full">
      <CategoryTabs
        data={categories?.categories.results || []}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between mt-6">
          <div>
            <div>
              <div className="text-2xl font-bold">Shopping Cart</div>
              {selectedProduct.length ? (
                <div
                  className="text-sm text-[#B93284] cursor-pointer"
                  onClick={() => {
                    setSelectedProduct([]);
                    dispatch(removeAllSelectedProduct());
                  }}
                >
                  Deselect all items
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 h-full">
            <div>
              Subtotal (
              {selectedProduct.reduce(
                (acc: number, item: Product) => acc + (item.quantity || 0),
                0
              )}{" "}
              items):{" "}
              {selectedProduct
                .reduce(
                  (acc: number, item: Product) =>
                    acc +
                    (item?.masterVariant?.prices[0].value.centAmount || 0) *
                      (item.quantity || 1),
                  0
                )
                .toLocaleString("en-US", {
                  style: "currency",
                  currency:
                    cartItems[0]?.masterVariant?.prices[0].value.currencyCode ??
                    "USD",
                })}
            </div>
            <div>
              <Button
                disabled={!selectedProduct.length}
                className="bg-[#B93284] h-[50px] hover:bg-[#a02973] text-white rounded-xl text-2xl px-6 py-3 flex items-center gap-2"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Buy
                <Icon icon="mdi:arrow-right" className="text-2xl" />
              </Button>
            </div>
          </div>
        </div>
        {/* Cart Items */}
        <div className="flex flex-col gap-4 mt-6">
          {cartItems.length > 0 ? (
            cartItems.map((item: Product, index: number) => (
              <ProductCard
                key={index}
                product={item}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
              />
            ))
          ) : (
            <DataNotFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
