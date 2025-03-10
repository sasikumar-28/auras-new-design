import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/getAccessToken";
import { useNavigate } from "react-router";

interface Category {
  categoryId: string;
  categoryName: string;
}

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      setLoading(true);
      const token = await getAccessToken();
      console.log(token, "accessTokenweb");

      if (!token) {
        throw new Error("Failed to fetch token");
      }

      const storeCode = localStorage.getItem("storeCode") || "defaultStore";
      if (!storeCode) {
        throw new Error("Store code is missing");
      }

      const URL = `${import.meta.env.VITE_SERVER_BASE_URL}api/mycategories?storeCode=${storeCode}`;
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
    <div className="fixed top-[6rem] bg-white z-40 mr-5">
      <div className="p-4 bg-white grid grid-cols-9 gap-4">
        {categories.map((category) => (
          <div
            key={category.categoryId}
            className="w-24 h-24 bg-[#FFFFFF] p-6 text-center rounded-3xl border border-[#C1C1C1] drop-shadow-[0px_3px_6px_#00000029] flex flex-col items-center justify-center"
            onClick={() =>
              navigate(
                `/product-listing?category=${category.categoryId}&sortFilter=true`
              )
            }
          >
            <img
              src={`/images/categories-images/${category.categoryName}.png`}
              alt={`${category.categoryName} category`}
              className="w-22 h-full object-cover mb-2"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `/images/categories-images/${category.categoryName}.svg`;
              }}
            />
            <p className="text-xs">{category.categoryName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
