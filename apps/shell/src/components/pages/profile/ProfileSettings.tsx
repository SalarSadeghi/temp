import CustomListItem from "@components/common/CustomListItem";
import { IconBoxProps } from "@components/common/IconBox";
import { BadgeInfo, Bell, KeyRound, ShieldAlert } from "@superapp/icons/lucide";
import { Divider, useTheme } from "@superapp/ui";

interface ISettingsItem extends IconBoxProps {
  title?: string;
  href?: string;
  icon?: React.ReactNode;
}

const ProfileSettings = () => {
  const theme = useTheme();
  const SettingsItem: ISettingsItem[] = [
    {
      title: "اعلان‌ها",
      href: "",
      icon: <Bell color={theme.palette.primary.main} size={16} />,
    },
    {
      title: "امنیت",
      href: "",
      icon: <ShieldAlert color={theme.palette.primary.main} size={16} />,
    },
    {
      title: "تغییر رمز عبور",
      href: "",
      icon: <KeyRound color={theme.palette.primary.main} size={16} />,
    },
    {
      title: "درباره اپلیکیشن",
      href: "",
      icon: <BadgeInfo color={theme.palette.primary.main} size={16} />,
    },
  ];

  return (
    <div className="p-4 rounded-lg bg-white flex flex-col shadow-md">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="flex w-full justify-start">
          <span className="text-xs font-semibold">تنظیمات</span>
        </div>
        {SettingsItem?.map((item, i, arr) => (
          <>
            <CustomListItem
              onClick={() => {}}
              variant="compactAction"
              containerSX={{ border: "none", p: 0, m: 0, height: "" }}
              iconBoxBg={theme.palette.primary.light}
              icon={item.icon}
              iconBoxSX={{ width: 28, height: 28 }}
              title={item.title}
              titleSX={{ fontWeight: "" }}
            />
            {arr.length - 1 !== i && <Divider className="w-full bg-default" />}
          </>
        ))}
      </div>
    </div>
  );
};

export default ProfileSettings;
