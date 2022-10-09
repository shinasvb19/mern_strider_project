const express = require('express');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const productController = require("../controllers/productController");
const router = express.Router();
router.route('/')
    .get(productController.productPage)

router.post(('/'), upload.array('image'), productController.productPost)

module.exports = router;
