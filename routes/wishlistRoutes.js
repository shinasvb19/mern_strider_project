const express = require('express');
const wishlistController = require("../controllers/wishlistController");
const auth = require("../middlewears/auth");
const router = express.Router();

// router.get('/',wishlistController.wishlistGet);
router.get("/",auth.sessionCheckUser,wishlistController.wishlistView);
router.post('/add',auth.sessionCheckUser,wishlistController.wishlistAdd)
router.post("/wishlistDelete",auth.sessionCheckUser,wishlistController.wishlistDelete);


module.exports = router;