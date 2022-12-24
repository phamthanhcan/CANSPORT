const productModel = require("../models/products");
const skuModel = require("../models/skus");
const { getPagination } = require("../config/function");
// const orderController = require("./orderController");
const orderModel = require("../models/order");
const sizeModel = require("../models/size");

class Product {
  getAllProduct(req, res) {
    const { page, size, name, price, category, active } = req.query;
    const { limit, offset } = getPagination(page, size);
    let sort = { _id: -1 };
    let query = {};

    if (name && category) {
      query = {
        ...query,
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
        {
          path: "sizes",
        },
      ],
    };

    if (active) {
      query = {
        ...query,
        status: true,
      };
    }

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
      image,
      category,
      description,
      sizes,
      quantity,
      discount,
      status,
      price,
      sold,
      weight,
      length,
      height,
      width,
    } = req.body;
    if (
      !name ||
      !category ||
      !price ||
      !weight ||
      !length ||
      !width ||
      !height
    ) {
      return res.status(400).json({ error: "All filed must be required" });
    } else {
      if (sizes) {
        sizeModel.insertMany(sizes).then((sizesData) => {
          const newProduct = new productModel({
            name,
            image,
            sizes: sizesData.map((size) => ({ _id: size.id })),
            category,
            description,
            quantity,
            discount,
            price,
            sold,
            status,
            weight,
            length,
            width,
            height,
          });

          newProduct
            .save()
            .then((product) => {
              productModel
                .findById(product._id)
                .populate([
                  {
                    path: "category",
                    select: "_id name",
                  },
                  {
                    path: "ratingsReviews.user",
                    select: "_id name userImage",
                  },
                  {
                    path: "sizes",
                  },
                ])
                .then((productData) => {
                  return res.status(201).json({
                    success: true,
                    product: productData,
                    message: "Thêm sản phẩm thành công!",
                  });
                });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({
                success: false,
                message: "Thêm sản phẩm thất bại",
              });
            });
        });
      } else {
        const newProduct = new productModel({
          name,
          image,
          category,
          description,
          quantity,
          discount,
          price,
          sold,
          status,
          weight,
          length,
          width,
          height,
        });

        newProduct.save().then((product) => {
          productModel
            .findById(product._id)
            .populate([
              {
                path: "category",
                select: "_id name",
              },
              {
                path: "ratingsReviews.user",
                select: "_id name userImage",
              },
              {
                path: "sizes",
              },
            ])
            .then((productData) => {
              return res.status(201).json({
                success: true,
                product: productData,
                message: "Thêm sản phẩm thành công",
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({
                success: false,
                message: "Thêm sản phẩm thất bại",
              });
            });
        });
      }
    }
  }

  editProduct(req, res) {
    const id = req.params.productId;
    const updateProduct = req.body;

    if (updateProduct.sizes) {
      productModel.findById(id).then((product) => {});
    }

    // productModel
    //   .findByIdAndUpdate(id, updateProduct)
    //   .populate([
    //     {
    //       path: "category",
    //       select: "_id name",
    //     },
    //     {
    //       path: "ratingsReviews.user",
    //       select: "_id name userImage",
    //     },
    //     {
    //       path: "sizes",
    //     },
    //   ])
    //   .exec()
    //   .then((product) => {
    //     return res.status(200).json({
    //       success: true,
    //       message: "Cập nhật sản phẩm thành công",
    //       product: product,
    //     });
    //   })
    //   .catch((err) => {
    //     return res.json({
    //       success: false,
    //       message: "Cập nhật sản phẩm thất bại",
    //       err: err.message,
    //     });
    //   });
  }

  deleteProduct(req, res) {
    const id = req.params.productId;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Id sản phẩm không hợp lệ!" });
    }
    productModel
      .findByIdAndUpdate(id, { status: false })
      .populate([
        {
          path: "category",
          select: "_id name",
        },
        {
          path: "ratingsReviews.user",
          select: "_id name userImage",
        },
        {
          path: "sizes",
        },
      ])
      .exec()
      .then((product) => {
        res.status(204).json({
          product: product,
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

  async getProductDetail(req, res) {
    let { productId } = req.params;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "ID sản phẩm không hợp lệ",
      });
    } else {
      try {
        let productDetail = await productModel
          .findById(productId)
          .populate("category", "_id name")
          .populate("ratingsReviews.user", "name email userImage")
          .populate("sizes");
        if (productDetail) {
          return res
            .status(200)
            .json({ success: true, product: productDetail });
        }
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: "Không tìm thấy sản phẩm",
        });
      }
    }
  }

  async getProductByCategory(req, res) {
    let { id } = req.params;
    console.log({ id });
    if (!id) {
      return res.status(400);
    } else {
      try {
        let products = await productModel
          .find({ category: id })
          .populate("category", "_id name")
          .populate("ratingsReviews.user", "name email userImage")
          .populate("sizes");
        if (products) {
          console.log({ products });
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

const productsController = new Product();
module.exports = productsController;
