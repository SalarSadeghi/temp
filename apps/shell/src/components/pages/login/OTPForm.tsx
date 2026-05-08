import { useTimer } from "@hooks/useTimer";
import { OTPInput } from "@pages/login/OTPInput";
import { Edit } from "@superapp/icons";
import { CustomButton, IconButton } from "@superapp/ui";
import { phonePrivacyFormatters } from "@utils/formatter/phonePrivacyFormatter";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface FormValues {
  otp: string;
}
const OTP_LENGTH = 6;
const OTPForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues | any>({
    defaultValues: {
      otp: "",
    },
  });
  const { otp } = watch();
  const privatePhone = phonePrivacyFormatters.low("09123456789");

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };

  const { seconds, isActive, startTimer, resetTimer, formatTime } = useTimer(5);

  useEffect(() => {
    startTimer();
  }, []);
  console.log(isActive);

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex items-center text-gray-400 text-[10px]">
            <div className="flex">
              <span>{`لطفا کد پیامک شده به (`}</span>
              <span dir="ltr" className="font-semibold">
                {privatePhone}
              </span>
              <span>{`) را وارد نمایید`}</span>
            </div>
            <IconButton>
              <Edit color="primary" className="" sx={{ fontSize: "15px" }} />
            </IconButton>
          </div>
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
        <div className="text-xs flex items-center gap-4">
          <span className="text-gray-400">زمان باقیمانده:</span>
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
        label="تایید"
        color="success"
        variant="contained"
      />
    </form>
  );
};

export default OTPForm;
