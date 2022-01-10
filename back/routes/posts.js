const express = require("express");
const router = express.Router();

const postsCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


/**** CRUD POSTS ****/
// create
router.post("/", auth, multer, postsCtrl.createPost); //create

// read
router.get("/", auth, postsCtrl.getAllPosts); //auth, 
router.post("/byAuthor",postsCtrl.getPostByAuthor);

// update
router.put("/:id", multer, postsCtrl.modifyPost); //modify

// delete
router.delete("/:id", auth, postsCtrl.deletePost); //auth, delete



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