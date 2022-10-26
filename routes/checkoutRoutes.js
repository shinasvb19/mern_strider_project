const express = require('express');
const checkoutController = require("../controllers/checkoutController");
const router = express.Router();
router.route('/')
.get(checkoutController.checkoutPage)

router.put('/address',checkoutController.addAddress)
router.post('/order',checkoutController.placeOrder)
router.post('/verify',checkoutController.paymentSuccess)
module.exports = router
router.get('/orderSuccess',checkoutController.successPage)