const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authController = require("../controllers/authentication");

router.post("/updateProfile", authController.JWTVerify, userController.updateProfile, authController.loginNoJWT);
router.post("/changepassword", authController.JWTVerify, userController.changePassword, function(req,res){
    res.status(200).json({message:"Password changed successfully!"});
});
router.post("/checkformatch", userController.checkForMatch);
router.post("/fetchbooks", authController.JWTVerify, userController.fetchBooks);

module.exports = router;