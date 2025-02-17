import CategoryTabs from "@/components/categories/categoryTabs";
import { GET_CATEGORIES } from "@/graphQL/queries/queries";
import { CategoriesResponse } from "@/graphQL/queries/types";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";
const Account = () => {
  const { data } = useQuery<CategoriesResponse>(GET_CATEGORIES);
  const [activeTab, setActiveTab] = useState(-1);
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState<
    "orders" | "login" | "address"
  >(tab as "orders" | "login" | "address");
  const navigate = useNavigate();

  return (
    <div className="mt-20 w-full">
      <CategoryTabs
        data={data}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="p-4 ">
        <div className="text-2xl my-3 font-bold">YOUR ACCOUNT</div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            <div
              className="cursor-pointer"
              onClick={() => {
                setSelectedTab("orders");
                navigate("/account?tab=orders");
              }}
            >
              Orders
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setSelectedTab("login");
                navigate("/account?tab=login");
              }}
            >
              Login & Security
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setSelectedTab("address");
                navigate("/account?tab=address");
              }}
            >
              Your Address
            </div>
          </div>
          <div>
            {selectedTab === "orders" && "orders"}
            {selectedTab === "login" && "login"}
            {selectedTab === "address" && "address"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
