import * as yup from "yup";
import Texts from "@assets/json/Texts.json";
import { ValidationErrors } from "@validations/ValidationErrors";

export const RegisterGRNFormSchema = yup.object().shape({
  unitId: yup
    .object()
    .shape({
      value: yup.string().required(Texts.validation.required),
      label: yup.string().required(),
    })
    .required(Texts.validation.required),
  placeAdditionalDescription: yup
    .string()
    .required(Texts.validation.required)
    .trim()
    .max(256, ValidationErrors.MAX(256)),
  time: yup.date().required(Texts.validation.required),
  date: yup.date().required(Texts.validation.required),
  placeViewDescription: yup
    .string()
    .required(Texts.validation.required)
    .trim()
    .max(500, ValidationErrors.MAX(500)),
  grnType: yup
    .object()
    .shape({
      value: yup.string().required(Texts.validation.required),
      label: yup.string().required(),
    })
    .required(Texts.validation.required),
  suggestionDescription: yup
    .string()
    .trim()
    .max(2000, ValidationErrors.MAX(2000)),
});
