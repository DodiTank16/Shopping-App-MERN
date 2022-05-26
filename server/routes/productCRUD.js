const express = require("express");
const router = express.Router();
// const uploadOptions = require("../helper/imageUpload");
const myMulter = require("../helper/imageUpload");

const {
	getProducts,
	getSpecficProducts,
	createProduct,
	createProductPostman,
	updateProduct,
	deleteProduct,
} = require("../contorller/product");

router.get("/", getProducts);
router.get("/:id", getSpecficProducts);
// router.post("/", createProduct);
router.post("/", myMulter.uploadOptions.single("image"), createProduct);
router.post("/postman", createProductPostman);
router.put("/:type", updateProduct);
router.delete("/:type", deleteProduct);

// router.route('/').get(getProducts).post(createProduct)
// router.route('/postman').post(createProductPostman)
// router.route('/:id').put(updateProduct).delete(deleteProduct)

module.exports = router;
