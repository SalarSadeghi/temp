import { verify } from "@api/auth";
import { AuthKeys } from "@constants/RQKeys/auth";
import { useTimer } from "@hooks/useTimer";
import { OTPInput } from "@pages/login/OTPInput";
import { useAuthStore } from "@store/auth/authStore";
import { MessageCircleMore, Phone } from "@superapp/icons/lucide";
import {
  Button,
  CustomButton,
  Divider,
  useSnackbar,
  useTheme,
} from "@superapp/ui";
import { useMutation } from "@tanstack/react-query";
import { extractErrors } from "@utils/index";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Texts from "@assets/json/Texts.json";
interface FormValues {
  code: string;
}
const OTP_LENGTH = 6;
const OTPForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    // reset,
    // setValue,
    // watch,
    // formState: { errors },
  } = useForm<FormValues | any>({
    defaultValues: {
      code: "",
    },
  });
  // const { code } = watch();
  // const privatePhone = phonePrivacyFormatters.low("09123456789");
  const {
    isPhoneVerified,
    phone,
    setPhone,
    setIsPhoneVerified,
    setIsAuthenticated,
  } = useAuthStore((state) => state);

  const { mutate: verifyCode, isPending } = useMutation({
    mutationKey: AuthKeys.verify(),
    mutationFn: verify,
    onSuccess: (data) => {
      const { isSuccess } = data;
      if (isSuccess) {
        setIsAuthenticated(true);
        showSnackbar({
          message: (
            <div className="flex gap-1 items-center">
              ورود با موفقیت انجام شد
            </div>
          ),
          severity: "success",
        });
        navigate("/home");
      }
    },
    onError: (err) => {
      const messages = err?.response?.data?.error?.messages;
      if (messages) {
        const extractedErrors = extractErrors(messages);
        extractErrors.length > 0 &&
          showSnackbar({ message: extractedErrors[0], severity: "error" });
      }
    },
  });

  const onSubmit = async (data: FormValues) => {
    verifyCode({
      code: data?.code,
      phone: phone!,
    });
  };

  const { isActive, startTimer, formatTime } = useTimer(300);
  const handleEditPhone = () => {
    setPhone(undefined);
    setIsPhoneVerified(false);
  };

  useEffect(() => {
    startTimer();
  }, []);

  if (!isPhoneVerified || !phone) return;
  return (
    <form
      className="flex flex-col p-4 border shadow-xl bg-white rounded-lg gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 text-xs">
          <span className="text-disabled text-end">شماره موبایل</span>
          <div className="flex flex-row-reverse justify-between">
            <div className="flex flex-row-reverse gap-2 items-center">
              <Phone size={14} />
              <span className="font-semibold">{phone}</span>
            </div>
            <div className="">
              <Button
                onClick={() => handleEditPhone()}
                variant="text"
                size="small"
              >
                <span className="text-xs">{Texts.common.edit}</span>
              </Button>
            </div>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 items-center justify-center">
            <MessageCircleMore size={42} color={theme.palette.info.main} />
            <span className="text-sm font-semibold">کد تایید ارسال شد</span>
            <p className="text-xs text-disabled">
              کد {OTP_LENGTH} رقمی ارسال شده به شماره
              <span
                style={{
                  display: "inline",
                  padding: 4,
                  fontSize: 12,
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                }}
              >
                {phone ?? "-"}
              </span>
              را وارد کنید
            </p>
          </div>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <OTPInput
                length={OTP_LENGTH}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </div>

        <div className="text-xs flex items-center justify-center flex-row-reverse gap-4">
          <span
            className={`${isActive ? "text-success font-semibold" : "text-red-500"}`}
          >
            {" "}
            {formatTime()}
          </span>
          <CustomButton
            disabled={isActive}
            size="small"
            variant="text"
            label="ارسال مجدد"
            type="button"
          />
        </div>
      </div>
      <CustomButton
        // disabled={!code || code.length !== OTP_LENGTH || !isActive}
        type="submit"
        label="تایید و ورود"
        color="primary"
        variant="contained"
        isLoading={isPending}
      />
    </form>
  );
};

export default OTPForm;

// type ErrorItem = string | Record<string, string[]>;
// type ErrorList = ErrorItem[];

// export function extractErrors(errors: ErrorList): string[] {
//   if (!Array.isArray(errors)) {
//     return [];
//   }

//   return errors.reduce<string[]>((acc, error) => {
//     if (typeof error === "string") {
//       // Handle string case
//       acc.push(error);
//     } else if (typeof error === "object" && error !== null) {
//       // Handle object case - extract all values from the object
//       const errorMessages = Object.values(error).flat();
//       acc.push(...errorMessages);
//     }
//     return acc;
//   }, []);
// }

// Alternative: More concise version using flatMap
// export function extractErrorsConcise(errors: ErrorList): string[] {
//   if (!Array.isArray(errors)) {
//     return [];
//   }

//   return errors.flatMap((error) => {
//     if (typeof error === "string") {
//       return [error];
//     }
//     if (typeof error === "object" && error !== null) {
//       return Object.values(error).flat();
//     }
//     return [];
//   });
// }
