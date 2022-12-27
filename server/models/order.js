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
    provinceId: {
      type: Number,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    districtId: {
      type: Number,
      required: true,
    },
    ward: {
      type: String,
      required: true,
    },
    wardId: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
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
      enum: ["cod", "online"],
    },
    service: {
      id: Number,
      typeId: Number,
    },
    status: {
      type: String,
      default: "waitting",
      enum: ["waitting", "cancelled", "confirmed"],
    },
  },
  { timestamps: true }
);

orderSchema.plugin(mongoosePaginate);
const orderModel = mongoose.model("orders", orderSchema);
module.exports = orderModel;
