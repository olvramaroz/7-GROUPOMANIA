const express = require("express")
const router = express.Router()
const postCtrl = require("../controllers/posts.ctrl.js")
const multer = require("../middleware/multer")


// baseUrl : http://localhost:8080/api/posts/ + routes
router.get("/", postCtrl.findAllPosts) // postman ok
router.get("/users/:id", postCtrl.findAllPostsForOne) // postman ok
router.get("/:id", postCtrl.findOnePost) // postman ok
router.post("/", multer, postCtrl.createPost) // postman ok, texte + image
router.put("/:id", multer, postCtrl.modifyPost) // postman ok
router.delete("/:id", postCtrl.deletePost) // postman ok

module.exports = router