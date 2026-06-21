import Texts from "@assets/json/Texts.json";

export enum GRNType {
  ACC = "ACC",
  SEMACC = "SEMACC",
  MINORACC = "MINORACC",
}

export interface GRNTypeOption {
  value: GRNType;
  label: string;
}

export const GRNTypeOptions: GRNTypeOption[] = [
  {
    value: GRNType.ACC,
    label: Texts.features.soe.grn.grnTypeOptions.ACC,
  },
  {
    value: GRNType.MINORACC,
    label: Texts.features.soe.grn.grnTypeOptions.MINORACC,
  },
  {
    value: GRNType.SEMACC,
    label: Texts.features.soe.grn.grnTypeOptions.SEMACC,
  },
];

export interface NavigationState {
  fromPage: string;
  // Add other state properties as needed
}
