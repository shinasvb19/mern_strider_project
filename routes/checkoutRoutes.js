const express = require('express');
const checkoutController = require("../controllers/checkoutController");
const auth = require("../middlewears/auth");
const router = express.Router();
router.route('/')
.get(auth.sessionCheckUser,checkoutController.checkoutPage)

router.put('/',auth.sessionCheckUser,checkoutController.addAddress)
router.post('/order',auth.sessionCheckUser,checkoutController.placeOrder)
router.post('/verify',auth.sessionCheckUser,checkoutController.paymentSuccess)
router.get('/orderSuccess',auth.sessionCheckUser,checkoutController.successPage)
module.exports = router