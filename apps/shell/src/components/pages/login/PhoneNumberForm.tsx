import { yupResolver } from "@hookform/resolvers/yup";
import {  PhoneAndroid } from "@superapp/icons";
import { CustomButton, CustomTextInput, InputAdornment } from "@superapp/ui";
import { LoginFormSchema } from "@validations/loginPage/LoginFormSchema";
import { useForm } from "react-hook-form";

interface FormValues {
  phoneNumber: string;
}

const PhoneNumberForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues | any>({
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };
 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div>
          <span className="text-[10px] text-gray-400">
            شماره همراه خود را در این قسمت وارد نمایید.
          </span>
        </div>
        <CustomTextInput
          helperText={
            errors?.phoneNumber?.message &&
            (errors?.phoneNumber?.message as string)
          }
          type="tel"
          control={control}
          name="phoneNumber"
          label="شماره همراه"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneAndroid />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <CustomButton
        label="ارسال"
        variant="contained"
        type="submit"
        color="success"
      />
    </form>
  );
};

export default PhoneNumberForm;
