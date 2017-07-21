const User = require("../models/user");
const passport = require("passport");

exports.updateProfile = function (req, res, next) {
    const profileObj = req.body;
    const userId = req.user.id;

    User.findById(userId, function (err, foundUser) {
        if (err) {
            return next(err)
        }
        foundUser.profile = {
            firstName: profileObj.firstName,
            lastName: profileObj.lastName,
            country: profileObj.country,
            state: profileObj.state,
            city: profileObj.city
        };
        foundUser.save(function (err) {
            if (err) {
                return next(err)
            };
            return next();
        })
    });
}

exports.changePassword = function (req, res, next) {
    const newPassword = req.body.newPassword;
    const currentPassword = req.body.currentPassword;
    const userId = req.user.id;

    User.findById(userId, function(err, foundUser){
        if(err) { return next(err) }
        
        foundUser.checkPassword(currentPassword, function(err, isMatch){
            if(err) { return next(err) }
            
            if(!isMatch){
                return res.status(422).json({error:"You entered wrong password"})
            }

            foundUser.password = newPassword;
            foundUser.save(function(err){
                if(err) { return next(err) }
                return next();
            });

        });
    });
}