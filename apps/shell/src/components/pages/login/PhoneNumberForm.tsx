import { yupResolver } from "@hookform/resolvers/yup";
import { PhoneAndroid } from "@superapp/icons";
import { Phone } from "@superapp/icons/lucide";
import { CustomButton, CustomTextInput, InputAdornment } from "@superapp/ui";
import { LoginFormSchema } from "@validations/loginPage/LoginFormSchema";
import { useForm } from "react-hook-form";
import LoginByPassBox from "./LoginByPassBox";
import LoginByOTPBox from "./LoginByOTPBox";

interface FormValues {
  phoneNumber: string;
}

const PhoneNumberForm = () => {
  const {
    handleSubmit,
    control,
    // reset,
    // setValue,
    // watch,
    formState: { errors },
  } = useForm<FormValues | any>({
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <span className="text-disabled text-xs text-center">
        برای ورود، شماره موبایل خود را وارد کنید
      </span>
      <div className="flex flex-col gap-2">
        <div className="shadow-lg bg-white gap-2 flex flex-col border w-full px-6 pt-6 pb-4 rounded-lg">
          <span className="text-left text-xs text-disabled">شماره موبایل</span>
          <CustomTextInput
            size="small"
            helperText={
              errors?.phoneNumber?.message &&
              (errors?.phoneNumber?.message as string)
            }
            type="tel"
            control={control}
            name="phoneNumber"
            label=""
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Phone size={20} />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <span className="text-xs text-disabled font-medium">
          روش ورود را انتخاب کنید
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <LoginByPassBox />
        <LoginByOTPBox />
      </div>
    </form>
  );
};

export default PhoneNumberForm;
