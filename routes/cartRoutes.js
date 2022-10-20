const express = require('express');
const cartController = require("../controllers/cartController");
const router = express.Router();
router.route('/')
    .get(cartController.cartPage)
    .post(cartController.cartPost);


module.exports = router;