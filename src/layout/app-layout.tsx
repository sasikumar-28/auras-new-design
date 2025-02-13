import Header from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Outlet } from "react-router";
import { useSearchParams } from "react-router";

const AppLayout = () => {
  const [searchParams] = useSearchParams();
  const sortFilter = searchParams.get("sortFilter");
  console.log(sortFilter);
  return (
    <>
      <div className="flex justify-between h-[100vh] overflow-hidden">
        <div className="flex bg-[#552864]">
          <Sidebar sortFilter={sortFilter ? true : false} />
          <div className="flex-1 ">
            <main
              className={` bg-white px-4  ${
                sortFilter
                  ? "w-full rounded-[2vw] rounded-l-[2vw] py-1"
                  : "w-full rounded-l-[2vw] py-6"
              }`}
            >
              <Outlet />
            </main>
          </div>
        </div>
        <div className={`fixed z-50  ${sortFilter ? "ml-56" : "ml-36"}`}>
          <Header isRightSidebar={sortFilter ? true : false} />
        </div>
        {sortFilter && <Sidebar isRightSidebar={true} />}
      </div>
    </>
  );
};

export default AppLayout;
