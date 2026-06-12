import { Button } from "@superapp/ui";
import { QuickActionCard } from "./QuickActionCard";

import {
  Briefcase,
  FlameKindling,
  Stethoscope,
  Wallet,
} from "@superapp/icons/lucide";
import SectionTitle from "@components/common/SectionTitle";
import ServiceBox from "@components/common/ServiceBox";
const quickActions = [
  {
    id: 1,
    title: "کارت سبز",
    icon: <FlameKindling color="#ff3737" />,
    bg: "#dc28281a",
  },
  {
    id: 2,
    title: "کیف پول",
    icon: <Wallet color="#2563EB" />,
    bg: "#DBEAFE",
  },
  {
    id: 3,
    title: "ماموریت",
    icon: <Briefcase color="#EA580C" />,
    bg: "#FFEDD5",
  },
  {
    id: 4,
    title: "معاینات دوره‌ای",
    icon: <Stethoscope color="#9333EA" />,
    bg: "#F3E8FF",
  },
];
const QuickActionList = () => {
  return (
    <div className="flex flex-col gap-2">
      <SectionTitle buttonText="مشاهده همه" title="دسترسی سریع به سرویس‌ها" />
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {quickActions?.map((action, i) => (
          <ServiceBox
            key={i}
            icon={action.icon}
            iconBoxBg={action.bg}
            title={action.title}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActionList;
