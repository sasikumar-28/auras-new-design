import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ShowAddress = () => {
  const [newAddress, setNewAddress] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <div className="text-2xl font-bold">Add Address</div>
        <div className="h-[150px] w-full border-dashed border-[#B93284] rounded-md border-2 flex items-center justify-center">
          <div
            className="flex items-center justify-center rounded-full bg-[#B93284] p-2 cursor-pointer"
            onClick={() => setNewAddress(true)}
          >
            <Icon
              icon="pajamas:location-dot"
              width="36"
              height="36"
              color="white"
            />
          </div>
        </div>
      </div>
      <Sheet open={newAddress} onOpenChange={setNewAddress}>
        <SheetContent className="bg-white">
          <SheetHeader>
            <SheetTitle>Add New Address</SheetTitle>
            <SheetDescription>
              Or find an Amazon collection location near you
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 justify-between">
            <div>
              <div>
                <div>Full Name</div>
                <div>
                  <Input placeholder="Full Name" className="rounded-xl" />
                </div>
              </div>
              <div></div>
              <div></div>
            </div>
            <div>
              <div>
                <Button className="bg-[#B93284] text-white w-full text-lg rounded-xl">
                  Add address <Icon icon="pajamas:arrow-right" />
                </Button>
              </div>
              <div className="text-md text-[#B93284] cursor-pointer text-center font-bold">
                Cancel
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ShowAddress;
