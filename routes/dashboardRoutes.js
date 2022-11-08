const express = require('express');
const dashboardController = require("../controllers/dashboardController");
const auth = require("../middlewears/auth");
const router = express.Router();

router.route('/')
    .get(dashboardController.dashboard);
router.get('/details/:uid',auth.sessionCheckUser, dashboardController.showProduct);
router.post('/fetch',auth.sessionCheckUser, dashboardController.productFetch);
router.get('/allProducts',auth.sessionCheckUser, dashboardController.showAllProducts);
router.get('/women',auth.sessionCheckUser, dashboardController.women);
router.get('/men',auth.sessionCheckUser, dashboardController.men);

module.exports = router;
