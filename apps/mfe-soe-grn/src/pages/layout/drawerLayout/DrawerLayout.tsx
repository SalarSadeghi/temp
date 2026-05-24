import { Menu } from "@superapp/icons";
import { Drawer, IconButton } from "@superapp/ui";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import DrawerList from "./DrawerList";

const DrawerLayout = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <IconButton onClick={toggleDrawer(true)}>
          <Menu />
        </IconButton>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList />
      </Drawer>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DrawerLayout;
