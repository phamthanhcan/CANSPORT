const cartModel = require('../models/carts');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

class Cart {

  getCardByUser(req, res) {
    let { userId }  = req.query;
    if (!userId) {
      return res.status(400).json({ message: "All filled must be required" });
    } else {
      cartModel.findOne({ user: userId })
        .populate("products.sku", "size color price discount quantity")
        .populate("products.product", "name images minPrice maxPrice discount quantity length height weight width")
        .then(cart => {
          res.json({ cart: cart })
        })
        .catch(err => {
          res.status(500);
        })
    }
  }

  addProductCart(req, res) {
    let { productId, skuId, quantity, userId } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ message: "All filled must be required" });
    } else {
      cartModel.find({ user: userId })
        .then(cart => {
          if (cart.length) {
            const indexProduct = cart[0].products.findIndex((item, index) => String(item.product) === String(productId) && String(item.sku) === String(skuId));

            if (indexProduct >= 0) {
              const query = 'products.' + indexProduct + '.quantity';
              cartModel.findByIdAndUpdate(cart[0]._id, {
                $set: {
                  [query]: quantity + cart[0].products[indexProduct].quantity
                }
              })
                .exec()
                .then((cart) => {
                  return res.status(200).json({
                    success: true,
                    message: "update cart 1 successfully",
                    cart: cart
                  })
                })
                .catch(err => {
                  return res.status(500).json({
                    success: false,
                    message: "update product failed",
                    err: err.message
                  })
                })
            } else {
              cartModel.findByIdAndUpdate(cart[0]._id, {
                $push: {
                  products: {
                    product: productId,
                    sku: skuId,
                    quantity: quantity
                  }
                }
              })
                .exec()
                .then(() => {
                  return res.status(200).json({
                    success: true,
                    message: "update cart 2 successfully",
                    cart: cart
                  })
                })
                .catch(err => {
                  return res.status(500).json({
                    success: false,
                    message: "update product failed",
                    err: err.message
                  })
                })
            }
          } else {
            const newCart = new cartModel({
              user: userId,
              products: [{
                product: productId,
                sku: skuId,
                quantity: quantity
              }]
            })
            return newCart.save()
              .then(item => {
                return res.status(201).json(
                  {
                    success: true,
                    cart: item,
                    message: "create category successfully"
                  }
                )
              })
              .catch(err => {
                return res.status(500).json({
                  success: false,
                  error: err.message
                })
              })
          }
        })
        .catch(err => {
          res.status(500);
        })
    }
  }

  async deleteItemCart(req, res) {
    let { productCartId, cartId } = req.body;
    if (!productCartId || !cartId) {
      return res.status(400).json({ message: "All filled must be required" });
    } else {
      cartModel.findByIdAndUpdate(cartId, {
        $pull: { products: { _id: productCartId } },
      })
        .exec()
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "update cart successfully"
          })
        })
        .catch(err => {
          return res.status(500).json({
            success: false,
            message: "update product failed",
          })
        })
    }
  }
}

const cartController = new Cart();
module.exports = cartController;
