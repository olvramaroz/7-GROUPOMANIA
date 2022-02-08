const express = require("express");
const router = express.Router();

const postsCtrl = require("../controllers/posts");
const { checkToken } = require("../middleware/auth");
const multer = require("../middleware/multer-config");


/* BASE_URL '/' = http://localhost:5000/api/posts */

/**** CRUD POSTS ****/
// create
router.post("/", checkToken, multer, postsCtrl.createPost);

// read
router.get("/", checkToken, postsCtrl.getAllPosts);

// update
router.put("/update/:id", checkToken, multer, postsCtrl.updatePost);

// delete
router.delete("/:id", checkToken, postsCtrl.deletePost);



/**** CRUD COMMENTS ****/
// create

// read

// update

// delete


/**** CRUD LIKES ****/
// create

// read

// update

// delete

module.exports = router;