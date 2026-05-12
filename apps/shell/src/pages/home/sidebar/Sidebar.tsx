import { useSidebarStore } from "@superapp/shared-store/stores/sidebarStore.js";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

const Sidebar = () => {
  const { isSidebarOpen } = useSidebarStore();
  return (
    <div
      //   onClick={(e) => e.stopPropagation()}
      className={`absolute right-0 top-0  rounded-l-lg h-screen z-10  bg-gradient-to-bl  from-[#9945FF] to-[#14F195]  transition-all duration-300 ease-in-out flex-col  ${isSidebarOpen ? "w-1/2" : "w-0 "}`}
    >
      {isSidebarOpen && (
        <>
          <div className="h-16 p-4">
            <SidebarHeader />
          </div>
          <div className="p-4 absolute bottom-4 right-0">
            <SidebarFooter />
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
