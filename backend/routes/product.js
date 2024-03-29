const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer")
const { addProduct, updateProduct, deleteProduct, getProducts } = require('../controller/productController');

// Route for adding a new product
router.route('/add').post(protect, adminOnly,  upload.single('image') ,addProduct);

// Route for updating a product
router.route('/update/:id').put(protect, adminOnly, upload.single('image'), updateProduct);

// Route for deleting a product
router.route('/delete/:id').delete(protect, adminOnly, deleteProduct);
router.route('/productData').get(getProducts);

module.exports = router;
