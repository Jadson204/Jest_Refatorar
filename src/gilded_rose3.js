class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateQuality() {
    // Atualiza a quantidade de dias que temos para vender o item
    this.sellIn -= 1;

    //Diminue em 1 a qualidade quando o produto estiver prazo, e em diminue 2 quando passar do prazo
    this.quality = Math.max(0, this.quality - (this.sellIn < 0 ? 2 : 1));
  }
}

class AgedBrieItem extends Item {
  updateQuality() {
    super.updateQuality();
    this.quality = Math.min(50, this.quality + 1); // Garante que a qualidade não ultrapasse 50
  }
}

class BackstagePassItem extends Item {
  // Sobrescreve o método updateQuality para ajustar o comportamento específico de "Backstage Pass"
  updateQuality() {
    super.updateQuality(); // Chama a implementação da classe base

    switch (true) {
      case this.sellIn <= 0:
        this.quality = 0; // Zera a qualidade se o prazo de venda expirou
        break;
      case this.sellIn <= 5:
        this.quality += 3; // Aumenta a qualidade em 3 se faltam 5 dias ou menos para o concerto
        break;
      case this.sellIn <= 10:
        this.quality += 2; // Aumenta a qualidade em 2 se faltam 10 dias ou menos para o concerto
        break;
      default:
        this.quality += 1; // Aumenta a qualidade em 1 nos demais casos
        break;
    }

    this.quality = Math.min(50, this.quality);
  }
}

class SulfurasItem extends Item {
  // Sulfuras não precisa de lógica de atualização de qualidade, mantendo o método vazio
  updateQuality() {}
}

class Shop {
  constructor(items = []) {
    // Mapeia os itens para suas respectivas classes com base no nome
    this.items = items.map((item) => {
      switch (item.name) {
        case "Aged Brie":
          return new AgedBrieItem(item.name, item.sellIn, item.quality);
        case "Backstage passes to a TAFKAL80ETC concert":
          return new BackstagePassItem(item.name, item.sellIn, item.quality);
        case "Sulfuras, Hand of Ragnaros":
          return new SulfurasItem(item.name, item.sellIn, item.quality);
        default:
          return new Item(item.name, item.sellIn, item.quality);
      }
    });
  }

  // Atualiza a qualidade de todos os itens na loja
  updateQuality() {
    this.items.forEach((item) => item.updateQuality());
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
  AgedBrieItem,
  BackstagePassItem,
  SulfurasItem,
};
