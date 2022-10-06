const express = require('express');
const subCategoryController = require("../controllers/subcategory_controller");
const router = express.Router();
router.get('/', subCategoryController.sessionCheckDashboard, subCategoryController.subcategory);
router.post('/', subCategoryController.subcategoryPost);
router.delete('/:uid', subCategoryController.subcategoryDelete);








module.exports = router;