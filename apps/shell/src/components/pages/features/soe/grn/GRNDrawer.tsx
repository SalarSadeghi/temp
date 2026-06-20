// import { useDrawerStore } from "@store/soe/grn/drawerStore";
// import { useGreenCardStore } from "@store/soe/grn/greenCardStore";
// import { Menu } from "@superapp/icons";
import {
  // Drawer, IconButton,
  useTheme,
} from "@superapp/ui";
import {
  //  Outlet,
  useNavigate,
} from "react-router-dom";
// import GRNDrawerList from "./GRNDrawerList";
import { ReactNode } from "react";
import { NotebookPen, PencilLine, Send } from "@superapp/icons/lucide";
import CustomListItem from "@components/common/CustomListItem";

interface GRNItem {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  href?: string;
  hidden?: boolean;
  bg?: string;
}

const GRNDrawer = () => {
  const theme = useTheme();
  // const { isOpenDrawer, changeOpenDrawer } = useDrawerStore();
  // const { pageTitle } = useGreenCardStore();
  // const toggleDrawer = (newOpen: boolean) => () => {
  //   changeOpenDrawer(newOpen);
  // };
  const ITEMS: GRNItem[] = [
    {
      title: "ثبت فرم کارت سبز",
      subtitle: "ثبت کارت سبز",
      icon: <PencilLine size={20} color={theme.palette.primary.main} />,
      bg: theme.palette.primary.light,
      href: "register",
      hidden: false,
    },
    {
      title: "پیش نویس‌های کارت سبز",
      subtitle: "پیش‌نویس کارت سبز",
      icon: <NotebookPen color={theme.palette.warning.main} />,
      bg: theme.palette.warning.light,
      hidden: false,
      href: "draft",
    },
    {
      title: "کارت سبز‌های ارسال شده",
      subtitle: "ارسالی‌های کارت سبز",
      icon: <Send color={theme.palette.success.main} />,
      bg: theme.palette.success.light,
      hidden: false,
      href: "sent",
    },
  ];
  const navigate = useNavigate();
  const handleNavigate = (item: GRNItem) => {
    if (item?.href) {
      navigate(item.href);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="p-4 flex flex-col gap-4">
        {ITEMS?.map((item) => (
          <CustomListItem
            variant="compactAction"
            icon={item.icon}
            iconBoxBg={item.bg}
            iconBoxSX={{ width: 32, height: 32 }}
            href={item.href}
            subtitle={item.subtitle}
            title={item.title}
            onClick={() => handleNavigate(item)}
          />
        ))}
      </div>

      {/* <div className="flex bg-default justify-center items-center sticky z-10 top-0 right-0">
        <IconButton onClick={toggleDrawer(true)}>
          <Menu />
        </IconButton>
        <span>{pageTitle}</span>
      </div>
      <Drawer open={isOpenDrawer} onClose={toggleDrawer(false)}>
        <GRNDrawerList />
      </Drawer> */}

      {/* <div className="p-4 flex-1 overflow-y-auto">
        <Outlet />
      </div> */}
    </div>
  );
};

export default GRNDrawer;
