const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const productController = require("../controllers/products");

router.post("/products", auth, productController.addProduct);
router.get("/products/:id", productController.getProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
