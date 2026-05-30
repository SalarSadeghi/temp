import * as yup from "yup";
import { Shared_Text } from "@superapp/ui";

export const RegisterGreenCardFormSchema = yup.object().shape({
  unitId: yup
    .object()
    .shape({
      value: yup.string().required(Shared_Text.validation.required),
      label: yup.string().required(),
    })
    .required(Shared_Text.validation.required),
  placeAdditionalDescription: yup
    .string()
    .required(Shared_Text.validation.required)
    .trim()
    .max(256, Shared_Text.validation.MAX(256)),
  time: yup.date().required(Shared_Text.validation.required),
  date: yup.date().required(Shared_Text.validation.required),
  placeViewDescription: yup
    .string()
    .required(Shared_Text.validation.required)
    .trim()
    .max(500, Shared_Text.validation.MAX(500)),
  greenCardType: yup
    .object()
    .shape({
      value: yup.string().required(Shared_Text.validation.required),
      label: yup.string().required(),
    })
    .required(Shared_Text.validation.required),
  suggestionDescription: yup
    .string()
    .trim()
    .max(2000, Shared_Text.validation.MAX(2000)),
});
