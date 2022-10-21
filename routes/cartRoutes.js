const express = require('express');
const cartController = require("../controllers/cartController");
const router = express.Router();
router.route('/')
    .get(cartController.cartPage)
    .post(cartController.cartPost)
router.post('/change-product-qt', cartController.quantity)
router.post('/cartItemDelete',cartController.cartItemDelete)

module.exports = router;