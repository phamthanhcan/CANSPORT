const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const categoryRoute = require("./categoriesRoute");
const productRoute = require("./productRoute");
const skuRoute = require("./skuRoute");
const cartRoutes = require("./cartRoute");
const orderRoute = require("./orderRoute");
const sizeRoute = require("./sizeRoute");
const firebase = require("../config/firebase");
const { loginCheck } = require("../middleware/auth");
const orderModel = require("../models/order");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
}).single("file");

const uploads = multer({
  storage: multer.memoryStorage(),
}).any();

function route(app) {
  app.use("/auth", authRoute);
  app.use("/user", userRoute);
  app.use("/categories", categoryRoute);
  app.use("/product", productRoute);
  app.use("/sku", skuRoute);
  app.use("/cart", cartRoutes);
  app.use("/order", orderRoute);
  app.use("/size", sizeRoute);
  app.post("/revenue", loginCheck, (req, res) => {
    const { option, data } = req.body;
    switch (option) {
      case 0:
        orderModel
          .aggregate([
            {
              $match: {
                status: "confirmed",
                createdAt: {
                  $gte: new Date(`${data.year}-01-01`),
                  $lt: new Date(`${data.year + 1}-01-01`),
                },
              },
            },
            {
              $unwind: {
                path: "$products",
              },
            },
            {
              $group: {
                // Group by both month and year of the sale
                _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                // Count the no of sales
                price: {
                  $sum: "$price",
                },
                quantity: {
                  $sum: "$products.quantity",
                },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ])
          .then((result) => {
            return res.status(200).json({ result });
          })
          .catch((error) => {
            return res.status(500);
          });
        break;
      case 1: {
        const year = data.month === 12 ? data.year + 1 : data.year;
        const month = data.month === 12 ? "01" : data.month + 1;
        orderModel
          .aggregate([
            {
              $match: {
                status: "confirmed",
                createdAt: {
                  $gte: new Date(`${data.year}-${data.month}-01`),
                  $lt: new Date(`${year}-${month}-01`),
                },
              },
            },
            {
              $unwind: {
                path: "$products",
              },
            },
            {
              $group: {
                // Group by both month and year of the sale
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                // Count the no of sales
                price: {
                  $sum: "$price",
                },
                quantity: {
                  $sum: "$products.quantity",
                },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ])
          .then((result) => {
            console.log("result", result);
            return res.status(200).json({ result });
          })
          .catch((error) => {
            return res.status(500);
          });
        break;
      }
      default:
        break;
    }
  });

  app.post("/uploadiu", upload, (req, res) => {
    if (!req.file) {
      return res.status(400).send("Error: No files found");
    }

    const image = firebase.bucket.file(req.file.originalname);
    console.log({ image });

    const imageWriter = image.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    imageWriter.on("error", (err) => {});

    imageWriter.on("finish", () => {
      // Assembling public URL for accessing the file via HTTP
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        firebase.bucket.name
      }/o/${encodeURI(image.name)}?alt=media`;

      // Return the file name and its public URL
      res
        .status(200)
        .json({ fileName: req.file.originalname, fileLocation: publicUrl });
    });

    // When there is no more data to be consumed from the stream
    imageWriter.end(req.file.buffer);
  });

  // This is a sample test API key.
  const stripe = require("stripe")(
    "sk_test_51JN6JuAe7sFLRsUwtxjhu3xusD0h6B1KOSXj3PlS6wL8rUz8ag3WK01IHGiZ1KqgfWGGgOuhmhlXLQkKcKGiY5Qv00rODfbW4J"
  );

  const calculateOrderAmount = (items) => {
    return (
      items.reduce((sum, productCart) => {
        const price = isEmpty(productCart.sku)
          ? productCart.product.minPrice
          : productCart.sku.price;
        const quantity = productCart.quantity;
        return sum + quantity * (price || 0);
      }, 0) || 0
    );
  };

  app.post("/create-payment-intent", async (req, res) => {
    const { totalPrice } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: "vnd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
}

module.exports = route;
