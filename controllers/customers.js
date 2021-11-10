const express = require("express");

// const auth = require("../middleware/auth");

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(express.json());

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const Customer = require("../models/Customer");

// ---------------------------------------------------
// Sign Up
exports.signUp = (req, res, next) => {
  // res.write("sign up route");
  //getting user data from request body
  const {
    _id,
    firstName,
    lastName,
    email,
    password,
    products,
    status,
    createdAt,
    updatedAt,
  } = { ...req.body };
  console.log("data fetched from req body");
  // res.status(200).json({ msg: "data fetched from req body" });
  console.log(email);
  //saving customer in the database using the schema
  Customer.find({
    email: email,
  })
    .then((customer) => {
      if (customer.length != 0) {
        console.log("email already exists");
        res.status(400).json({ msg: "Email already exists" });
      } else {
        const date = new Date();
        const newCustomer = new Customer({
          _id,
          firstName,
          lastName: lastName,
          email: email,
          password,
          products: products,
          status: status,
          createdAt: date,
          updatedAt,
        });
        console.log("saved in newCustomer Object");
        // console.log(password);
        // res.json({ msg: "saved in newCustomer Object" });
        bcrypt.hash(newCustomer.password, saltRounds, function (err, hash) {
          if (err) {
            throw err;
          } //storing hash in the db
          else {
            newCustomer.password = hash;
            newCustomer
              .save()
              // CREATING JWT TOKEN
              .then(() => {
                const token = jwt.sign(
                  {
                    firstName,
                    email,
                  },
                  "secretkey",
                  {
                    expiresIn: "2h",
                  }
                );
                newCustomer.token = token;
                newCustomer.save();
              })
              .then((customer) =>
                res.status(200).json({
                  msg: `New customer created with id:- ${newCustomer._id}`,
                  newCustomer,
                })
              )
              .catch((err) => console.log(err));
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("error while finding email id in the db");
    });
};
// ---------------------------------------------------
// SIGN IN
exports.signIn = (req, res, next) => {
  const { email, password } = { ...req.body };

  //finding email in db
  Customer.find({ email }).then((customer) => {
    if (customer.length == 0) {
      res.json({ msg: `Customer with emailid: ${email} does not exist` });
    } else {
      const dbPass = customer[0].password;
      console.log(password, dbPass);
      bcrypt.compare(password, dbPass, function (err, isMatch) {
        if (err) {
          console.log(err);
          throw err;
        }
        if (isMatch) {
          console.log("login hogaya", isMatch);
          // create token
          const token = jwt.sign(
            {
              email,
            },
            "secretkey",
            {
              expiresIn: "2h",
            }
          );
          // Customer.token = token;
          // Customer.save();
          res.json({ msg: "login successfull" });
        } else {
          console.log("login nahi hua", isMatch);
          res.json({ msg: "invalid credentials" });
        }
      });
    }
  });
};
