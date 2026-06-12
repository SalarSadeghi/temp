import { Headset, ShieldCheck } from "@superapp/icons/lucide";
import { Typography, useTheme } from "@superapp/ui";

const LoginFooter = () => {
  const theme = useTheme();
  return (
    <div className="flex flex-col  justify-between p-4">
      <div className="flex items-center gap-2">
        <ShieldCheck className="text-disabled" size={18} strokeWidth={3} />
        <span className="text-xs font-medium text-disabled">
          اطلاعات شما محفوظ و محرمانه است
        </span>
      </div>
      <div className="flex flex-col gap-2 text-xs items-center pt-8">
        <span className="text-disabled">نیاز به راهنمایی دارید؟</span>
        <div className="text-xs flex gap-2">
          <Typography sx={{ fontSize: 12, color: theme.palette.primary.main }}>
            پشتیبانی
          </Typography>
          <Headset size={18} color={theme.palette.primary.main} />
        </div>
      </div>
    </div>
  );
};

export default LoginFooter;
