import { Unit } from "@superapp/shared-types";
import { GreenCardType } from "@type/common";

interface UnitInfo extends Pick<Unit, "id" | "unitId" | "code" | "name"> {}
export interface GreenCardDraftResponseDTO {
  id: number | string;
  name: string;
  unit: UnitInfo | null;
  greenCardType: GreenCardType;
  greenCardTypeTitle: string;
  placeAdditionalDescription: string | null;
  placeViewDescription: string | null;
  suggestionDescription: string | null;
  viewDate: number | undefined;
  createdAt: number;
  updatedAt: number;
  lock?: boolean;
}

export interface GreenCardSentResponseDTO {
  id: number | string;
  greenCardType: string;
  createdAt: number;
  updatedAt: number | null;
  bpmsId: number;
  personelNameFamily: string;
  commiteeTitle: string;
  datEndCheckerGC: string | null;
  datEndDonerGC: string | null;
  greenCardCode: string;
  greenCardSubject: string;
  greenCardTxtCorrectiveAct: string | null;
  greenCardNamOrganization: string | null;
  greenCardDatView: string;
  greenCardStatus: string;
  greenCardScore: number | null;
  createDate: string;
  updateDate: string | null;
  personelCode: string;
  commiteeCode: string;
  commiteSort: number;
}
