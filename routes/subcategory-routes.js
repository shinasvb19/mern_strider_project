const express = require('express');
const subCategoryController = require("../controllers/subcategory_controller");
const router = express.Router();
const auth = require("../middlewears/auth");
router.get('/', auth.sessionCheckDashboard, subCategoryController.subcategory);
router.post('/', auth.sessionCheckDashboard,subCategoryController.subcategoryPost);
router.delete('/:uid', auth.sessionCheckDashboard,subCategoryController.subcategoryDelete);








module.exports = router;