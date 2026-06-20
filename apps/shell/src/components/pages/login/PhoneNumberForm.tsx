import { yupResolver } from "@hookform/resolvers/yup";
import { Phone } from "@superapp/icons/lucide";
import { CustomTextInput, InputAdornment, useSnackbar } from "@superapp/ui";
import { LoginFormSchema } from "@validations/loginPage/LoginFormSchema";
import { useForm } from "react-hook-form";
import LoginByPassBox from "./LoginByPassBox";
import LoginByOTPBox from "./LoginByOTPBox";
import { useMutation } from "@tanstack/react-query";
import { login } from "@api/auth";
import { AuthKeys } from "@constants/RQKeys/auth";
import { useAuthStore } from "@store/auth/authStore";
import { extractErrors } from "@utils/index";

interface FormValues {
  phone: string;
}

const PhoneNumberForm = () => {
  const { showSnackbar } = useSnackbar();
  const { setPhone, setIsPhoneVerified } = useAuthStore();
  const {
    handleSubmit,
    control,
    // reset,
    // setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues | any>({
    resolver: yupResolver(LoginFormSchema),
  });
  const { phone } = watch();
  const { mutate: getCode } = useMutation({
    mutationKey: AuthKeys.login(),
    mutationFn: login,
    onSuccess: (data) => {
      showSnackbar({ message: data.data?.message, severity: "success" });
      setPhone(phone);
      setIsPhoneVerified(true);
    },
    onError: (error) => {
      const messages = error.response?.data.error?.messages;
      if (messages) {
        const extracted = extractErrors(messages);
        extracted.length > 0 &&
          showSnackbar({ message: extracted[0], severity: "error" });
      }
    },
  });

  const onSubmit = async (data: FormValues) => {
    getCode(data.phone);
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
              errors?.phone?.message && (errors?.phone?.message as string)
            }
            type="tel"
            control={control}
            name="phone"
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
