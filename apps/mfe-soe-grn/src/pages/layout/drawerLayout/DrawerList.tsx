import { useDrawerStore } from "@store/drawerStore";
import { useGreenCardStore } from "@store/greenCardStore";
import {
  AppRegistrationOutlined,
  ArticleOutlined,
  SendOutlined,
} from "@superapp/icons";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@superapp/ui";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface DrawerItem {
  sidebarTitle?: string;
  pageTitle?: string;
  icon?: ReactNode;
  href?: string;
  hidden?: boolean;
}

const ITEMS: DrawerItem[] = [
  {
    sidebarTitle: "ثبت فرم کارت سبز",
    pageTitle: "ثبت فرم کارت سبز",
    icon: <AppRegistrationOutlined />,
    href: "register",
    hidden: false,
  },
  {
    sidebarTitle: "پیش نویس‌های کارت سبز",
    pageTitle: "پیش‌نویس کارت سبز",
    icon: <ArticleOutlined />,
    hidden: false,
    href: "draft",
  },
  {
    sidebarTitle: "کارت سبز‌های ارسال شده",
    pageTitle: "ارسالی‌های کارت سبز",
    icon: <SendOutlined />,
    hidden: false,
    href: "sent",
  },
];

const DrawerList = () => {
  const { changeOpenDrawer } = useDrawerStore();
  const { setPageTitle } = useGreenCardStore();
  const navigate = useNavigate();
  const handleNavigate = (item: DrawerItem) => {
    if (item?.href) {
      navigate(item?.href);
      changeOpenDrawer(false);
      setPageTitle(item?.pageTitle || "");
    }
  };
  return (
    <div>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        // onClick={toggleDrawer(false)}
      >
        <div className="flex flex-col p-4">
          <span>سالار صادقی</span>
          <span>01123456</span>
        </div>
        <Divider />
        <List>
          {ITEMS.filter((item) => !item.hidden).map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              onClick={() => handleNavigate(item)}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={<span className="text-xs">{item.sidebarTitle}</span>}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default DrawerList;
