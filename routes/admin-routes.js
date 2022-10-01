const express = require('express');

const adminController = require("../controllers/admin_controller");
const router = express.Router();
router.get('/signin', adminController.signinPage);
router.post('/signin', adminController.signin);





module.exports = router;