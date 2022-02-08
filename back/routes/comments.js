const express = require("express");
const router = express.Router();

const { checkToken } = require("../middleware/auth");
const commentsCtrl = require("../controllers/comments");


router.post("/", checkToken, commentsCtrl.create);
router.get("/", checkToken, commentsCtrl.getAll);
router.delete("/:commentId/:postId", auth, commentsCtrl.delete);


module.exports = router;