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
router.post('/show', productController.postUpdate);
// router.get('/form', productController.editProductForm);
router.put('/edit/:uid', upload.array('image'), productController.findUpdate);
module.exports = router;
