import { addAddress } from "../../service/api/account";

import React, { useState } from "react";

interface AddressSidebarProps {
  onClose: () => void;
}

const EditAddress: React.FC<AddressSidebarProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    street: "",
    postalCode: "",
    country: "",
    addressType: "SHIPPINGADDRESS",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const requiredFields = [
      "addressLine1",
      "addressLine2",
      "city",
      "state",
      "street",
      "postalCode",
      "country",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]?.trim()) {
        newErrors[field] = `${field} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setMessage("");
    try {
      const res = await addAddress(formData);
      if (res.success == "Existing User address added successfully"){
        setMessage("Address added successfully!");
      }else{
        throw new Error("Failed to save address");
      }

      setFormData({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        street: "",
        postalCode: "",
        country: "",
        addressType: "SHIPPINGADDRESS",
      });
    } catch (err) {
      setMessage("Error adding address.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative w-full sm:w-[400px] bg-white p-6 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-1">Add a new address</h2>
        <p className="text-sm text-gray-500 mb-4">
          Or find an Amazon collection location near you
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            {
              label: "Address Line 1",
              name: "addressLine1",
              placeholder: "123 Min St",
            },
            {
              label: "Address Line 2",
              name: "addressLine2",
              placeholder: "Apt 4B",
            },
            { label: "City", name: "city", placeholder: "City" },
            { label: "State", name: "state", placeholder: "State" },
            { label: "Street", name: "street", placeholder: "Main St" },
            { label: "Postal Code", name: "postalCode", placeholder: "607012" },
            { label: "Country", name: "country", placeholder: "USA" },
          ].map(({ label, name, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">
                {label} <span className="text-red-500">*</span>
              </label>
              <input
                name={name}
                type="text"
                value={(formData as any)[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                  errors[name]
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-purple-500"
                }`}
              />
              {errors[name] && (
                <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">
              Address Type
            </label>
            <select
              name="addressType"
              value={formData.addressType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="SHIPPINGADDRESS">Shipping Address</option>
              <option value="BILLINGADDRESS">Billing Address</option>
            </select>
          </div>

          {message && (
            <p
              className={`text-sm font-medium ${
                message.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="pt-4 flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-fuchsia-700 hover:bg-fuchsia-800 text-white py-2 rounded shadow disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add Address →"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-fuchsia-700 hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;
