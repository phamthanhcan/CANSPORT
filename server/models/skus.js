const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const skuSchema = new mongoose.Schema(
  {
    quantity: Number,
    price: Number,
    discount: Number,
    product: {
      type: ObjectId,
      ref: "products",
    },
    color: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const skuModel = mongoose.model("skus", skuSchema);
module.exports = skuModel;
