import { useTimer } from "@hooks/useTimer";
import { OTPInput } from "@pages/login/OTPInput";
import { MessageCircleMore, Phone } from "@superapp/icons/lucide";
import { Edit } from "@superapp/icons/mui";
import {
  Button,
  CustomButton,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@superapp/ui";
import { phonePrivacyFormatters } from "@utils/formatter/phonePrivacyFormatter";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface FormValues {
  otp: string;
}
const OTP_LENGTH = 6;
const OTPForm = () => {
  const theme = useTheme();
  const {
    handleSubmit,
    control,
    // reset,
    // setValue,
    watch,
    // formState: { errors },
  } = useForm<FormValues | any>({
    defaultValues: {
      otp: "",
    },
  });
  const { otp } = watch();
  // const privatePhone = phonePrivacyFormatters.low("09123456789");

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };

  const { isActive, startTimer, formatTime } = useTimer(120);

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <form
      className="flex flex-col p-4 border shadow-xl bg-white rounded-lg  gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 text-xs">
          <span className="text-disabled text-end">شماره موبایل</span>
          <div className="flex flex-row-reverse justify-between">
            <div className="flex flex-row-reverse gap-2 items-center">
              <Phone size={14} />
              <span className="font-semibold">09217440127</span>
            </div>
            <div className="">
              <Button variant="text" size="small">
                <span className="text-xs"> ویرایش</span>
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
              کد 6 رقمی ارسال شده به شماره
              <span
                style={{
                  display: "inline",
                  padding: 4,
                  fontSize: 12,
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                }}
              >
                09217440127
              </span>
              را وارد کنید
            </p>
          </div>
          <Controller
            name="otp"
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
          <span className={`${isActive ? "text-green-500" : "text-red-500"}`}>
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
        disabled={!otp || otp.length !== OTP_LENGTH || !isActive}
        type="submit"
        label="تایید و ورود"
        color="primary"
        variant="contained"
      />
    </form>
  );
};

export default OTPForm;
