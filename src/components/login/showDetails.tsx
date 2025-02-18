const showDetails = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    primaryMobileNumber: "+1234567890",
    password: "********",
  };
  return (
    <div>
      <div>Login & Security</div>
      <div className="flex flex-col gap-8 w-full my-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold">Name</div>
            <div>{user.name}</div>
          </div>
          <div
            className="border-2 border-[#B93284] rounded-md px-2 py-1"
            style={{ borderRadius: "3px" }}
          >
            Edit
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold">Email</div>
            <div>{user.email}</div>
          </div>
          <div
            className="border-2 border-[#B93284] rounded-md px-2 py-1"
            style={{ borderRadius: "3px" }}
          >
            Edit
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold">Primary Mobile Number</div>
            <div>{user.primaryMobileNumber}</div>
          </div>
          <div
            className="border-2 border-[#B93284] rounded-md px-2 py-1"
            style={{ borderRadius: "3px" }}
          >
            Edit
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold">Password</div>
            <div>{user.password}</div>
          </div>
          <div
            className="border-2 border-[#B93284] rounded-md px-2 py-1"
            style={{ borderRadius: "3px" }}
          >
            Edit
          </div>
        </div>
      </div>
    </div>
  );
};

export default showDetails;
