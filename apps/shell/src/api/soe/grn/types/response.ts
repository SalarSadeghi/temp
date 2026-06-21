import { Unit } from "@type/common";
import { GRNType } from "./request";

interface UnitInfo extends Pick<Unit, "id" | "unitId" | "code" | "name"> {}
export interface GRNDraftResponseDTO {
  id: number | string;
  name: string;
  unit: UnitInfo | null;
  grnType: GRNType;
  grnTypeTitle: string;
  placeAdditionalDescription: string | null;
  placeViewDescription: string | null;
  suggestionDescription: string | null;
  viewDate: number | undefined;
  createdAt: number;
  updatedAt: number;
  lock?: boolean;
}

export interface GRNSentResponseDTO {
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
