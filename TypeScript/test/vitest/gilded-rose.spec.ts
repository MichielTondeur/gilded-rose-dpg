import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  const commonTestCases: [Item, number, number][] = [
    [new Item("Common Item", 2, 3), 1, 2],
    [new Item("Common Item", 2, 0), 1, 0],
    [new Item("Common Item", 0, 3), -1, 1],
    [new Item("Common Item", 0, 1), -1, 0],
    [new Item("Common Item", 0, 0), -1, 0],
    [new Item("Common Item", -1, 3), -2, 1],
    [new Item("Common Item", -1, 0), -2, 0],
  ];

  // Aged Brie
  // Quality gets better when getting older, so plus 1
  // Quality gets even better when expired, so plus 1
  // Quality can't get better than 50
  const brieTestCases: [Item, number, number][] = [
    [new Item("Aged Brie", 2, 3), 1, 4],
    [new Item("Aged Brie", 2, 50), 1, 50],
    [new Item("Aged Brie", 0, 3), -1, 5],
    [new Item("Aged Brie", 0, 50), -1, 50],
    [new Item("Aged Brie", -1, 3), -2, 5],
    [new Item("Aged Brie", -1, 50), -2, 50],
  ];

  // Sulfurus
  // SellIn never gets higher or lower
  // Quality never gets better or worse
  const sulfurusTestCases: [Item, number, number][] = [
    [new Item("Sulfuras, Hand of Ragnaros", 2, 80), 2, 80],
    [new Item("Sulfuras, Hand of Ragnaros", 0, 80), 0, 80],
  ];

  // Backstage Passes
  // Quality gets better when getting older, so plus 1
  // When sellIn lower than 10, quality increases by 2
  // When sellIn lower than 5, quality increases by 3
  // When sellIn goes negative, quality is set to 0
  const backStagePassesTestCases: [Item, number, number][] = [
    [new Item("Backstage passes to a TAFKAL80ETC concert", 20, 50), 19, 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 20, 5), 19, 6],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 11, 5), 10, 6],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 5), 9, 7],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 5), 5, 7],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5), 4, 8],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 5), 0, 8],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5), -1, 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -1, 5), -2, 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 20, 50), 19, 50],
    [new Item("Backstage passes for HAXX", 20, 5), 19, 6],
    [new Item("Backstage passes for HAXX", 11, 5), 10, 6],
    [new Item("Backstage passes for HAXX", 10, 5), 9, 7],
    [new Item("Backstage passes for HAXX", 6, 5), 5, 7],
    [new Item("Backstage passes for HAXX", 5, 5), 4, 8],
    [new Item("Backstage passes for HAXX", 1, 5), 0, 8],
    [new Item("Backstage passes for HAXX", 0, 5), -1, 0],
    [new Item("Backstage passes for HAXX", -1, 5), -2, 0],
  ];

  // Smelly Items
  // Quality gets worse when getting older, so minus 2
  // Quality gets even worse when expired, so minus 4
  // Quality can't get worse than 0
  const conjuredTestCases: [Item, number, number][] = [
    [new Item("Conjured Mana Cake", 2, 3), 1, 1],
    [new Item("Conjured Mana Cake", 2, 0), 1, 0],
    [new Item("Conjured Mana Cake", 0, 4), -1, 0],
    [new Item("Conjured Mana Cake", 0, 3), -1, 0],
    [new Item("Conjured Mana Cake", 0, 1), -1, 0],
    [new Item("Conjured Mana Cake", 0, 0), -1, 0],
    [new Item("Conjured Mana Cake", -1, 9), -2, 5],
    [new Item("Conjured Mana Cake", -1, 3), -2, 0],
    [new Item("Conjured Mana Cake", -1, 0), -2, 0],
  ];

  const testCases = [
    ...commonTestCases,
    ...brieTestCases,
    ...sulfurusTestCases,
    ...backStagePassesTestCases,
    ...conjuredTestCases,
  ];

  const testItems = testCases.map((testCase) => testCase[0]);
  const testSellInCorrect = testCases.map((testCase) => testCase[1]);
  const testQualityCorrect = testCases.map((testCase) => testCase[2]);

  describe("updateQuality", () => {
    describe("WHEN calling updateQuality", () => {
      const app: GildedRose = new GildedRose(testItems);

      app.updateQuality();

      let updatedItems: [string, number, number, number, number][] = [];

      for (let i = 0; i < app.items.length; i++) {
        updatedItems.push([
          app.items[i].name,
          app.items[i].sellIn,
          app.items[i].quality,
          testSellInCorrect[i],
          testQualityCorrect[i],
        ]);
      }

      test.each(updatedItems)(
        "%s: THEN %d AND %d should match %d and %d",
        (_name, sellInResult, qualityResult, sellInCorrect, qualityCorrect) => {
          expect(sellInResult).toEqual(sellInCorrect);
          expect(qualityResult).toEqual(qualityCorrect);
        }
      );
    });
  });
});
