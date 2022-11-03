const express = require('express');

const adminController = require("../controllers/admin_controller");
const auth = require("../middlewears/auth");
const router = express.Router();
router.get('/signin', auth.sessionCheck, adminController.signinPage);
router.post('/signin', adminController.signin);
router.get('/dashboard', auth.sessionCheckDashboard, adminController.adminDashbord);
router.get('/product', auth.sessionCheckDashboard,adminController.product);
router.get('/logout', adminController.logout);
router.get('/orders',auth.sessionCheckDashboard, adminController.orders);
router.post('/order/view',auth.sessionCheckDashboard,adminController.orderView)
router.post('/order/edit',auth.sessionCheckDashboard,adminController.orderEdit)
router.post('/order/address',auth.sessionCheckDashboard,adminController.address)


module.exports = router;