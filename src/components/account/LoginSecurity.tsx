interface LoginSecurityProps {
  userData?: {
    name: string;
    email: string;
    mobile: string;
  };
}

function LoginSecurity({
  userData = {
    name: "Prakash Gururajan",
    email: "Prakashguru@gmail.com",
    mobile: "9003****99",
  },
}: LoginSecurityProps) {
  return (
    <div className="w-full bg-white">
      <h2 className="text-lg font-semibold mb-6">Login & Security</h2>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Name</label>
          <div className="flex justify-between items-center">
            <span>{userData.name}</span>
            <button className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Edit
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Email</label>
          <div className="flex justify-between items-center">
            <span>{userData.email}</span>
            <button className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Edit
            </button>
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
            <button className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Edit
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Password</label>
          <div className="flex justify-between items-center">
            <span>***********</span>
            <button className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSecurity;
