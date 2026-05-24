import { AppRegistrationOutlined, ArticleOutlined } from "@superapp/icons";
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
  title?: string;
  icon?: ReactNode;
  href?: string;
  hidden?: boolean;
}

const ITEMS: DrawerItem[] = [
  {
    title: "ثبت فرم",
    icon: <AppRegistrationOutlined />,
    href: "register",
    hidden: false,
  },
  {
    title: "پیش نویس‌ها",
    icon: <ArticleOutlined />,
    hidden: false,
    href: "draft",
  },
];

const DrawerList = () => {
  const navigate = useNavigate();
  const handleNavigate = (item: DrawerItem) => {
    if (item?.href) {
      navigate(item?.href);
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
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default DrawerList;
