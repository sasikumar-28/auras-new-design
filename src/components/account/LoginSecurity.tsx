import { useEffect, useState } from "react";
import { getCustomerInfoById } from "../../service/api/account";
import { CustomerResponse } from "@/types/customer";

interface LoginSecurityProps {
  userData?: {
    name: string;
    email: string;
    mobile: string;
  };
}

const customerResponse: CustomerResponse = {
  id: "",
  firstName: "",
  lastName: "",
  emailId: "",
  customerType: "",
};

function LoginSecurity({
  userData = {
    name: "Prakash Gururajan",
    email: "Prakashguru@gmail.com",
    mobile: "9003****99",
  },
}: LoginSecurityProps) {
  const [data, setData] = useState<CustomerResponse>(customerResponse);
  const [isLoad, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getCustomerInfoById();
      const customerData = data.length === 0 ? customerResponse : data[0];
      setData(customerData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (isLoad) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full bg-white">
      <h2 className="text-lg font-semibold mb-6">Login & Security</h2>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Name</label>
          <div className="flex justify-between items-center">
            <span>{data?.firstName}</span>
            {/* <button className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Edit
            </button> */}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Email</label>
          <div className="flex justify-between items-center">
            <span>{data?.emailId}</span>
            {/* <button className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Edit
            </button> */}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Primary Mobile Number</label>
          <div className="flex justify-between items-center">
            <div>
              <span>{userData.mobile}</span>
              <p className="text-xs text-gray-500 mt-1">
                (Quickly sign in, easily recover passwords and receive security
                notifications with this mobile number.)
              </p>
            </div>
            {/* <button className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Edit
            </button> */}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Password</label>
          <div className="flex justify-between items-center">
            <span>***********</span>
            {/* <button className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Edit
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSecurity;
