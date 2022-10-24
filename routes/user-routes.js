const express = require('express');

// const { check } = require('express-validator');
const userController = require("../controllers/user_controller");
const router = express.Router();
router.get('/signup', userController.signupPage);
router.post('/signup', userController.signup);
router.get('/signin', userController.signinPage);
router.post('/signin', userController.signin);
router.get('/profile', userController.profile);
router.put('/profile', userController.profilePut)
router.get('/profile/address',userController.addressGet)
router.delete('/address/:id', userController.deleteAddress)
module.exports = router;