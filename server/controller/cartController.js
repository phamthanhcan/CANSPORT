const cartModel = require("../models/carts");
const mongoose = require("mongoose");
const categoryController = require("./categoryController");
const { ObjectId } = mongoose.Schema.Types;

class Cart {
  getCardByUser(req, res) {
    let { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "All filled must be required" });
    } else {
      cartModel
        .findOne({ user: userId })
        .populate("products.size")
        .populate(
          "products.product",
          "name images price discount quantity length height weight width"
        )
        .then((cart) => {
          res.json({ cart: cart });
        })
        .catch((err) => {
          res.status(500);
        });
    }
  }

  addProductCart(req, res) {
    let { productId, sizeId, quantity, userId } = req.body;
    if (!productId || !quantity || !userId) {
      return res.status(400).json({ message: "All filled must be required" });
    } else {
      cartModel
        .findOne({ user: userId })
        .then((cart) => {
          if (cart) {
            const indexProduct = cart.products.findIndex((item) => {
              return (
                String(item.product) === String(productId) &&
                String(item.size) === String(sizeId)
              );
            });
            if (indexProduct >= 0) {
              const query = `products.${indexProduct}.quantity`;
              cartModel
                .findByIdAndUpdate(
                  cart._id,
                  {
                    $set: {
                      [query]: quantity + cart.products[indexProduct].quantity,
                    },
                  },
                  { new: true }
                )
                .populate({
                  path: "products",
                  populate: [{ path: "product" }, { path: "size" }],
                })
                .exec()
                .then((cart) => {
                  return res.status(200).json({
                    success: true,
                    message: "Update cart susscessfully",
                    cart: cart,
                  });
                })
                .catch((err) => {
                  return res.status(500).json({
                    success: false,
                    message: "Update cart fail",
                    error: err.message,
                  });
                });
            } else {
              cartModel
                .findByIdAndUpdate(
                  cart._id,
                  {
                    $push: {
                      products: {
                        product: productId,
                        size: sizeId,
                        quantity: quantity,
                      },
                    },
                  },
                  { new: true }
                )
                .populate({
                  path: "products",
                  populate: [{ path: "product" }, { path: "size" }],
                })
                .exec()
                .then((cart) => {
                  return res.status(200).json({
                    success: true,
                    message: "Update cart susscessfully",
                    cart: cart,
                  });
                })
                .catch((err) => {
                  return res.status(500).json({
                    success: false,
                    message: "Update cart fail",
                    error: err.message,
                  });
                });
            }
          } else {
            const newCart = new cartModel({
              user: userId,
              products: [
                {
                  product: productId,
                  size: sizeId,
                  quantity: quantity,
                },
              ],
            });
            return newCart
              .save()
              .then((item) => {
                return res.status(201).json({
                  success: true,
                  cart: item,
                  message: "create category successfully",
                });
              })
              .catch((err) => {
                return res.status(500).json({
                  success: false,
                  error: err.message,
                });
              });
          }
        })
        .catch((err) => {
          res.status(500);
        });
    }
  }

  async deleteItemCart(req, res) {
    let { productCartId, cartId, sizeId } = req.body;
    if (!productCartId || !cartId) {
      return res.status(400).json({ message: "All filled must be required" });
    } else {
      cartModel
        .findByIdAndUpdate(cartId, {
          $pull: { products: { product: productCartId, size: sizeId } },
        })
        .exec()
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "update cart successfully",
          });
        })
        .catch((err) => {
          return res.status(500).json({
            success: false,
            message: "update product failed",
          });
        });
    }
  }

  deleteCart(req, res) {
    const id = req.params.cartId;
    const { userId } = req.body;
    cartModel
      .find({ id: id, user: userId })
      .deleteOne()
      .exec()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}

const cartController = new Cart();
module.exports = cartController;
