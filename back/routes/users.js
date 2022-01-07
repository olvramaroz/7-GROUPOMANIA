const express = require("express");
const router = express.Router();

const usersCtrl = require("../controllers/users");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const authTokenId = require("../middleware/auth");
const validEmail = require("../middleware/email");

/* BASE_URL '/' = http://localhost:5000/api/users */

// create
// router.post("/signup", validPassword, usersCtrl.signup); de moi
router.post("/signup", validEmail, multer, usersCtrl.signup);
router.post("/login", usersCtrl.login);

// read
router.post("/", auth, usersCtrl.getOne);
router.post("/getAs", auth, usersCtrl.getAs);

// update
// router.put('/edit', auth, multer, usersCtrl.editUser) de moi
router.put("/modify/:id", authTokenId, multer, usersCtrl.modifyPP);
router.put("/modifyAccount/:id", authTokenId, usersCtrl.modifAccount);
router.put("/modifyPassword/:id", authTokenId, usersCtrl.modifyPassword);

// delete
// router.delete('/:id', auth, validPassword, usersCtrl.deleteUser); de moi
router.delete("/delete/:id", usersCtrl.delete);


module.exports = router;