import AddressIcon from "@/assets/profile-icons/AddressIcon";
import OrdersIcon from "@/assets/profile-icons/ordersIcon";
import LockIcon from "@/assets/profile-icons/LockIcon";
import CategoryTabs from "@/components/categories/categoryTabs";
import TabCard from "@/components/profile/tabCard";
import { GET_CATEGORIES } from "@/graphQL/queries/queries";
import { CategoriesResponse } from "@/graphQL/queries/types";
import { useQuery } from "@apollo/client";
import { Icon } from "@iconify/react/dist/iconify.js";
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
    <div className="mt-20 w-full h-[calc(100vh-200px)]">
      <CategoryTabs
        data={data}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="p-4 h-full">
        <div className="text-2xl my-3 font-bold">YOUR ACCOUNT</div>
        <div className="flex gap-4 h-full">
          <div className="flex h-full justify-around items-center flex-col">
            <TabCard
              title="Orders"
              description="Orders"
              icon={<OrdersIcon />}
              onClick={() => {
                setSelectedTab("orders");
                navigate("/account?tab=orders");
              }}
            />
            <TabCard
              title="Login & Security"
              description="Login & Security"
              icon={<LockIcon />}
              onClick={() => {
                setSelectedTab("login");
                navigate("/account?tab=login");
              }}
            />
            <TabCard
              title="Your Address"
              description="Your Address"
              icon={<AddressIcon />}
              onClick={() => {
                setSelectedTab("address");
                navigate("/account?tab=address");
              }}
            />
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
