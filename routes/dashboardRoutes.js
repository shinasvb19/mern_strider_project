const express = require('express');
const dashboardController = require("../controllers/dashboardController");
const router = express.Router();

router.route('/')
    .get(dashboardController.dashboard);
router.get('/details/:uid', dashboardController.showProduct);
router.post('/fetch', dashboardController.productFetch);
router.get('/allProducts', dashboardController.showAllProducts);
router.get('/women', dashboardController.women);
router.get('/men', dashboardController.men);

module.exports = router;
