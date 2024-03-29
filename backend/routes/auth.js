const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    logout, loginStatus, getUser
} = require("../controller/authController");
const { protect } = require("../middleware/authMiddleware");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/loginStatus").get(loginStatus);
router.route("/getUser").get(protect, getUser);

module.exports = router;