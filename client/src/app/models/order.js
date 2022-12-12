import { isEmpty } from "../shared/helper/data";
import { ProductCart } from "./cart";
import { User } from "./user";

export const TYPE_PAY = {
  COD: "cod",
  ONLINE_PAYMENT: "online-payment",
};

export const STATUS_ORDER = {
  NOT_CONFIRMED: "Not comfirmed",
  CONFIRMED: "Confirmed",
};

export class Order {
  constructor(data) {
    this.id = data._id;
    this.products = isEmpty(data.products)
      ? []
      : data.products.map((item) => {
          return new ProductCart(item);
        });
    this.user = isEmpty(data.user) ? null : new User(data.user);
    this.name = data.name;
    this.address = data.address;
    this.province = data.province;
    this.district = data.district;
    this.ward = data.ward;
    this.phone = data.phone;
    this.price = data.price;
    this.shippingId = data.shippingId;
    this.shippingFee = data.shippingFee;
    this.typePay = data.typePay;
    this.status = data.status;
    this.orderDate = data.createdAt;
  }
}
