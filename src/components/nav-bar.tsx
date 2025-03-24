/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/getAccessToken";
import { useNavigate } from "react-router";

interface Category {
  categoryId: string;
  categoryName: string;
}

const NavBar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      setLoading(true);
      const token = await getAccessToken();

      if (!token) {
        throw new Error("Failed to fetch token");
      }

      const storeCode = localStorage.getItem("storeCode") || "defaultStore";
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
    return <div className="p-4">Loading categories...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <nav className="fixed flex justify-center top-[5.7rem] left-0 right-0 bg-white w-full p-[0.5rem] px-4 border-b border-gray-200 z-[-1]">
      <ul className="flex items-center space-x-8 text-xs gap-[35px]">
        {categories.map((category) => (
          <li key={category.categoryId} className="group">
            <button
              onClick={() =>
                navigate(
                  `/product-listing?category=${category.categoryId}&sortFilter=true`
                )
              }
              className="text-sm font-medium hover:text-black transition-colors duration-200 relative"
            >
              {category.categoryName}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-black transition-all duration-200 group-hover:w-full"></span>
            </button>
            
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
