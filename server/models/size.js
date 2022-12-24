const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema(
  {
    quantity: Number,
    size: {
      type: String,
      default: null,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const sizeModel = mongoose.model("size", sizeSchema);
module.exports = sizeModel;
