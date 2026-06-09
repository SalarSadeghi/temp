import { Box, Button, Typography } from "@superapp/ui";
import { QuickActionCard } from "./QuickActionCard";
import {
  AccountBalanceWalletOutlined,
  CalendarMonthOutlined,
  DescriptionOutlined,
  WorkOutline,
} from "@superapp/icons";

const quickActions = [
  {
    id: 1,
    title: "مرخصی",
    icon: <CalendarMonthOutlined sx={{ color: "#16A34A" }} />,
    bg: "#DCFCE7",
  },
  {
    id: 2,
    title: "فیش حقوق",
    icon: <AccountBalanceWalletOutlined sx={{ color: "#2563EB" }} />,
    color: "#2563EB",
    bg: "#DBEAFE",
  },
  {
    id: 3,
    title: "ماموریت",
    icon: <WorkOutline sx={{ color: "#EA580C" }} />,

    bg: "#FFEDD5",
  },
  {
    id: 4,
    title: "حکم کارگزینی",
    icon: <DescriptionOutlined sx={{ color: "#9333EA" }} />,
    color: "9333EA",
    bg: "#F3E8FF",
  },
];
const QuickActionList = () => {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-xs">دسترسی سریع به سرویس‌ها </span>
        <Button size="small" variant="text" color="info">
          مشاهده همه
        </Button>
      </div>
      <div className="flex gap-2">
        {quickActions?.map((action) => (
          <QuickActionCard
            key={action.id}
            title={action.title}
            icon={action.icon}
            bg={action.bg}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActionList;
