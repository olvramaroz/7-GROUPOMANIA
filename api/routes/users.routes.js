const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/users.ctrl.js")
const auth = require("../middleware/auth");
const multer = require("../middleware/multer")

// baseUrl : http://localhost:8080/api/users/ + routes
router.post("/signup", userCtrl.signup) // postman ok
router.post("/login", userCtrl.login) // postman ok token, userId ok
router.get("/:id", auth, userCtrl.findOneUser) // postman ok
router.put("/:id", auth, multer, userCtrl.modifyUser) // postman ok
router.delete('/:id', auth, userCtrl.deleteUser)


module.exports = router