const express = require("express")
const router = express.Router()
const commentCtrl = require("../controllers/comments.ctrl.js")


// baseUrl : http://localhost:8080/api/comments/ + routes
router.post("/", commentCtrl.createComment) // postman ok 
router.get("/posts/:id", commentCtrl.findAllComments) // postman ok 
router.get("/:id", commentCtrl.findOneComment) // postman ok
router.put("/:id", commentCtrl.modifyComment) // postman ok
router.delete("/:id", commentCtrl.deleteComment) // postman ok

module.exports = router