const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authController = require("../controllers/authentication");

router.post("/updateProfile", authController.JWTVerify, userController.updateProfile, authController.loginNoJWT);

module.exports = router;