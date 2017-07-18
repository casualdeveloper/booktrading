const express = require("express");
const router = express.Router();

const AuthenticationController = require("../controllers/authentication");  

router.post("/signup", AuthenticationController.register);

router.post("/login", AuthenticationController.localLogin, AuthenticationController.login);

router.post("/extractJWT",AuthenticationController.JWTVerify,AuthenticationController.loginNoJWT);

module.exports = router;