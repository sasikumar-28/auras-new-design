import { Icon } from "@iconify/react/dist/iconify.js";

const ShowAddress = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-2xl font-bold">Add Address</div>
      <div className="h-[150px] w-full border-dashed border-[#B93284] rounded-md border-2 flex items-center justify-center">
        <div className="flex items-center justify-center rounded-full bg-[#B93284] p-2 cursor-pointer">
          <Icon
            icon="pajamas:location-dot"
            width="36"
            height="36"
            color="white"
          />
        </div>
      </div>
    </div>
  );
};

export default ShowAddress;
