const express = require("express");
const router = express.Router();

const postsCtrl = require("../controllers/posts");
const { checkToken } = require("../middleware/authToken");
const multer = require("../middleware/multer-config");

/* BASE_URL '/' = http://localhost:5000/api/posts */

/**** CRUD POSTS ****/
router.post("/", checkToken, multer, postsCtrl.createPost);
router.get("/", checkToken, postsCtrl.getAllPosts);
router.put("/update/:id", checkToken, multer, postsCtrl.updatePost);
router.delete("/:id", checkToken, postsCtrl.deletePost);

module.exports = router;