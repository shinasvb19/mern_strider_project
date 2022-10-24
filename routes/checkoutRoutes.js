const express = require('express');
const checkoutController = require("../controllers/checkoutController");
const router = express.Router();
router.route('/')
.get(checkoutController.checkoutPage)

router.put('/address',checkoutController.addAddress)


module.exports = router
