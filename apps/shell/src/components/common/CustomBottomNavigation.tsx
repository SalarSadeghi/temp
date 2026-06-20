import { BottomNavigation, BottomNavigationAction } from "@superapp/ui";
import React, { ReactNode, useEffect } from "react";
import {
  House,
  LayoutGrid,
  MessageSquareMore,
  User,
} from "@superapp/icons/lucide";
import { useLocation, useNavigate } from "react-router-dom";

interface IBottomNavigationItems {
  label?: string;
  icon?: ReactNode;
  href?: string;
}
const BottomNavigationItems: IBottomNavigationItems[] = [
  { label: "خانه", icon: <House />, href: "/home" },
  { label: "سرویس‌ها", icon: <LayoutGrid />, href: "/services" },
  { label: "صندوق پیام", icon: <MessageSquareMore /> },
  { label: "پروفایل", icon: <User />, href: "/profile" },
];
const CustomBottomNavigation = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleChangeButtomNavigation = (
    _event: React.SyntheticEvent,
    value: any
  ) => {
    setValue(value);
    const path = BottomNavigationItems[value].href;
    if (path) navigate(path);
  };

  useEffect(() => {
    const currentIndex = BottomNavigationItems?.findIndex(
      (item) => item.href === pathname
    );
    if (currentIndex !== -1) setValue(currentIndex);
  }, []);

  return (
    <BottomNavigation
      className="border-t border-solid"
      showLabels
      value={value}
      // onChange={(_event, newValue) => {
      //   setValue(newValue);
      // }}
      onChange={(event: React.SyntheticEvent, value: any) =>
        handleChangeButtomNavigation(event, value)
      }
    >
      {BottomNavigationItems?.map((item, i) => (
        <BottomNavigationAction key={i} label={item.label} icon={item.icon} />
      ))}
    </BottomNavigation>
  );
};

export default CustomBottomNavigation;
