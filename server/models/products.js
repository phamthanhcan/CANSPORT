const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    category: {
      type: ObjectId,
      ref: "categories",
    },
    images: {
      type: Array,
      default: null,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    length: {
      type: Number,
    },
    width: {
      type: Number,
    },
    ratingsReviews: [
      {
        review: String,
        user: { type: ObjectId, ref: "users" },
        rating: Number,
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
