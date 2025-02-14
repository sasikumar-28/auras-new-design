import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/graphQL/queries/queries";
import { CategoriesResponse, Category } from "@/graphQL/queries/types";
import { useNavigate } from "react-router";

const CategoriesList = () => {
  const { loading, error, data } = useQuery<CategoriesResponse>(GET_CATEGORIES);
  const navigate = useNavigate();

  if (loading) return <div className="p-4">Loading categories...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  // console.log("Logs the query", GET_CATEGORIES.loc?.source.body); // Logs the query

  return (
    <div className="fixed top-[6rem]  bg-white z-40 mr-5">
      <div className="p-4 bg-white grid grid-cols-9 gap-4">
        {data?.categories.results.map((category: Category) => (
          <>
            <div
              className="w-24 h-24 bg-[#FFFFFF] cursor-pointer p-6 text-center rounded-3xl border border-[#C1C1C1] drop-shadow-[0px_3px_6px_#00000029] flex flex-col items-center justify-center"
              onClick={() =>
                navigate(
                  `/product-listing?category=${category.id}&sortFilter=true`
                )
              }
            >
              <img
                src={`/images/categories-images/${category.name}.webp`}
                alt="category image"
                className="w-22 h-full object-cover mb-2"
              />
              <p className="text-xs" key={category.id}>
                {category.name}
              </p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
