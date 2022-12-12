const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "users",
    },
    products: [
      {
        product: {
          type: ObjectId,
          ref: "products",
        },
        size: {
          type: ObjectId,
          ref: "size",
          default: null,
        },
        quantity: Number,
        isReviewed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    shippingId: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    typePay: {
      type: String,
      default: "cod",
      enum: ["cod", "online-payment"],
    },
    status: {
      type: String,
      default: "Not comfirmed",
      enum: ["Not comfirmed", "Confirmed"],
    },
  },
  { timestamps: true }
);

orderSchema.plugin(mongoosePaginate);
const orderModel = mongoose.model("orders", orderSchema);
module.exports = orderModel;
