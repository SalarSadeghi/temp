import CustomCircularProgress from "@components/common/CustomCircularProgress";
import IconBox from "@components/common/IconBox";
import { AuthKeys } from "@constants/RQKeys/auth";
import { ChevronRight, MessageSquareMore } from "@superapp/icons/lucide";
import { IconButton, useTheme } from "@superapp/ui";
import { useIsMutating } from "@tanstack/react-query";

const LoginByOTPBox = () => {
  const theme = useTheme();

  const isPending = useIsMutating({ mutationKey: AuthKeys.login() }) > 0;

  return (
    <div className="h-24 bg-white rounded-xl justify-between border shadow-lg p-4 flex flex-row-reverse items-center">
      <div>
        <IconBox
          icon={
            <MessageSquareMore size={22} color={theme.palette.success.main} />
          }
          iconBoxBg={theme.palette.success.light}
        />
      </div>
      <div className="text-xs gap-1 flex flex-col">
        <span className="font-semibold">ورود با پیامک</span>
        <span className="text-disabled text-[10px]">
          یک کد تایید به شماره شما ارسال شود
        </span>
      </div>
      <div>
        <IconButton disabled={!!isPending} type="submit">
          {!isPending ? (
            <ChevronRight size={20} color={theme.palette.primary.main} />
          ) : (
            <CustomCircularProgress size={20} />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default LoginByOTPBox;
