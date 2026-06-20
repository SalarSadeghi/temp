import IconBox from "@components/common/IconBox";
import {
  Building2,
  PencilLine,
  Phone,
  UserRound,
} from "@superapp/icons/lucide";
import { Avatar, Button, Divider, useTheme } from "@superapp/ui";

const ProfileHeader = () => {
  const theme = useTheme();
  return (
    <div className="p-4 rounded-lg bg-white flex flex-col shadow-md">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-[70px] h-[70px] rounded-full flex justify-center items-center border-primary border-4">
          <Avatar sx={{ width: 64, height: 64 }}>
            <UserRound />
          </Avatar>
        </div>
        <div className="flex justify-center items-center flex-col gap-1">
          <span className="font-semibold text-sm">علی رحیمی</span>
          <span className="text-xs text-disabled">کارشناس منابع انسانی</span>
        </div>
        <Divider className="w-full bg-default" />
        <div className="flex py-1 w-full text-xs justify-between items-center">
          <div className="flex gap-2 items-center">
            <IconBox
              iconBoxBg={theme.palette.info.light}
              icon={<Phone color={theme.palette.info.main} size={16} />}
              iconBoxSX={{ width: 28, height: 28 }}
            />
            <span>شماره موبایل</span>
          </div>
          <div>
            <span className="font-medium">09217440127</span>
          </div>
        </div>
        <Divider className="w-full bg-default" />
        <div className="flex py-1 w-full text-xs justify-between items-center">
          <div className="flex gap-2 items-center">
            <IconBox
              iconBoxBg={theme.palette.info.light}
              icon={<Building2 color={theme.palette.info.main} size={16} />}
              iconBoxSX={{ width: 28, height: 28 }}
            />
            <span>واحد سازمانی</span>
          </div>
          <div>
            <span className="font-medium">مدیریت سیستم‌های اطلاعاتی</span>
          </div>
        </div>
        <Divider className="w-full bg-default" />
        <div className="w-full">
          <Button
            fullWidth
            variant="outlined"
            startIcon={<PencilLine size={16} />}
          >
            <span className="font-normal"> ویرایش پروفایل</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
