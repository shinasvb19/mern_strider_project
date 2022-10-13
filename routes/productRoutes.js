const express = require('express');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const productController = require("../controllers/productController");
const router = express.Router();
router.route('/')
    .get(productController.productPage)
    .post(upload.array('image'), productController.productPost)
router.post('/fetch', productController.productLookup);
router.get('/show', productController.showProducts);
router.get('/edit', productController.showEdit);
module.exports = router;
