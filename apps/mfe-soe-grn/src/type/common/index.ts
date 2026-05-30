import Texts from "@assets/json/Texts.json";

export enum GreenCardType {
  ACC = "ACC",
  SEMACC = "SEMACC",
  MINORACC = "MINORACC",
}

export interface GreenCardTypeOption {
  value: GreenCardType;
  label: string;
}

export const GreenCardTypeOptions: GreenCardTypeOption[] = [
  {
    value: GreenCardType.ACC,
    label: Texts.greenCardForm.greenCardTypeOptions.ACC,
  },
  {
    value: GreenCardType.MINORACC,
    label: Texts.greenCardForm.greenCardTypeOptions.MINORACC,
  },
  {
    value: GreenCardType.SEMACC,
    label: Texts.greenCardForm.greenCardTypeOptions.SEMACC,
  },
];
