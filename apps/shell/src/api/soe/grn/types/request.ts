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
    label: Texts.features.soe.grn.greenCardTypeOptions.ACC,
  },
  {
    value: GreenCardType.MINORACC,
    label: Texts.features.soe.grn.greenCardTypeOptions.MINORACC,
  },
  {
    value: GreenCardType.SEMACC,
    label: Texts.features.soe.grn.greenCardTypeOptions.SEMACC,
  },
];

export interface NavigationState {
  fromPage: string;
  // Add other state properties as needed
}
