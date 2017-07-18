const User = require("../models/user");
const passport = require("passport");

exports.updateProfile = function(req, res, next) { 
    const profileObj = req.body;

    User.findById(req.user.id, function(err, foundUser){
        if(err) { return next(err) }
        foundUser.profile = {
            firstName: profileObj.firstName,
            lastName: profileObj.lastName,
            country: profileObj.country,
            state: profileObj.state,
            city: profileObj.city
        };
        foundUser.save(function(err){
            if(err) { return next(err) };
            return next();
        })
    });

    
}