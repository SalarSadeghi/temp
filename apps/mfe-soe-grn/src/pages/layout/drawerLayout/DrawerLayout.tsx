import { Menu } from "@superapp/icons";
import { Drawer, IconButton } from "@superapp/ui";
import { Outlet } from "react-router-dom";
import DrawerList from "./DrawerList";
import { useDrawerStore } from "@store/drawerStore";

const DrawerLayout = () => {
  const { isOpenDrawer, changeOpenDrawer } = useDrawerStore();
  const toggleDrawer = (newOpen: boolean) => () => {
    changeOpenDrawer(newOpen);
  };

  return (
    <div className="flex flex-col relative">
      <div className="flex justify-center items-center bg-green-50 sticky z-10 shadow-md top-0 right-0">
        <IconButton onClick={toggleDrawer(true)}>
          <Menu />
        </IconButton>
        <span>عنوان</span>
      </div>
      <Drawer open={isOpenDrawer} onClose={toggleDrawer(false)}>
        <DrawerList />
      </Drawer>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DrawerLayout;
