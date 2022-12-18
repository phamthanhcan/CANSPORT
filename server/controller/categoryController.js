const { getPagination } = require("../config/function");
const categoryModel = require("../models/categories");
class Category {
  async getAllCategory(req, res) {
    const { active } = req.query;
    // const { page, size } = req.query;
    // const { limit, offset } = getPagination(page, size);

    // categoryModel.paginate({}, { offset, limit })
    //     .then((data) => {
    //         res.send({
    //             totalItems: data.totalDocs,
    //             categories: data.docs,
    //             totalPages: data.totalPages,
    //             currentPage: data.page - 1,
    //         });
    //     })
    //     .catch((err) => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving categories.",
    //         });
    //     });
    try {
      let categories = null;
      if (active) {
        categories = await categoryModel
          .find({ status: true })
          .sort({ _id: -1 });
      } else {
        categories = await categoryModel.find({}).sort({ _id: -1 });
      }
      if (categories) {
        return res.json({ categories });
      }
    } catch (err) {
      return res.status(500);
    }
  }

  addCategory(req, res) {
    let { name, description, image } = req.body;
    if (!name) {
      return res.status(400).json("All filed must required");
    }
    const category = new categoryModel({
      name: name,
      description: description,
      image: image,
    });
    return category
      .save()
      .then((newCategory) => {
        return res.status(201).json({
          success: true,
          category: newCategory,
          message: "create category successfully",
        });
      })
      .catch((err) => {
        return res.json({
          success: false,
          error: err.message,
        });
      });
  }

  editCategory(req, res) {
    const id = req.params.categoryId;
    const { name, description, image } = req.body;
    categoryModel
      .findByIdAndUpdate(id, {
        name,
        description,
        image,
      })
      .exec()
      .then(() => {
        return res.status(200).json({
          success: true,
          message: "update category successfully",
        });
      })
      .catch((err) => {
        return res.json({
          success: false,
          message: "update category failed",
          err: err.message,
        });
      });
  }

  deleteCategory(req, res) {
    const id = req.params.categoryId;
    categoryModel
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
}

const categoryController = new Category();
module.exports = categoryController;
