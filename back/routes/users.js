const express = require("express");
const router = express.Router();

const usersCtrl = require("../controllers/users");
const auth = require('../middleware/auth')
const validPassword = require("../middleware/validPassword")
const multer = require('../middleware/multer-config')

/* BASE_URL '/' = http://localhost:5000/api/users */

// create
router.post("/signup", validPassword, usersCtrl.signup);

// read
router.post("/login", usersCtrl.login);
router.get('/all-users', usersCtrl.getAllUsers);
router.get('/:id', usersCtrl.getOneUser);

// update
// router.put('/edit', auth, multer, usersCtrl.editUser)

// delete
// router.delete('/:id', auth, validPassword, usersCtrl.deleteUser);

module.exports = router;