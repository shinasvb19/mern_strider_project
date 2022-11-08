const express = require('express');
const cartController = require("../controllers/cartController");
const auth = require("../middlewears/auth");
const router = express.Router();
router.route('/')
    .get(auth.sessionCheckUser,cartController.cartPage)
    .post(auth.sessionCheckUser,cartController.cartPost)
router.post('/change-product-qt',auth.sessionCheckUser, cartController.quantity)
router.post('/cartItemDelete',auth.sessionCheckUser,cartController.cartItemDelete)

module.exports = router;