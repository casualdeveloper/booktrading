const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user");
const config = require("../config");

function generateToken(user) {  
    return jwt.sign(user, config.JWT_SECRET, {
        expiresIn: "14d"
    });
}

function setUserInfo(request) {  
    return {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
        username: request.username
    }
};

//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {

    let userInfo = setUserInfo(req.user);

    res.status(200).json({
        token: "JWT " + generateToken(userInfo),
        user: userInfo
    });
}


//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {  
    // Check for registration errors
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ error: "You must enter an email address."});
    }

    // Return error if no username provided
    if (!username) {
        return res.status(422).send({ error: "You must enter your username."});
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({ error: "You must enter a password." });
    }

    User.findOne({$or:[{ email: email}, {username: username}] }, function(err, existingUser) {
        if (err) { return next(err); }

        // If user is not unique, return errors


        if (existingUser && existingUser.email === email) {
            return res.status(422).send({ error: "Email address is already in use." });
        }


        if(existingUser && existingUser.username === username) {
            return res.status(422).send({ error: "Username is already in use." });
        }

        // If email and username is unique and password was provided, create account
        let user = new User({
            username: username,
            email: email,
            password: password
        });

        user.save(function(err, user) {
            if (err) { return next(err); }

            // Respond with JWT if user was created
            let userInfo = setUserInfo(user);

            res.status(201).json({
                token: "JWT " + generateToken(userInfo),
                user: userInfo
            });
        });
    });
}

//========================================
// Authorization Middleware
//========================================

exports.authorization = function(role) {  
    return function(req, res, next) {
        const user = req.user;

        User.findById(user._id, function(err, foundUser) {
            if (err) {
                res.status(422).json({ error: "No user was found." });
                return next(err);
            }

            return next();            
        })
    }
}