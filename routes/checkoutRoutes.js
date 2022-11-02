const express = require('express');
const checkoutController = require("../controllers/checkoutController");
const router = express.Router();
router.route('/')
.get(checkoutController.checkoutPage)

router.put('/',checkoutController.addAddress)
router.post('/order',checkoutController.placeOrder)
router.post('/verify',checkoutController.paymentSuccess)
router.get('/orderSuccess',checkoutController.successPage)
module.exports = router