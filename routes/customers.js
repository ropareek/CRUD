const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customers");

router.post("/customers/signup", customerController.signUp);
router.post("/customers/signin", customerController.signIn);

module.exports = router;
