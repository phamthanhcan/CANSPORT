const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema(
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
        sku: {
          type: ObjectId,
          ref: "skus",
          default: null,
        },
        quantity: Number,
      },
    ],
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const cartModel = mongoose.model("carts", cartSchema);

module.exports = cartModel;
