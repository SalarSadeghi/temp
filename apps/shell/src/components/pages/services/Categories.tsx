import CustomListItem from "@components/common/CustomListItem";
import {
  Landmark,
  LayoutGrid,
  Leaf,
  TrendingUp,
  Users,
} from "@superapp/icons/lucide";
import { useTheme } from "@superapp/ui";

const Categories = () => {
  const theme = useTheme();
  const categories = [
    {
      name: "soe",
      title: "استراتژی",
      icon: <TrendingUp color={theme.palette.error.main} size={20} />,
      iconBoxBg: theme.palette.error.light,
    },
    {
      name: "adm",
      title: "امور اداری",
      icon: <Landmark color={theme.palette.primary.main} size={20} />,
      iconBoxBg: theme.palette.primary.light,
    },
    {
      name: "hr",
      title: "دفتر پیشخوان",
      icon: <Users color={theme.palette.warning.main} size={20} />,
      iconBoxBg: theme.palette.warning.light,
    },
    {
      name: "hse",
      title: "HSE",
      icon: <Leaf color={theme.palette.success.main} size={20} />,
      iconBoxBg: theme.palette.success.light,
    },
    {
      name: "all",
      title: "همه",
      icon: <LayoutGrid color={theme.palette.primary.main} size={20} />,
      //   iconBoxBg: theme.palette.primary.light,
    },
  ];
  return (
    <div className="flex overflow-auto gap-2 scrollbar-hide">
      {categories?.map((c, i) => (
        <CustomListItem
          iconBoxBg={c.iconBoxBg}
          iconBoxSX={{ width: 28, height: 28 }}
          icon={c.icon}
          containerSX={{ width: 72, height: 72 }}
          key={i}
          title={c.title}
          titleSX={{ wordBreak: "break-word" }}
        />
      ))}
    </div>
  );
};

export default Categories;
