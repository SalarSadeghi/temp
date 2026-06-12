import SectionTitle from "@components/common/SectionTitle";
import RecentActivityCard from "./RecentActivityCard";
import { Briefcase, Check, FileText } from "@superapp/icons/lucide";

export const activities = [
  {
    title: "درخواست مرخصی شما تایید شد",
    subtitle: "مرخصی استحقاقی - ۲ روز",
    icon: <Check className="text-success-dark" />,
    iconBg: "#aaffc7",
  },

  {
    title: "فیش حقوق خرداد منتشر شد",
    subtitle: "قابل مشاهده در بخش فیش حقوق",
    icon: <FileText className="text-primary-dark" />,
    iconBg: "#F3E8FF",
  },

  {
    title: "درخواست ماموریت ثبت شد",
    subtitle: "تهران - اصفهان",
    icon: <Briefcase color="#EA580C" />,
    iconBg: "#FFEDD5",
  },
];
const RecentActivityList = () => {
  return (
    <div className="flex flex-col gap-2">
      <SectionTitle title="آخرین فعالیت‌ها" buttonText="مشاهده همه" />
      <div className="flex flex-col gap-1">
        {activities?.map((active, i) => (
          <RecentActivityCard
            title={active.title}
            subtitle={active.subtitle}
            icon={active.icon}
            iconBoxBg={active.iconBg}
            iconBoxSX={{ width: 32, height: 32 }}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentActivityList;
