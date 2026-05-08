import * as yup from "yup";
// import Texts from '@assets/json/Texts.json';
import { ValidationErrors } from "@validations/ValidationErrors";

const persianPhoneRegex = /^(0|۰)?(9|۹)[0-9۰-۹]{9}$/;

export const LoginFormSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("شماره همراه الزامی است")
    .matches(/^(09|9|۰۹|۹)[0-9۰-۹]{9}$/, "شماره همراه معتبر نیست"),
});
// phoneNumber: yup
//   .string()
//   .max(12, "شماره همراه وارد شده معتبر نمی‌باشد")
//   .test("telephone", "شماره همراه وارد شده معتبر نمی‌باشد", function (value) {
//     if (value && value.trim().length > 0) {
//       const hasNonDigit = value
//         .split("")
//         .some((letter) => !/\d/.test(letter));
//       if (hasNonDigit) {
//         return false;
//       }
//     }
//     return true;
//   })
//   .required("شماره همراه الزامی می‌باشد."),
