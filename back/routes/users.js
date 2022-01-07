const express = require("express");
const router = express.Router();

const usersCtrl = require("../controllers/users");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


/* BASE_URL '/' = http://localhost:5000/api/users */

// create
router.post("/signup", multer, usersCtrl.signup);
router.post("/login", usersCtrl.login);

// read
// router.post("/", auth, usersCtrl.getOne);
// router.post("/getAs", auth, usersCtrl.getAs);

// update
// router.put("/modify/:id", auth, multer, usersCtrl.modifyUserPicture);
// router.put("/modifyAccount/:id", auth, usersCtrl.modifAccount);
// router.put("/modifyPassword/:id", auth, usersCtrl.modifyPassword);

// delete
// router.delete("/delete/:id", usersCtrl.deleteUser);


module.exports = router;