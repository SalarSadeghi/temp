export const GRNKeys = {
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
