import { CategoriesResponse, Category } from "@/graphQL/queries/types";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

const CategoryTabs = ({
  data,
  activeTab,
  setActiveTab,
}: {
  data: CategoriesResponse | undefined;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center gap-4">
      {/* Tabs Container */}
      <div className="flex space-x-4 border-b border-gray-300 w-full">
        {data?.categories.results.map((category: Category, index: number) => (
          <button
            key={index}
            className={`relative px-4 py-2 text-gray-600 font-medium transition-all 
              ${activeTab === index ? "text-[#1E1E1E]" : "hover:text-primary"}`}
            onClick={() => {
              setActiveTab(index);
              navigate(
                `/product-listing?category=${category.id}&sortFilter=true`
              );
            }}
          >
            {category.name}
            {/* Active indicator */}
            {activeTab === index && (
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#B93284]"></span>
            )}
          </button>
        ))}
      </div>

      {/* Sort Icon with Badge */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative bg-[#B93284] rounded-full p-2 cursor-pointer">
            <Icon
              icon="mdi:sort"
              className="text-white text-2xl transition"
              height={17}
              width={17}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className=" bg-white w-fit rounded-lg"
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
