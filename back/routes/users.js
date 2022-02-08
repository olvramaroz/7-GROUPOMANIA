const express = require("express");
const router = express.Router();

const usersCtrl = require("../controllers/users");
const { checkToken } = require("../middleware/auth");
const multer = require("../middleware/multer-config");


/* BASE_URL '/' = http://localhost:5000/api/users */

// create
router.post("/signup", multer, usersCtrl.signup);           http://localhost:5000/api/users/signup STATUS OK
router.post("/login", usersCtrl.login);                     http://localhost:5000/api/users/login STATUS OK, UserId et Token générés

// read
router.get("/getOneUser/:id", checkToken, usersCtrl.getOneUser); http://localhost:5000/api/users/getOneUser/1 STATUS OK - "userId": 3             http://localhost:5000/api/users/getAs - non testé

// update
router.patch("/updateUserPicture/:id", checkToken, multer, usersCtrl.updateUserPicture);    http://localhost:5000/api/users/updateUserPicture/3 - STATUS KO
router.put("/updateName/:id", checkToken, usersCtrl.updateName);                          http://localhost:5000/api/users/updateUserName/3 - STATUS OK
router.patch("/updatePassword/:id", checkToken, usersCtrl.updatePassword);                  http://localhost:5000/api/users/updatePassword/3 - STATUS KO

// delete
router.delete("/deleteUser/:id", checkToken, usersCtrl.deleteUser);       http://localhost:5000/api/users/deleteUser/3 - STATUS OK


module.exports = router;