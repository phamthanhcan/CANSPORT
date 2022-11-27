const productModel = require("../models/products");
const skuModel = require("../models/skus");
const { getPagination } = require("../config/function");
const orderModel = require("../models/order");

class Product {
  getAllProduct(req, res) {
    const { page, size, name, price, category } = req.query;
    const { limit, offset } = getPagination(page, size);
    let query = { status: true };
    let sort = { _id: -1 };

    if (name && category) {
      query = {
        name: new RegExp(name, "i"),
        category,
      };
    } else if (name) {
      query = {
        ...query,
        name: new RegExp(name, "i"),
      };
    } else if (category) {
      query = {
        ...query,
        category,
      };
    }

    if (+price) {
      sort = { minPrice: price };
    }

    const options = {
      limit,
      offset,
      sort,
      populate: [
        {
          path: "category",
          select: "_id name",
        },
        {
          path: "ratingsReviews.user",
          select: "_id name userImage",
        },
      ],
    };

    productModel
      .paginate(query, options)
      .then((data) => {
        res.send({
          totalItems: data.totalDocs,
          products: data.docs,
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

  addProduct(req, res) {
    const {
      name,
      images,
      category,
      description,
      skus,
      quantity,
      discount,
      status,
      minPrice,
      maxPrice,
      sold,
      weight,
      length,
      height,
      width,
    } = req.body;

    if (
      !name ||
      !category ||
      !description ||
      !minPrice ||
      !maxPrice ||
      !weight ||
      !length ||
      !width ||
      !height
    ) {
      return res.status(400).json({ error: "All filed must be required" });
    } else {
      const newProduct = new productModel({
        name,
        images,
        category,
        description,
        quantity,
        discount,
        minPrice,
        maxPrice,
        sold,
        status,
        weight,
        length,
        width,
        height,
      });
      return newProduct
        .save()
        .then((product) => {
          if (skus) {
            const skusTemp = skus.map((item) => {
              return {
                ...item,
                product: product._id,
              };
            });

            skuModel.insertMany(skusTemp).then((result) => {
              return res
                .status(201)
                .json({
                  success: true,
                  category: product,
                  result: result,
                  message: "Create product successfully 1",
                })
                .catch((err) => {
                  return res.status(500).json({
                    success: false,
                    error: err.message,
                  });
                });
            });
          } else {
            return res.status(201).json({
              success: true,
              category: product,
              message: "Create product successfully 2",
            });
          }
        })
        .catch((err) => {
          return res.status(500).json({
            success: false,
            error: err.message,
          });
        });
    }
  }

  editProduct(req, res) {
    const id = req.params.productId;
    const updateProduct = req.body;
    productModel
      .findByIdAndUpdate(id, updateProduct)
      .exec()
      .then(() => {
        return res.status(200).json({
          success: true,
          message: "Update product successfully",
          product: updateProduct,
        });
      })
      .catch((err) => {
        return res.json({
          success: false,
          message: "Update product failed",
          err: err.message,
        });
      });
  }

  deleteProduct(req, res) {
    const id = req.params.productId;
    productModel
      .findByIdAndUpdate(id, { status: false })
      .exec()
      .then(() => {
        res.status(204).json({
          success: true,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          err: err.message,
        });
      });
  }

  async getSingleProduct(req, res) {
    let { productId } = req.params;
    if (!productId) {
      return res.status(400);
    } else {
      try {
        let singleProduct = await productModel
          .findById(productId)
          .populate("category", "_id name")
          .populate("ratingsReviews.user", "name email userImage");
        if (singleProduct) {
          return res.json({ product: singleProduct });
        }
      } catch (err) {
        return res.status(500);
      }
    }
  }

  async getProductByCategory(req, res) {
    let { categoryId } = req.body;
    if (!categoryId) {
      return res.status(400);
    } else {
      try {
        let products = await productModel
          .find({ category: categoryId })
          .populate("pCategory", "cName");
        if (products) {
          return res.json({ products: products });
        }
      } catch (err) {
        return res.status(500);
      }
    }
  }

  async getProductByPrice(req, res) {
    let { price } = req.body;
    if (!price) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let products = await productModel
          .find({ pPrice: { $lt: price } })
          .populate("pCategory", "cName")
          .sort({ pPrice: -1 });
        if (products) {
          return res.json({ Products: products });
        }
      } catch (err) {
        return res.json({ error: "Filter product wrong" });
      }
    }
  }

  async postAddReview(req, res) {
    let { userId, productOrderId, productId, orderId, rating, review } =
      req.body;
    if (
      !userId ||
      !rating ||
      !review ||
      !productOrderId ||
      !orderId ||
      !productId
    ) {
      return res.status(400).json({ error: "All filled must be required" });
    } else {
      try {
        let newRatingReview = productModel.findByIdAndUpdate(productId, {
          $push: {
            ratingsReviews: { review: review, user: userId, rating: rating },
          },
        });
        newRatingReview.exec((err, result) => {
          if (err) {
            console.log(err);
          } else {
            orderModel
              .findById(orderId)
              .then((order) => {
                const indexProduct = order.products.findIndex(
                  (item) => String(item._id) === String(productOrderId)
                );
                const query = "products." + indexProduct + ".isReviewed";
                orderModel
                  .findByIdAndUpdate(orderId, {
                    $set: {
                      [query]: true,
                    },
                  })
                  .exec()
                  .then((order) => {
                    return res.json({ success: "Thanks for your review" });
                  });
              })
              .catch((err) => {
                return res.status(400).json({ message: "Order id is invalid" });
              });
          }
        });
      } catch (err) {
        return res.status(500);
      }
    }
  }

  async deleteReview(req, res) {
    let { reviewId, productId } = req.body;
    if (!reviewId) {
      return res.status(400).json({ message: "All filled must be required" });
    } else {
      try {
        let reviewDelete = productModel.findByIdAndUpdate(productId, {
          $pull: { ratingsReviews: { _id: reviewId } },
        });
        reviewDelete.exec((err, result) => {
          if (err) {
            console.log(err);
            return res.status(500);
          }
          return res.json({ success: "Your review is deleted" });
        });
      } catch (err) {
        return res.status(500);
      }
    }
  }
}

const productController = new Product();
module.exports = productController;
