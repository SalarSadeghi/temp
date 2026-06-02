export const RQKeys = {
  getNovanUnits: () => ["novanUnits"],
  getGreenCardDrafts: (searchParam?: string) => [
    "greenCardDrafts",
    searchParam,
  ],
  getSentGreenCardByPrcCode: (prcCode?: string) => [
    "sentGreenCardByPrcCode",
    prcCode,
  ],
  getSentGreenCard: (searchParam?: string) => ["sentSuggestion", searchParam],
};
