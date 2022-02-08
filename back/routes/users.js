const express = require("express");
const router = express.Router();

const usersCtrl = require("../controllers/users");
const { checkToken } = require("../middleware/authToken");
const authUser = require("../middleware/authUser");
const multer = require("../middleware/multer-config");


/* BASE_URL '/' = http://localhost:7070/api/users */

// create
router.post("/signup", multer, usersCtrl.signup);           http://localhost:7070/api/users/signup STATUS OK
router.post("/login", usersCtrl.login);                     http://localhost:7070/api/users/login STATUS OK, UserId et Token générés

// read
router.get("/getOneUser/:id", authUser, usersCtrl.getOneUser); http://localhost:7070/api/users/getOneUser/1 STATUS OK - "userId": 3

// update
router.patch("/updateUserPicture/:id", checkToken, multer, usersCtrl.updateUserPicture);    http://localhost:7070/api/users/updateUserPicture/3 - STATUS KO
router.put("/updateName/:id", checkToken, usersCtrl.updateName);                          http://localhost:7070/api/users/updateUserName/3 - STATUS OK
router.patch("/updatePassword/:id", checkToken, usersCtrl.updatePassword);                  http://localhost:7070/api/users/updatePassword/3 - STATUS KO

// delete
router.delete("/deleteUser/:id", usersCtrl.deleteUser);       http://localhost:7070/api/users/deleteUser/3 - STATUS OK


module.exports = router;