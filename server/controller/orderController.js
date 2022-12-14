const cartModel = require("../models/carts");
const orderModel = require("../models/order");
const productModel = require("../models/products");
const skuModel = require("../models/skus");
const { getPagination } = require("../config/function");
const sizeModel = require("../models/size");

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
          select: "name image price discount quantity ratingsReviews",
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
        return res.status(200).json({
          totalItems: data.totalDocs,
          orders: data.docs,
          totalPages: data.totalPages,
          currentPage: data.page - 1,
        });
      })
      .catch((err) => {
        return res.status(500).json({
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
        .populate("products.size")
        .populate(
          "products.product",
          "name image price discount quantity ratingsReviews"
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
      wardId,
      districtId,
      provinceId,
      height,
      weight,
      length,
      width,
      products,
      price,
      shippingFee,
      shippingId,
      service,
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
      !service ||
      !typePay ||
      !wardId ||
      !districtId ||
      !provinceId ||
      !height ||
      !weight ||
      !length ||
      !width
    ) {
      return res.status(400).json({ error: "All filed must be required" });
    } else {
      const newOrder = new orderModel({
        user,
        products: products.map((item) => {
          return {
            product: item.product,
            size: item.size,
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
        service,
        typePay,
        wardId,
        districtId,
        provinceId,
        height,
        weight,
        length,
        width,
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
                  if (item.size) {
                    const size = await sizeModel.findById(item.size);
                    const result2 = await sizeModel
                      .findByIdAndUpdate(item.size, {
                        $set: {
                          sold: size.sold + item.quantity,
                          quantity: size.quantity - item.quantity,
                        },
                      })
                      .then((result) => console.log("size", result));
                  }
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

  updateOrder(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    orderModel
      .findByIdAndUpdate(id, { status: status })
      .exec()
      .then((order) => {
        return res.status(200).json({
          success: true,
          order,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "???? c?? l???i khi c???p nh???t ????n h??ng",
        });
      });
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

  getRenevue(req, res) {
    orderModel
      .find({ status: "confirmed" })
      .then((orders) => {
        const totalRevenue = orders.reduce((sum, item) => {
          return sum + (+item.price + +item.shippingFee);
        }, 0);
        return res.status(200).json({
          success: true,
          totalRevenue: totalRevenue,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "C?? l???i khi l???y doanh thu",
        });
      });
  }
}

const orderController = new Order();
module.exports = orderController;
