const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const categoryRoute = require("./categoriesRoute");
const productRoute = require("./productRoute");
const skuRoute = require("./skuRoute");
const cartRoutes = require("./cartRoute");
const orderRoute = require("./orderRoute");
const firebase = require("../config/firebase");
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

  app.post("/uploadiu", upload, (req, res) => {
    if (!req.file) {
      return res.status(400).send("Error: No files found");
    }

    const image = firebase.bucket.file(req.file.originalname);

    const imageWriter = image.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    imageWriter.on("error", (err) => {
      console.log(req.file);
    });

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
