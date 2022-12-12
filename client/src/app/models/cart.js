import { isEmpty } from "../shared/helper/data";
import { Product, Size } from "./product";

export class Cart {
  constructor(data) {
    this.id = data._id || "";
    this.user = data.user || "";
    this.products = isEmpty(data.products)
      ? []
      : data.products.map((item) => {
          return new ProductCart(item);
        });
  }
}

export class ProductCart {
  constructor(data) {
    this.id = data._id || "";
    this.product = isEmpty(data.product) ? null : new Product(data.product);
    this.size = isEmpty(data.size) ? null : new Size(data.size);
    this.quantity = data.quantity || 0;
    this.isReviewed = data.isReviewed || false;
  }
}
