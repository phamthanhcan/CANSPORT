const skuModel = require("../models/skus");

class Sku {
  getSkuProduct(req, res) {
    let { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: "All filled must be required" });
    } else {
      skuModel
        .find({ product: productId })
        .then((skus) => {
          res.json({
            skus: skus,
          });
        })
        .catch((err) => {
          res.status(500);
        });
    }
  }
}

const skuController = new Sku();
module.exports = skuController;
