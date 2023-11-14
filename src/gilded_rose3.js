class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateItemQuality() {
    this.decreaseQuality();
    this.updateSellIn();
    this.updateExpiredItem();
  }

  updateExpiredItem() {
    if (this.sellIn < 0) {
      this.decreaseQuality();
    }
  }

  updateSellIn() {
    this.sellIn -= 1;
  }

  increaseQuality() {
    if (this.quality < 50) {
      this.quality += 1;
    }
  }

  decreaseQuality() {
    if (this.quality > 0) {
      this.quality -= 1;
    }
  }
}

class AgedBrieItem extends Item {
  updateItemQuality() {
    this.increaseQuality();
    this.updateSellIn();
    this.updateExpiredItem();
  }

  updateExpiredItem() {
    if (this.sellIn < 0) {
      this.increaseQuality();
    }
  }
}

class BackstagePassItem extends Item {
  updateItemQuality() {
    this.increaseQuality();

    if (this.sellIn < 11) {
      this.increaseQuality();
    }

    if (this.sellIn < 6) {
      this.increaseQuality();
    }

    this.updateSellIn();
    this.updateExpiredItem();
  }

  updateExpiredItem() {
    if (this.sellIn < 0) {
      this.quality = 0;
    }
  }
}

class SulfurasItem extends Item {
  updateItemQuality() {
    // Sulfuras vazio porque não se altera
  }
  updateExpiredItem() {
    // Sulfuras vazio porque não se altera
  }
}

class Shop {
  constructor(items = []) {
    this.items = items.map((item) => {
      if (item.name === "Aged Brie") {
        return new AgedBrieItem(item.name, item.sellIn, item.quality);
      } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        return new BackstagePassItem(item.name, item.sellIn, item.quality);
      } else if (item.name === "Sulfuras, Hand of Ragnaros") {
        return new SulfurasItem(item.name, item.sellIn, item.quality);
      } else {
        return new Item(item.name, item.sellIn, item.quality);
      }
    });
  }

  updateQuality() {
    for (let item of this.items) {
      item.updateItemQuality();
    }

    return this.items;
  }
}

module.exports = {
  Item,
  AgedBrieItem,
  BackstagePassItem,
  SulfurasItem,
  Shop,
};
