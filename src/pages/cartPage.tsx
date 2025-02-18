import CategoryTabs from "@/components/categories/categoryTabs";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CategoriesResponse } from "@/graphQL/queries/types";
import { GET_CATEGORIES } from "@/graphQL/queries/queries";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProductCard from "@/components/cart/productCard";
import { useSelector } from "react-redux";

const CartPage = () => {
  const [searchParams] = useSearchParams();
  //   const [cartItems, setCartItems] = useState(dummyCartItems);
  const cartItems = useSelector((state: any) => state.cart.cart);
  console.log(cartItems, "the cart items");
  const categoryFromUrl = searchParams.get("category");
  const { data } = useQuery<CategoriesResponse>(GET_CATEGORIES);
  const initialActiveTab =
    data?.categories.results.findIndex((c) => c.id === categoryFromUrl) ?? 0;
  const [activeTab, setActiveTab] = useState(initialActiveTab);

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
              {cartItems.reduce(
                (acc: number, item: any) => acc + item.quantity,
                0
              )}{" "}
              items):{" "}
              {cartItems
                .reduce(
                  (acc: number, item: any) =>
                    acc + item?.masterVariant?.prices[0].value.centAmount || 0,
                  0
                )
                .toLocaleString("en-US", {
                  style: "currency",
                  currency:
                    cartItems[0]?.masterVariant?.prices[0].value.currencyCode,
                })}
            </div>
            <div>
              <Button className="bg-[#B93284] h-[50px] hover:bg-[#a02973] text-white rounded-xl text-2xl px-6 py-3 flex items-center gap-2">
                Proceed to Buy
                <Icon icon="mdi:arrow-right" className="text-2xl" />
              </Button>
            </div>
          </div>
        </div>
        {/* Cart Items */}
        <div className="flex flex-col gap-4 mt-6">
          {cartItems.map((item: any, index: number) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
