import { Button } from "../ui/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddressCard = ({ address }: any) => {
  return (
    <div
      className="p-3w-[285px] h-[148px] rounded-[5px]"
      style={{ border: "1px solid #B93284" }}
    >
      <div>{address?.name || "helo"}</div>
      <div>{address?.details}</div>
      <div className="w-full h-[1px] bg-gray-300"></div>
      <div className="flex justify-around mt-1 text-[#B93284]">
        <Button className="bg-white hover:text-white rounded-[5px]">
          Edit
        </Button>
        <Button className="bg-white hover:text-white rounded-[5px]">
          Remove
        </Button>
        <Button className="bg-white hover:text-white rounded-[5px]">
          Set as default
        </Button>
      </div>
    </div>
  );
};

export default AddressCard;
