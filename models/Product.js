const mongoose = require("mongoose");

const productSchema = {
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  ownerId: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    // required: true,
  },
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
