import { BottomNavigation, BottomNavigationAction } from "@superapp/ui";
import React, { ReactNode } from "react";
import {
  House,
  LayoutGrid,
  MessageSquareMore,
  User,
} from "@superapp/icons/lucide";

interface IBottomNavigationItems {
  label?: string;
  icon?: ReactNode;
  href?: string;
}
const BottomNavigationItems: IBottomNavigationItems[] = [
  { label: "خانه", icon: <House /> },
  { label: "سرویس‌ها", icon: <LayoutGrid /> },
  { label: "صندوق پیام", icon: <MessageSquareMore /> },
  { label: "پروفایل", icon: <User /> },
];
const CustomBottomNavigation = () => {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      className="border-t border-solid border-[#E2E8F0]"
      showLabels
      value={value}
      onChange={(_event, newValue) => {
        setValue(newValue);
      }}
    >
      {BottomNavigationItems?.map((item, i) => (
        <BottomNavigationAction key={i} label={item.label} icon={item.icon} />
      ))}
    </BottomNavigation>
  );
};

export default CustomBottomNavigation;
