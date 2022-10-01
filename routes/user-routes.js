const express = require('express');

// const { check } = require('express-validator');
const userController = require("../controllers/user_controller");
const router = express.Router();
router.get('/signup', userController.signupPage);
router.post('/signup', userController.signup);
router.get('/signin', userController.signinPage);
router.post('/signin', userController.signin);


module.exports = router;