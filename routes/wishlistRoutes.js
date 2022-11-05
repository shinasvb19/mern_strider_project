const express = require('express');
const wishlistController = require("../controllers/wishlistController");
const router = express.Router();

// router.get('/',wishlistController.wishlistGet);
router.get("/",wishlistController.wishlistView);
router.post('/add',wishlistController.wishlistAdd)
router.post("/wishlistDelete",wishlistController.wishlistDelete);


module.exports = router;