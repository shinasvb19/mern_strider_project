const express = require('express');
const brandController = require("../controllers/brandController");
const router = express.Router();
router.route('/')
    .get(brandController.brandPage)
    .post(brandController.brandPost);
router.delete('/:uid', brandController.brandDelete);

module.exports = router;