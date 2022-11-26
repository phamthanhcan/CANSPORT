const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
