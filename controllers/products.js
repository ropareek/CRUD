const express = require("express");

const Product = require("../models/Product");

// const auth = require("../middleware/auth");

const app = express();
app.use(express.json());

// ADD PRODUCT LOGIC
exports.addProduct = (req, res, next) => {
  const { _id, name, description, slug, status, ownerId } = { ...req.body };

  // jwt.verify(req.accesstoken, "secretkey", (err, authData) => {
  //   if (err) {
  //     res.sendStatus(401); //forbidden
  //   } else {
  //     res.json({
  //       message: "Product adding",
  //       authData,
  //     });
  //   }
  // });
  const product = new Product({
    _id,
    name,
    description,
    slug,
    status,
    ownerId,
    createdAt: new Date(),
    updatedAt: null,
  });

  product
    .save()
    .then((result) => {
      console.log(result, "product data saved in db");
      res.status(200).json({ msg: "product data saved in db" });
    })
    .catch((err) => {
      console.log(err);
    });
};

// ----------------------------------------------------
// GET PRODUCT LOGIC
exports.getProduct = async (req, res, next) => {
  const _id = req.params.id;
  console.log(_id);
  const product = await Product.findOne({ _id });
  console.log("product is");
  console.log(product);
  res.json(product);
};

// ----------------------------------------------------
// Update Product Logic
exports.updateProduct = async (req, res, next) => {
  const _id = req.params.id;
  // console.log(`id is${_id}`);
  const isPresent = await Product.find({ _id });
  const { name, description, slug, status, ownerId, updatedAt } = {
    ...req.body,
  };
  console.log(isPresent);
  if (isPresent.length != 0) {
    await Product.updateOne(
      { _id },
      { name, description, slug, status, ownerId, updatedAt: new Date() }
    );
    console.log(`db updated with changes in ${_id}`);
    res.status(200).json({ msg: `data of id:${_id} updated in database` });
  } else {
    console.log(`no document with id:${_id} is present in the collection`);
    res
      .status(504)
      .json({ msg: `no document with id:${_id} is present in the collection` });
  }
};

// ----------------------------------------------------
// Delete Product Logic
exports.deleteProduct = async (req, res, next) => {
  const _id = req.params.id;
  await Product.deleteOne({ _id }).catch((err) => {
    console.log(err);
  });
  res
    .status(200)
    .json({ msg: `document with id: ${_id} deleted from database` });
};
