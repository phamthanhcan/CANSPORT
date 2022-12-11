const cartModel = require("../models/carts");
const orderModel = require("../models/order");
const productModel = require("../models/products");
const skuModel = require("../models/skus");
const { getPagination } = require("../config/function");

class Order {
  getAllOrder(req, res) {
    const { page, size, id } = req.query;
    const { limit, offset } = getPagination(page, size);
    let query = {};

    if (id) {
      query = {
        _id: id,
      };
    }

    const options = {
      limit,
      offset,
      sort: { _id: -1 },
      populate: [
        {
          path: "products.product",
          select:
            "name images minPrice maxPrice discount quantity ratingsReviews",
        },
        {
          path: "user",
          select: "_id name email",
        },
      ],
    };

    orderModel
      .paginate(query, options)
      .then((data) => {
        res.send({
          totalItems: data.totalDocs,
          orders: data.docs,
          totalPages: data.totalPages,
          currentPage: data.page - 1,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products.",
        });
      });
  }
  getOrderByUser(req, res) {
    let { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "All filled must be required" });
    } else {
      orderModel
        .find({ user: userId })
        .sort({ _id: -1 })
        .populate("products.sku", "size color price discount quantity")
        .populate(
          "products.product",
          "name images minPrice maxPrice discount quantity ratingsReviews"
        )
        .then((orders) => {
          res.json({ orders: orders });
        })
        .catch((err) => {
          res.status(500);
        });
    }
  }

  // async updateProduct(product)  {
  //   const a = await productModel.findById(product.id);
  //   const b = await productModel.findByIdAndUpdate(product.id, {
  //     $set: {
  //       sold: a.sold + product.quantity,
  //     }
  //   })
  // }

  async createOrder(req, res) {
    const {
      user,
      name,
      phone,
      address,
      ward,
      district,
      province,
      products,
      price,
      shippingFee,
      shippingId,
      typePay,
    } = req.body;
    if (
      !user ||
      !name ||
      !phone ||
      !address ||
      !province ||
      !district ||
      !ward ||
      !products.length ||
      !price ||
      !shippingId ||
      !typePay
    ) {
      return res.status(400).json({ error: "All filed must be required" });
    } else {
      const newOrder = new orderModel({
        user,
        products: products.map((item) => {
          return {
            product: item.product,
            sku: item.sku,
            quantity: item.quantity,
          };
        }),
        price,
        shippingFee,
        shippingId,
        address,
        ward,
        province,
        district,
        phone,
        name,
        typePay,
      });
      return newOrder
        .save()
        .then((order) => {
          cartModel
            .findOneAndUpdate(
              { user: user },
              {
                $pull: {
                  products: {
                    _id: { $in: products.map((item) => item.id) },
                  },
                },
              }
            )
            .exec()
            .then(() => {
              try {
                products.forEach(async (item) => {
                  const product = await productModel.findById(item.product);
                  const result1 = await productModel.findByIdAndUpdate(
                    item.product,
                    {
                      $set: {
                        sold: product.sold + item.quantity,
                        quantity: product.quantity - item.quantity,
                      },
                    }
                  );
                  const sku = await skuModel.findById(item.sku);
                  const result2 = await skuModel.findByIdAndUpdate(item.sku, {
                    $set: {
                      sold: sku.sold + item.quantity,
                      quantity: sku.quantity - item.quantity,
                    },
                  });
                });

                return res.json({
                  order: order,
                  message: "add order successfully",
                });
              } catch (err) {
                return res.status(500);
              }
            })
            .catch((err) => {
              return res.status(500).json({
                success: false,
                error: err.message,
              });
            });
        })
        .catch((err) => {
          return res.status(500).json({
            success: false,
            error: err.message,
          });
        });
    }
  }

  confirmOrder(req, res) {
    const { id } = req.body;
    orderModel
      .findByIdAndUpdate(id, { $set: { status: "Confirmed" } })
      .exec()
      .then((result) => {
        return res.json({ success: "Confirm successfully" });
      })
      .catch((err) => {
        return res.status(500);
      });
  }
}

const orderController = new Order();
module.exports = orderController;
