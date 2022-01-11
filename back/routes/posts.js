const express = require("express");
const router = express.Router();

const postsCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


/**** CRUD POSTS ****/
// create
router.post("/posts", auth, multer, postsCtrl.createPost); //create

// read
router.get("/posts", auth, postsCtrl.getAllPosts); //auth, 
router.post("/posts/byAuthor",postsCtrl.getPostByAuthor);

// update
router.put("/posts/:id", multer, postsCtrl.modifyPost); //modify

// delete
router.delete("/posts/:id", auth, postsCtrl.deletePost); //auth, delete



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