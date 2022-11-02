const express = require('express');

const adminController = require("../controllers/admin_controller");
const router = express.Router();
router.get('/signin', adminController.sessionCheck, adminController.signinPage);
router.post('/signin', adminController.signin);
router.get('/dashboard', adminController.sessionCheckDashboard, adminController.adminDashbord);
router.get('/product', adminController.product);
router.get('/logout', adminController.logout);
router.get('/orders', adminController.orders);
router.post('/order/view',adminController.orderView)
router.post('/order/edit',adminController.orderEdit)
router.post('/order/address',adminController.address)


module.exports = router;