const express = require("express");
const router = express.Router();

const likesCtrl = require("../controllers/likes");

router.post("/", likeCtrl.like);
router.post("/liked", likeCtrl.liked);


module.exports = router;