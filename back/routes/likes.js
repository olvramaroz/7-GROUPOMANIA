const express = require("express");
const router = express.Router();
const likesCtrl = require("../controllers/likes");

router.post("/", likesCtrl.like);
router.post("/liked", likesCtrl.liked);


module.exports = router;