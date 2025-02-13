import { useNavigate } from "react-router";
import { Icon } from "@iconify/react/dist/iconify.js";

const BreadCrumb = ({ list }: { list: { name: string; link: string }[] }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2 mt-6">
      {list.map((item, index) => (
        <div
          className="cursor-pointer flex items-center gap-2 text-[#585858] text-sm"
          onClick={() => navigate(item.link)}
          key={index}
        >
          {index !== 0 && <Icon icon="mdi:chevron-right" />} {item.name}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumb;
