const mongoose = require("mongoose");

const CustomerSchema = {
  _id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    // required: true,
  },
  lastName: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    unique: true,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  products: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "banned"],
  },
  createdAt: {
    type: Date,
    // required: true,
  },
  updatedAt: {
    type: Date,
    // required: true,
  },
  token: {},
};

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
