const express = require("express");
const mongoose = require("mongoose");

const Customer = require("./models/Customer");
const Product = require("./models/Product");

const auth = require("./middleware/auth");

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(express.json());

// ----------------------------------------------------
//connecting DB
mongoose.connect("mongodb://127.0.0.1:27017/shop", () => {
  console.log(`Db connected`);
});
// ----------------------------------------------------
// routes
const customers = require("./routes/customers");
const products = require("./routes/products");

app.use(customers);

app.use(products);

// -----------------------------------------------------
//routes
//  i)signUp
// app.post("/customers/signup");

// //ii)signIn
// app.post("/customers/signin");

// // iii) creating product
// app.post("/products", auth);

// // iv) get products with id
// app.get("/products/:id");

// // v) update products with id
// app.put("/products/:id");

// // vi)deleting a product
// app.delete("/products/:id");

// ------------------------------------------------------
// verify JWT
// function verifyToken(req, res, next) {
//   BearerHeader = req.headers["authorization"];
//   if (typeof BearerHeader !== "undefined") {
//     const BearerToken = BearerHeader.split(" ")[1];
//     req.accesstoken = BearerToken;
//     next();
//   } else {
//     res.sendStatus(403); //forbidden
//   }
// }

// --------------------------------------------------------
//SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT || 5000, (err) => {
  if (err) console.log(err);
  else {
    console.log(`Server started on PORT ${PORT}`);
  }
});
