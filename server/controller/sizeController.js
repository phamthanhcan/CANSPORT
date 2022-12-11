const sizeModel = require("../models/size");

class Size {
  getSizesProduct(req, res) {
    let { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: "ID sản phẩm không hợp lệ!" });
    } else {
      sizeModel
        .find({ product: productId })
        .then((sizes) => {
          res.json({
            success: true,
            sizes: sizes,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: err?.message,
          });
        });
    }
  }
}

const sizeController = new Size();
module.exports = sizeController;
