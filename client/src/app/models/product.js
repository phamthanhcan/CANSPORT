import { isEmpty } from "../shared/helper/data";

export class Product {
  constructor(data = {}) {
    this.id = data._id || "";
    this.name = data.name || "";
    this.description = data.description || "";
    this.minPrice = data.minPrice || 0;
    this.maxPrice = data.maxPrice || 0;
    this.discount = data.discount || 0;
    this.sold = data.sold || 0;
    this.quantity = data.quantity || 0;
    this.weight = data.weight || 0;
    this.length = data.length || 0;
    this.width = data.width || 0;
    this.height = data.height || 0;
    this.skus = isEmpty(data.skus)
      ? []
      : data.skus.map((sku) => {
          return new Sku(sku);
        });
    this.category = new CategorySumary(data.category);
    this.ratingsReviews = isEmpty(data.ratingsReviews)
      ? []
      : data.ratingsReviews.map((item) => {
          return new RatingReview(item);
        });
    this.images = isEmpty(data.images) ? [] : data.images;
    this.status = data.status || false;
  }
}

export class CategorySumary {
  constructor(data = {}) {
    this.id = data._id || "";
    this.name = data.name || "";
  }
}

export class RatingReview {
  constructor(data = {}) {
    this.id = data._id || "";
    this.review = data.review || "";
    this.user = data.user || "";
    this.rating = data.rating || "";
  }
}

export class Sku {
  constructor(data = {}) {
    this.id = data._id || "";
    this.quantity = data.quantity || 0;
    this.price = data.price || 0;
    this.discount = data.discount || 0;
    this.color = data.color || "";
    this.size = data.size || "";
    this.image = data.image || "";
  }
}
