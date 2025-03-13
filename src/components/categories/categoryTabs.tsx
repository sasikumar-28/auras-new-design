import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { getAccessToken } from "@/utils/getAccessToken";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";

interface Category {
  categoryId: string;
  categoryName: string;
}

interface CategoryTabsProps {
  data: Category[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const CategoryTabs = ({ data, activeTab, setActiveTab }: CategoryTabsProps) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const store = useSelector((s) => s.store.store);
  const [loading, setLoading] = useState<boolean>(false);
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
      const URL = `${
        import.meta.env.VITE_SERVER_BASE_URL
      }api/mycategories?storeCode=${storeCode}`;
      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCategories(response.data); // Assuming the API returns an array of categories
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

  return (
    <div className="flex justify-between items-center gap-4">
      {/* Tabs Container */}
      <div className="flex space-x-4 border-b border-gray-300 w-full">
        {loading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : data.length > 0 ? (
          data.map((category, index) => (
            <button
              key={index}
              className={`relative px-4 py-2 text-gray-600 font-medium transition-all 
              ${activeTab === index ? "text-[#1E1E1E]" : "hover:text-primary"}`}
              onClick={() => {
                setActiveTab(index);
                navigate(
                  `/product-listing?category=${category.categoryId}&sortFilter=true`
                );
              }}
            >
              {category.categoryName}
              {/* Active indicator */}
              {activeTab === index && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#B93284]"></span>
              )}
            </button>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>

      {/* Sort Icon with Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className="relative rounded-full p-2 cursor-pointer"
            style={{ backgroundColor: store.themeColor }}
          >
            <Icon
              icon="mdi:sort"
              className="text-white text-2xl transition"
              height={17}
              width={17}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-white w-fit rounded-lg"
          style={{ borderRadius: "20px" }}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
            <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
            <DropdownMenuItem>Popularity</DropdownMenuItem>
            <DropdownMenuItem>Relevance</DropdownMenuItem>
            <DropdownMenuItem>Newest Arrivals</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CategoryTabs;
