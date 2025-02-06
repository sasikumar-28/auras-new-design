import { Sidebar } from "@/components/sidebar";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <main className="absolute bg-white left-28 py-4 px-8 rounded-l-[4vw] min-h-screen w-[92vw]">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
