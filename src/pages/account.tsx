import AddressIcon from "@/assets/profile-icons/AddressIcon";
import OrdersIcon from "@/assets/profile-icons/ordersIcon";
import LockIcon from "@/assets/profile-icons/LockIcon";
import CategoryTabs from "@/components/categories/categoryTabs";
import TabCard from "@/components/profile/tabCard";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";
import ShowAddress from "@/components/address/ShowAddress";
import ShowDetails from "@/components/login/showDetails";
import ShowOrders from "@/components/orders/ShowOrders";
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

const Account = () => {
  const [activeTab, setActiveTab] = useState(-1);
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState<"orders" | "login" | "address">(
    tab as "orders" | "login" | "address"
  );
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoriesResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="mt-20 w-full h-[calc(100vh-200px)] p-4">
      <CategoryTabs
        data={categories?.categories.results || []}
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
          <div className="w-full">
            {selectedTab === "orders" && <ShowOrders />}
            {selectedTab === "login" && <ShowDetails />}
            {selectedTab === "address" && <ShowAddress />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
