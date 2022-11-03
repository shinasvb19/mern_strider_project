const express = require('express');
const couponController = require("../controllers/couponController");
const router = express.Router();

router.get('/',couponController.coupons)
router.post('/',couponController.couponPost)
router.post('/compare',couponController.couponCompare)
router.delete('/',couponController.deleteCoupon)






module.exports = router