const express = require('express');
const auth = require("../middlewears/auth");
// const { check } = require('express-validator');
const userController = require("../controllers/user_controller");
const router = express.Router();
router.get('/signup', userController.signupPage);
router.post('/signup', userController.signup);
router.get('/signin',  userController.signinPage);
router.post('/signin', userController.signin);
router.get('/profile', auth.sessionCheckUser, userController.profile);
router.put('/profile',auth.sessionCheckUser, userController.profilePut)
router.get('/profile/address',auth.sessionCheckUser,userController.addressGet)
router.delete('/address/:id',auth.sessionCheckUser, userController.deleteAddress)
router.get('/orders',auth.sessionCheckUser,userController.showOrders)
router.post('/order/cancel',auth.sessionCheckUser,userController.orderCancel)
router.post('/order/view',auth.sessionCheckUser,userController.orderView)

module.exports = router;