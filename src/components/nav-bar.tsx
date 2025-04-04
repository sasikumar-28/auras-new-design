/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/getAccessToken";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";

interface Category {
  categoryId: string;
  categoryName: string;
  children?: Category[];
}

const NavBar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      setLoading(true);
      const token = await getAccessToken();
      if (!token) throw new Error("Failed to fetch token");

      const storeCode = localStorage.getItem("storeCode") || "defaultStore";
      if (!storeCode) throw new Error("Store code is missing");

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
      <ul className="flex justify-center items-center w-full text-xs gap-[35px]">
        {categories.map((category) => (
          <li
            key={category.categoryId}
            className="relative group text-center flex flex-col items-center"
            onMouseEnter={() => setHoveredCategory(category.categoryId)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <button
              onClick={() =>
                navigate(
                  `/product-listing?category=${category.categoryId}&sortFilter=true`,
                )
              }
              className="text-sm font-medium hover:text-black transition-colors duration-200 relative"
            >
              {category.categoryName}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-black transition-all duration-200 group-hover:w-full"></span>
            </button>

            {/* Dropdown containing all subcategories */}
            {hoveredCategory === category.categoryId &&
              category.children &&
              category.children.length > 0 && (
                <ul className="absolute left-0 top-full bg-white shadow-lg border border-gray-200 rounded-md py-2 w-48 max-h-[300px] overflow-y-auto">
                  {category.children.map((subCategory) => (
                    <li key={subCategory.categoryId} className="px-4 py-2">
                      <button
                        onClick={() =>
                          setOpenSubcategory((prev) =>
                            prev === subCategory.categoryId
                              ? null
                              : subCategory.categoryId,
                          )
                        }
                        className="flex items-start justify-start w-full text-gray-800 hover:text-black font-medium text-left text-sm"
                      >
                        <span className="whitespace-normal break-words flex-1">
                          {subCategory.categoryName}
                        </span>
                        {subCategory.children &&
                          subCategory.children.length > 0 && (
                            <Icon
                              icon="mdi:chevron-down"
                              className="ml-1 text-black transition-transform duration-200"
                              width="19"
                              height="19"
                              style={{
                                transform:
                                  openSubcategory === subCategory.categoryId
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                              }}
                            />
                          )}
                      </button>

                      {/* Show subcategories inside the same dropdown */}
                      {openSubcategory === subCategory.categoryId &&
                        subCategory.children &&
                        subCategory.children.length > 0 && (
                          <ul className="mt-1 ml-4 pl-2 border-gray-300 max-h-[200px] overflow-y-auto">
                            {subCategory.children.map((childCategory) => (
                              <li
                                key={childCategory.categoryId}
                                className="py-1"
                              >
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/product-listing?category=${childCategory.categoryId}&sortFilter=true`,
                                    )
                                  }
                                  className="text-gray-600 hover:text-black w-full text-left text-sm"
                                >
                                  {childCategory.categoryName}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
