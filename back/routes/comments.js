const express = require("express");
const router = express.Router();

const { checkToken } = require("../middleware/authToken");
const commentsCtrl = require("../controllers/comments");


router.post("/", checkToken, commentsCtrl.create);
router.get("/", checkToken, commentsCtrl.getAll);
router.delete("/:commentId/:postId", checkToken, commentsCtrl.delete);


module.exports = router;