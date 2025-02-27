import { Address } from "@/graphQL/queries/types";
import { Button } from "../ui/button";
import { initialCapital } from "@/utils/helper";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddressCard = ({ address }: { address: Address }) => {
  return (
    <div
      className="p-3 w-[285px] h-[148px] rounded-[5px] flex flex-col justify-between"
      style={{ border: "1px solid #B93284" }}
    >
      <div>
        <div className="font-bold">
          {initialCapital(address?.firstName)}{" "}
          {initialCapital(address?.lastName).charAt(0)}
        </div>
        <div>
          {address?.streetName},{address?.city},{address?.state}
        </div>
      </div>
      <div>
        <div className="w-full h-[1px] bg-gray-300"></div>
        <div className="flex justify-around mt-1 text-[#B93284]">
          <div className="bg-white font-bold text text-[#B93284} rounded-[5px]">
            Edit
          </div>
          <div className="bg-white font-bold rounded-[5px]">Remove</div>
          <div className="bg-white font-bold hover:font-extrabold rounded-[5px]">
            Set as default
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
