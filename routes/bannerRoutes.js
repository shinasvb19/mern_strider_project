const express = require('express');
const bannerController = require("../controllers/bannerController");
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const router = express.Router();
router.get('/', bannerController.getBanner);
router.post('/',upload.array('imageOne'), bannerController.bannerPost);
router.post('/coupon',upload.array('imageOne'), bannerController.couponBanner);




module.exports = router;