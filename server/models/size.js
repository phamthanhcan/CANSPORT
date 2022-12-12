const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const sizeSchema = new mongoose.Schema(
  {
    quantity: Number,
    product: {
      type: ObjectId,
      ref: "products",
    },
    size: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const sizeModel = mongoose.model("size", sizeSchema);
module.exports = sizeModel;