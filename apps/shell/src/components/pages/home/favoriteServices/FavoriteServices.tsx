import IconBox from "@components/common/IconBox";
import SectionTitle from "@components/common/SectionTitle";
import ServiceBox from "@components/common/ServiceBox";
import { Briefcase, Plus, Stethoscope, Wallet } from "@superapp/icons/lucide";
import { Card, useTheme } from "@superapp/ui";

const favoriteServices = [
  {
    id: 1,
    title: "معاینات دوره‌ای",
    icon: <Stethoscope color="#9333EA" />,
    bg: "#F3E8FF",
  },
  {
    id: 2,
    title: "ماموریت",
    icon: <Briefcase color="#EA580C" />,
    bg: "#FFEDD5",
  },
  {
    id: 3,
    title: "کیف پول",
    icon: <Wallet color="#2563EB" />,
    bg: "#DBEAFE",
  },
];
const FavoriteServices = () => {
  const theme = useTheme();
  return (
    <div className="flex flex-col gap2">
      <SectionTitle buttonText="ویرایش" title="سرویس‌هاس محبوب" />
      <div className="flex gap-2">
        {favoriteServices?.map((service, i) => (
          <ServiceBox
            key={i}
            icon={service.icon}
            iconBoxBg={service.bg}
            serviceBoxSX={{ width: 75, height: 75 }}
            iconBoxSX={{ width: 32, height: 32 }}
            title={service?.title}
            titleSX={{ fontSize: 10, fontWeight: 600 }}
          />
        ))}
        <ServiceBox
          icon={<Plus className="text-disabled" />}
          serviceBoxSX={{ width: 75, height: 75 }}
          iconBoxSX={{ width: 32, height: 32 }}
          title="افزودن"
          titleSX={{ color: theme.palette.text.disabled, fontSize: 10, fontWeight: 600 }}
        />
      </div>
    </div>
  );
};

export default FavoriteServices;
