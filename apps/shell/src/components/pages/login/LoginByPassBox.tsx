import IconBox from "@components/common/IconBox";
import { ChevronRight, LockKeyhole } from "@superapp/icons/lucide";
import { IconButton, useSnackbar, useTheme } from "@superapp/ui";

const LoginByPassBox = () => {
    const {showSnackbar} = useSnackbar()
  const theme = useTheme();
  const handleLoginByPass = () => {
    showSnackbar({
        message: "در حال حاضر این سرویس در دسترس نمی‌باشد",
        severity: "info"
    })
  }
  return (
    <div className="h-24 bg-white rounded-xl justify-between border shadow-lg p-4 flex flex-row-reverse items-center">
      <div>
        <IconBox
          icon={<LockKeyhole size={22} color={theme.palette.primary.main} />}
          iconBoxBg={"#F3E8FF"}
        />
      </div>
      <div className="text-xs gap-1 flex flex-col">
        <span className="font-semibold">ورود با کلمه عبور</span>
        <span className="text-disabled text-[10px]">
          با رمز حساب کاربری خود وارد شوید
        </span>
      </div>
      <div>
        <IconButton onClick={handleLoginByPass} type="button">
          <ChevronRight size={20} color={theme.palette.primary.main} />
        </IconButton>
      </div>
    </div>
  );
};

export default LoginByPassBox;
