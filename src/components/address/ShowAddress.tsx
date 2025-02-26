import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAddress } from "@/hooks/useAddress";
import AddressCard from "./AddressCard";
import { Address } from "@/graphQL/queries/types";

const ShowAddress = () => {
  const [newAddress, setNewAddress] = useState(false);
  const { data: addressList, loading, addNewAddress } = useAddress();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    streetName: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    let newErrors: any = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "email")
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1").trim()} is required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleAddNewAddress = async () => {
    if (!validateForm()) return;
    try {
      console.log("hello");
      await addNewAddress({
        ...formData,
        key: "key1",
        id: "443",
      });
      setNewAddress(false);
      setFormData({
        firstName: "",
        lastName: "",
        streetName: "",
        postalCode: "",
        city: "",
        state: "",
        country: "",
        phone: "",
        email: "",
      });
    } catch (err) {
      console.error("Failed to add new address:", err);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

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
        {loading ? (
          <div>Loading...</div>
        ) : addressList?.length > 0 ? (
          <div className="w-full mt-6">
            <div className="w-full h-[1px] bg-gray-200"></div>
            <div className="flex gap-6 mt-4">
              {addressList.map((address: Address, i: number) => (
                <AddressCard address={address} key={i} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <Sheet open={newAddress} onOpenChange={setNewAddress}>
        <SheetContent className="bg-white">
          <SheetHeader>
            <SheetTitle>Add New Address</SheetTitle>
            <SheetDescription>
              Please fill in the details below.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 justify-between mt-8 h-[80vh] overflow-y-scroll">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key}>
                <div className="font-bold">
                  {key.replace(/([A-Z])/g, " $1").trim()}{" "}
                  {key !== "email" && <span className="text-[#B93284]">*</span>}
                </div>
                <Input
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={
                    key.replace(/([A-Z])/g, " $1").trim() +
                    (key !== "email" ? " *" : "")
                  }
                  className="rounded-xl border border-[#DEDEDE] h-[48px]"
                />
                {errors[key] && (
                  <div className="text-red-500 text-sm">{errors[key]}</div>
                )}
              </div>
            ))}
            <div className="mt-8">
              <Button
                className="bg-[#B93284] h-[56px] text-white w-full text-lg rounded-xl"
                onClick={handleAddNewAddress}
              >
                Add address <Icon icon="pajamas:arrow-right" />
              </Button>
              <div
                className="text-md text-[#B93284] cursor-pointer text-center font-bold mt-4"
                onClick={() => setNewAddress(false)}
              >
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
