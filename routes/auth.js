const express = require("express");
const router = express.Router();

const AuthenticationController = require("../controllers/authentication");  
const passportService = require("../setuppassport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });  



router.post("/signup", AuthenticationController.register);

router.post("/login", function(req,res,next){
    passport.authenticate("local", function(err, user, message){
        if(err) { return next(err) }
        if(!user) { return res.status(422).send(message) }
        req.user = user;
        return next();
    })(req, res, next);

}, AuthenticationController.login);

module.exports = router;