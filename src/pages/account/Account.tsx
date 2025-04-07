// import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { Order, LoginSecurity, YourAddress } from "@/components/account";
import { AccountTab } from "@/components/account";

function Account() {
  const [activeSection, setActiveSection] = useState<
    "orders" | "security" | "address"
  >("orders");

  return (
    <div className="w-screen  bg-white p-6 mt-[6.5rem] h-full">
      <h1 className="text-xl font-bold mb-6">YOUR ACCOUNT</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 flex flex-col gap-4">
          <AccountTab
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          {/* 
          <div className="flex items-center gap-2 text-blue-600 mt-2 cursor-pointer">
            <span className="font-medium">Find Store</span>
            <ArrowRight size={16} />
          </div> */}
        </div>
        <div className="flex-1 max-h-[calc(100vh-6.5rem)] overflow-y-auto">
          {activeSection === "orders" && <Order />}
          {activeSection === "security" && <LoginSecurity />}
          {activeSection === "address" && <YourAddress />}
        </div>
      </div>
    </div>
  );
}

export default Account;
