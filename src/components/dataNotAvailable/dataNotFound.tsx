import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const DataNotFound = ({
  text,
  buttonText,
}: {
  text?: string;
  buttonText?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className="border-dashed border-2 border-gray-400 rounded text-center text-[16px] p-4 gap-2">
      <div className=" flex justify-center gap-2">
        <div>{text || "Data Not Found"} </div>
        <div>
          <Icon icon="solar:cart-3-line-duotone" width="24" height="24" />
        </div>
      </div>
      <div className="mt-6">
        <Button onClick={() => navigate("/")}>
          {buttonText || "Back To Buying"}
        </Button>
      </div>
    </div>
  );
};

export default DataNotFound;
