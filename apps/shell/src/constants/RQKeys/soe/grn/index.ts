export const GRNKeys = {
  getUnits: () => ["units"],
  getGRNDrafts: (searchParam?: string) => ["grnDrafts", searchParam],
  getSentGRNByPrcCode: (prcCode?: string) => ["sentGRNByPrcCode", prcCode],
  getSentGRN: (searchParam?: string) => ["sentSuggestion", searchParam],
};
