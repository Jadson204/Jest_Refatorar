class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  decrementSellIn() {
    if (this.name !== "Sulfuras, Hand of Ragnaros") {
      this.sellIn -= 1;
    }
  }

  decrementQuality() {
    if (this.quality > 0) {
      this.quality -= 1;
    }
  }

  updateQuality() {
    this.decrementSellIn();

    switch (this.name) {
      case "Aged Brie":
        if (this.quality < 50) {
          this.quality += 1;
        }
        break;

      case "Backstage passes to a TAFKAL80ETC concert":
        if (this.sellIn <= 0) {
          this.quality = 0;
        } else if (this.sellIn <= 5) {
          this.quality += 3;
        } else if (this.sellIn <= 10) {
          this.quality += 2;
        } else {
          this.quality += 1;
        }

        this.quality = Math.min(this.quality, 50);

        break;

      case "Conjured Mana Cake":
        if (this.quality > 0) {
          this.quality -= 2;
        }
        break;

      default:
        if (
          this.sellIn <= 0 &&
          this.quality > 0 &&
          this.name !== "Aged Brie" &&
          this.name !== "Backstage passes to a TAFKAL80ETC concert"
        ) {
          this.quality -= 1;
        }
        break;
    }

    this.quality = Math.min(this.quality, 50);
  }
}

class Shop {
  constructor(items = []) {
    this.items = items.map(
      (item) => new Item(item.name, item.sellIn, item.quality)
    );
  }

  updateQuality() {
    for (const item of this.items) {
      item.updateQuality();
    }
  }
}

module.exports = {
  Item,
  Shop,
};
