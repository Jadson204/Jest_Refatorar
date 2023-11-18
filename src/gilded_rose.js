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
    this.increaseQuality(); //soma-se 1 unidade

    if (this.sellIn < 11) {
      this.increaseQuality(); //soma-se mais 1 unidade
    }

    if (this.sellIn < 6) {
      this.increaseQuality(); //soma-se mais 1 unidade
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

class ConjuredItem extends Item {
  updateItemQuality() {
    this.decreaseQuality();

    if (this.sellIn < 0) {
      //diminui-se o dobro quando vence
      this.decreaseQuality();
      this.decreaseQuality();
    }

    this.updateSellIn();
    this.updateExpiredItem();
  }

  decreaseQuality() {
    //diminui-se o dobro quando passam-se os dias
    if (this.quality > 0) {
      this.quality -= 2;
    }
  }
}

// De acordo com o nome do item, tal item se comporta conforme sua classe, que é herdada da classe pai
class Shop {
  constructor(items = []) {
    this.items = items.map((item) => {
      switch (item.name) {
        case "Aged Brie":
          return new AgedBrieItem(item.name, item.sellIn, item.quality);
        case "Backstage passes to a TAFKAL80ETC concert":
          return new BackstagePassItem(item.name, item.sellIn, item.quality);
        case "Sulfuras, Hand of Ragnaros":
          return new SulfurasItem(item.name, item.sellIn, item.quality);
        case "Conjured":
          return new ConjuredItem(item.name, item.sellIn, item.quality);
        default:
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
