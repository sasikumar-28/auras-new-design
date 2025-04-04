interface AddressData {
  name: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  isDefault?: boolean;
}

interface YourAddressProps {
  addresses?: AddressData[];
}

function YourAddress({
  addresses = [
    {
      name: "Prasath S,",
      addressLine1: "No 13, Vinayagar Nagar,",
      addressLine2: "8th Street, Near Godson Sch",
      addressLine3: "Perambur, Chennai 99",
      isDefault: true,
    },
  ],
}: YourAddressProps) {
  return (
    <div className="w-full bg-white">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Add Address</h2>
        <div className="border border-dashed border-[rgb(229_231_235)] rounded p-8 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center text-white mb-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Your Address</h2>
        {addresses.map((address, index) => (
          <div
            key={index}
            className="border rounded border-[rgb(229_231_235)] p-4 mb-4 max-w-md "
          >
            <div className="mb-4">
              <p className="font-medium">{address.name}</p>
              <p>{address.addressLine1}</p>
              <p>{address.addressLine2}</p>
              <p>{address.addressLine3}</p>
            </div>
            <div className="flex gap-4">
              <button className="text-pink-600 font-medium">Edit</button>
              <button className="text-pink-600 font-medium">Remove</button>
              {!address.isDefault && (
                <button className="text-pink-600 font-medium">
                  Set as Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourAddress;
