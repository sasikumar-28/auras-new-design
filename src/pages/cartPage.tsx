/* eslint-disable @typescript-eslint/no-explicit-any */
import CategoryTabs from "@/components/categories/categoryTabs";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CategoriesResponse, Product } from "@/graphQL/queries/types";
import { GET_CATEGORIES } from "@/graphQL/queries/queries";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProductCard from "@/components/cart/productCard";
import { useSelector } from "react-redux";

const CartPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const { data } = useQuery<CategoriesResponse>(GET_CATEGORIES);
  const cartItems = useSelector((state: any) => state.cart.cart);
  const [selectedProduct, setSelectedProduct] = useState<Product[]>([]);
  const initialActiveTab =
    data?.categories.results.findIndex((c) => c.id === categoryFromUrl) ?? 0;
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  useEffect(() => {}, [selectedProduct]);

  return (
    <div className="mt-20 w-full">
      <CategoryTabs
        data={data}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between mt-6">
          <div>
            <div>
              <div className="text-2xl font-bold">Shopping Cart</div>
              <div className="text-sm text-[#B93284]">Deselect all items</div>
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
                    ((item?.masterVariant?.prices[0].value.centAmount || 0) *
                      item.quantity || 1),
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
          {cartItems.map((item: Product, index: number) => (
            <ProductCard
              key={index}
              product={item}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
