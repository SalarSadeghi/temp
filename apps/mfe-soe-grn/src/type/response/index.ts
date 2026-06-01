import { Unit } from "@superapp/shared-types";
import { GreenCardType } from "@type/common";

interface UnitInfo extends Pick<Unit, "id" | "unitId" | "code" | "name"> {}
export interface GreenCardDraftResponseDTO {
  id: number;
  unit: UnitInfo | null;
  greenCardType: GreenCardType;
  greenCardTypeTitle: string;
  placeAdditionalDescription: string | null;
  placeViewDescription: string | null;
  suggestionDescription: string | null;
  viewDate: number | undefined;
  createdAt: number;
  updatedAt: number;
}
