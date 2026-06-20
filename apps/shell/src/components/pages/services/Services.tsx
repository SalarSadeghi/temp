import HomeSearch from "../home/search/HomeSearch";
import Categories from "./Categories";
import FavouriteServiceBox from "./FavouriteServiceBox";
import ServicesTitle from "./ServicesTitle";
import {
  Briefcase,
  FlameKindling,
  Stethoscope,
  Wallet,
} from "@superapp/icons/lucide";

const ServisecList = [
  {
    id: 1,
    title: "کارت سبز",
    subtitle: "ثبت کارت سبز",
    icon: <FlameKindling color="#ff3737" />,
    bg: "#dc28281a",
    href: "/soe/grn/",
  },
  {
    id: 2,
    title: "کیف پول",
    subtitle: "مشاهده کیف پول",
    icon: <Wallet color="#2563EB" />,
    bg: "#DBEAFE",
  },
  {
    id: 3,
    title: "ماموریت",
    subtitle: "ثبت و پیگیری ماموریت",
    icon: <Briefcase color="#EA580C" />,
    bg: "#FFEDD5",
  },
  {
    id: 4,
    title: "معاینات دوره‌ای",
    subtitle: "بررسی معاینات",
    icon: <Stethoscope color="#9333EA" />,
    bg: "#F3E8FF",
  },
  {
    id: 5,
    title: "کارت سبز",
    subtitle: "ثبت کارت سبز",
    icon: <FlameKindling color="#ff3737" />,
    bg: "#dc28281a",
    href: "/soe/grn/",
  },
  {
    id: 6,
    title: "کیف پول",
    subtitle: "مشاهده کیف پول",
    icon: <Wallet color="#2563EB" />,
    bg: "#DBEAFE",
  },
  {
    id: 7,
    title: "ماموریت",
    subtitle: "ثبت و پیگیری ماموریت",
    icon: <Briefcase color="#EA580C" />,
    bg: "#FFEDD5",
  },
  {
    id: 8,
    title: "معاینات دوره‌ای",
    subtitle: "بررسی معاینات",
    icon: <Stethoscope color="#9333EA" />,
    bg: "#F3E8FF",
  },
  {
    id: 9,
    title: "کارت سبز",
    subtitle: "ثبت کارت سبز",
    icon: <FlameKindling color="#ff3737" />,
    bg: "#dc28281a",
    href: "/soe/grn/",
  },
  {
    id: 10,
    title: "کیف پول",
    subtitle: "مشاهده کیف پول",
    icon: <Wallet color="#2563EB" />,
    bg: "#DBEAFE",
  },
  {
    id: 11,
    title: "ماموریت",
    subtitle: "ثبت و پیگیری ماموریت",
    icon: <Briefcase color="#EA580C" />,
    bg: "#FFEDD5",
  },
  {
    id: 12,
    title: "معاینات دوره‌ای",
    subtitle: "بررسی معاینات",
    icon: <Stethoscope color="#9333EA" />,
    bg: "#F3E8FF",
  },
];
const Services = () => {
  return (
    <div className="flex flex-col gap-4">
      <HomeSearch />
      <Categories />
      <ServicesTitle />
      <div className="flex flex-wrap w-full gap-2">
        {ServisecList?.map((s) => (
          <FavouriteServiceBox
            key={s.id}
            icon={s.icon}
            iconBoxBg={s.bg}
            title={s.title}
            subtitle={s.subtitle}
            href={s.href}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
