import {
  Briefcase,
  FlameKindling,
  Stethoscope,
  Wallet,
} from "@superapp/icons/lucide";
import SectionTitle from "@components/common/SectionTitle";
// import ServiceBox from "@components/common/ServiceBox";
import { useNavigate } from "react-router-dom";
import CustomListItem from "@components/common/CustomListItem";
interface IQuickAction {
  id: string | number;
  title: string;
  icon: React.ReactNode;
  bg: string;
  href?: string;
}
const quickActions = [
  {
    id: 1,
    title: "کارت سبز",
    icon: <FlameKindling color="#ff3737" />,
    bg: "#dc28281a",
    href: "/soe/grn",
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
  const navigate = useNavigate();
  const handleServiceBoxClick = (item: IQuickAction) => {
    if (item?.href) navigate(item.href);
  };

  return (
    <div className="flex flex-col gap-2">
      <SectionTitle buttonText="مشاهده همه" title="دسترسی سریع به سرویس‌ها" />
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {quickActions?.map((action, i) => (
          <CustomListItem
            onClick={() => handleServiceBoxClick(action)}
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
