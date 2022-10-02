const express = require('express');

const adminController = require("../controllers/admin_controller");
const router = express.Router();
router.get('/signin', adminController.sessionCheck, adminController.signinPage);
router.post('/signin', adminController.signin);
router.get('/dashboard', adminController.sessionCheckDashboard, adminController.adminDashbord);
router.get('/product', adminController.product);
router.get('/logout', adminController.logout);




module.exports = router;