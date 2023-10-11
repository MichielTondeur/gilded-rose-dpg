type ItemConstantsType = {
  MAX_QUALITY: number;
  BACKSTAGE_PASS_WAVE_1: number;
  BACKSTAGE_PASS_WAVE_2: number;
  AGED_BRIE: string;
  SULFURUS: string;
  BACKSTAGE_PASSES: string;
  CONJURED: string;
};

export const CONSTANTS = {
  MAX_QUALITY: 50,
  BACKSTAGE_PASS_WAVE_1: 11,
  BACKSTAGE_PASS_WAVE_2: 6,
  AGED_BRIE: "Aged Brie",
  SULFURUS: "Sulfuras, Hand of Ragnaros",
  BACKSTAGE_PASSES: "Backstage passes",
  CONJURED: "Conjured",
} as const satisfies ItemConstantsType;
