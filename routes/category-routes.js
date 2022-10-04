const express = require('express');
const categoryController = require("../controllers/category_controller");
const router = express.Router();
router.get('/', categoryController.sessionCheckDashboard, categoryController.categorys);
router.post('/', categoryController.categoryPost);
// router.get('/display', categoryController.categoryDisplay);
router.delete('/:uid', categoryController.categoryDelete);
module.exports = router;