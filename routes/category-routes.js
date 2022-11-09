const express = require('express');
const categoryController = require("../controllers/category_controller");
const auth = require("../middlewears/auth");
const router = express.Router();
router.get('/',auth.sessionCheckDashboard,categoryController.categorys);
router.post('/', categoryController.categoryPost);
// router.get('/display', categoryController.categoryDisplay);
router.delete('/:uid', categoryController.categoryDelete);
module.exports = router;