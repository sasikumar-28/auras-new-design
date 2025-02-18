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
    <div className="mt-20 w-full h-[calc(100vh-200px)] p-4">
      <CategoryTabs
        data={data}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="p-4 h-full">
        <div className="text-2xl my-3 font-bold">YOUR ACCOUNT</div>
        <div className="flex gap-4 h-full">
          <div className="flex h-5/6 justify-around items-center flex-col">
            <div className="h-[1px] w-full bg-gray-200"></div>
            <TabCard
              title="Orders"
              description="Track, return, or buy things again"
              icon={<OrdersIcon active={selectedTab === "orders"} />}
              onClick={() => {
                setSelectedTab("orders");
                navigate("/account?tab=orders");
              }}
              active={selectedTab === "orders"}
            />
            <TabCard
              title="Login & Security"
              description="Edit login, name, and mobile no"
              icon={<LockIcon active={selectedTab === "login"} />}
              onClick={() => {
                setSelectedTab("login");
                navigate("/account?tab=login");
              }}
              active={selectedTab === "login"}
            />
            <TabCard
              title="Your Address"
              description="Edit address for orders details"
              icon={<AddressIcon active={selectedTab === "address"} />}
              onClick={() => {
                setSelectedTab("address");
                navigate("/account?tab=address");
              }}
              active={selectedTab === "address"}
            />
          </div>
          <div className="h-full w-[1px] bg-gray-200 mx-8"></div>
          <div>
            {selectedTab === "orders" && "Your Orders"}
            {selectedTab === "login" && "Login & Security"}
            {selectedTab === "address" && "Your Address"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
