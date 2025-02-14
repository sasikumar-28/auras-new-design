import { Product } from "@/graphQL/queries/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

const backgroundColors = [
  "#FEC877",
  "#EBE2F4",
  "#D3F1EC",
  "#FFE5E5",
  "#F2F2F2",
];
const CategoryProductCard = ({
  product,
  index,
  className,
  categoryId,
}: {
  product: Product;
  index: number;
  className: string;
  categoryId: string;
}) => {
  const randomColor = backgroundColors[index % backgroundColors.length];
  const navigate = useNavigate();
  return (
    <div
      className={className}
      style={{ backgroundColor: randomColor }}
      id={product.id}
    >
      <div
        className={`bg-[${randomColor}] cursor-pointer`}
        onClick={() => {
          navigate(
            `/product/${product.id}?category=${categoryId}&productCard=true`
          );
        }}
      >
        <div className="flex justify-center items-center">
          <img
            src={product.masterVariant.images[0].url}
            alt={product.name}
            className="w-3/4 h-3/4 object-cover"
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex justify-between gap-2">
            <p className="font-bold text-[20px] line-clamp-1">{product.name}</p>
            <div className="flex gap-2">
              <Icon
                icon="mdi:heart-outline"
                color="#00000033"
                height={24}
                width={24}
              />
            </div>
          </div>
          <p className="text-sm">
            Price ${product.masterVariant.prices[0].value.centAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductCard;
