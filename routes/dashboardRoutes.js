const express = require('express');
const dashboardController = require("../controllers/dashboardController");
const router = express.Router();
router.route('/')
    .get(dashboardController.dashboard)
router.get('/details/:uid', dashboardController.showProduct)


module.exports = router;
