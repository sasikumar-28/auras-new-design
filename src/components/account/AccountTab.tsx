interface AccountTabProps {
  activeSection: "orders" | "security" | "address";
  setActiveSection: React.Dispatch<
    React.SetStateAction<"orders" | "security" | "address">
  >;
}

const AccountTabs = (props: AccountTabProps) => {
  const { activeSection, setActiveSection } = props;
  return (
    <>
      <div
        className={`border ${activeSection === "orders" ? "border-pink-100 bg-pink-50" : "border-[rgb(229_231_235)]"} rounded p-4 flex items-start gap-4 cursor-pointer`}
        onClick={() => setActiveSection("orders")}
      >
        <div
          className={`${activeSection === "orders" ? "text-pink-700" : "text-gray-500"}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 2V6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 2V6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 10H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h2 className="font-semibold">Your Orders</h2>
          <p className="text-sm text-gray-500">
            Track, return, or buy things again
          </p>
        </div>
      </div>
      <div
        className={`border ${activeSection === "security" ? "border-pink-100 bg-pink-50" : "border-[rgb(229_231_235)]"} rounded p-4 flex items-start gap-4 cursor-pointer`}
        onClick={() => setActiveSection("security")}
      >
        <div
          className={`${activeSection === "security" ? "text-pink-700" : "text-gray-500"}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="11"
              width="18"
              height="11"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h2 className="font-semibold">Login & Security</h2>
          <p className="text-sm text-gray-500">
            Edit login, name and Mobile No
          </p>
        </div>
      </div>
      <div
        className={`border ${activeSection === "address" ? "border-pink-100 bg-pink-50" : "border-[rgb(229_231_235)]"} rounded p-4 flex items-start gap-4 cursor-pointer`}
        onClick={() => setActiveSection("address")}
      >
        <div
          className={`${activeSection === "address" ? "text-pink-700" : "text-gray-500"}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="10"
              r="3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 2C7.58172 2 4 5.58172 4 10C4 11.8919 4.7 13.6155 5.86289 14.9275C7.02579 16.2396 12 22 12 22C12 22 16.9742 16.2396 18.1371 14.9275C19.3 13.6155 20 11.8919 20 10C20 5.58172 16.4183 2 12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h2 className="font-semibold">Your Address</h2>
          <p className="text-sm text-gray-500">
            Edit address for orders & gifts
          </p>
        </div>
      </div>
    </>
  );
};

export default AccountTabs;
