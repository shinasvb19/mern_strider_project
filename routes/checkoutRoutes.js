const express = require('express');
const checkoutController = require("../controllers/checkoutController");
const router = express.Router();
router.route('/')
.get(checkoutController.checkoutPage)


module.exports = router
