import { CONSTANTS as ITEM_CONSTANTS } from "./CONSTANTS";

const {
  MAX_QUALITY,
  BACKSTAGE_PASS_WAVE_1,
  BACKSTAGE_PASS_WAVE_2,
  AGED_BRIE,
  SULFURUS,
  CONJURED,
  BACKSTAGE_PASSES,
} = ITEM_CONSTANTS;

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private updateBrie(item: Item) {
    if (item.quality < MAX_QUALITY) item.quality = item.quality + 1;

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0 && item.quality < MAX_QUALITY)
      item.quality = item.quality + 1;
  }

  private updateBackstagePass(item: Item) {
    if (item.quality < MAX_QUALITY) {
      item.quality = item.quality + 1;

      if (item.sellIn < BACKSTAGE_PASS_WAVE_1 && item.quality < MAX_QUALITY)
        item.quality = item.quality + 1;

      if (item.sellIn < BACKSTAGE_PASS_WAVE_2 && item.quality < MAX_QUALITY)
        item.quality = item.quality + 1;
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) item.quality = 0;
  }

  private updateConjuredItems(item: Item) {
    if (item.quality > 1) item.quality = item.quality - 2;
    else if (item.quality > 0) item.quality = item.quality - 1;

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      if (item.quality > 1) item.quality = item.quality - 2;
      else if (item.quality > 0) item.quality = item.quality - 1;
    }
  }

  private updateCommon(item: Item) {
    if (item.quality > 0) item.quality = item.quality - 1;

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0 && item.quality > 0) item.quality = item.quality - 1;
  }

  private isAgedBrie(name: string) {
    return name === AGED_BRIE;
  }

  private isSulfurus(name: string) {
    return name === SULFURUS;
  }

  private isBackstagePass(name: string) {
    // Match all items beginning with 'Backstage passes'
    const backStagePassesRegex = new RegExp(`^${BACKSTAGE_PASSES}.*$`);

    return backStagePassesRegex.test(name);
  }

  private isConjuredItem(name: string) {
    const conjuredRegex = new RegExp(`^${CONJURED}.*$`);

    return conjuredRegex.test(name);
  }

  public updateQuality() {
    for (const item of this.items) {
      const { name } = item;

      switch (true) {
        case this.isAgedBrie(name):
          this.updateBrie(item);
          break;
        case this.isBackstagePass(name):
          this.updateBackstagePass(item);
          break;
        case this.isConjuredItem(name):
          this.updateConjuredItems(item);
          break;
        case this.isSulfurus(name):
          break;
        default:
          this.updateCommon(item);
          break;
      }
    }

    return this.items;
  }
}
