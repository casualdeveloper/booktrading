const User = require("../models/user");
const passport = require("passport");
const mongoose = require("mongoose");

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

exports.checkForMatch = function(req, res, next) {
    const username = req.body.username;
    const email = req.body.email;

    const checkAgainst = (username)?"username":"email";
    const checkItem = (username)?username:email;

    User.findOne({ [checkAgainst]: checkItem }, function(err, foundUser){
        if(foundUser){
            return res.status(422).json({error: `This ${checkAgainst} already in use.`});
        }

        return res.status(200).json({});
        
    });

}

exports.addBook = function(req,res,next){
    User.findById(req.user.id, function(err, user){
        if(err) next(err);
        if(!user){
            res.status(401).json({error:"Unauthorized"});
        }
        user.books.push(req.book.id);
        user.save(function(err, user){
            if(err) next(err);
            res.status(200).json({book: req.book});
        });

    });
}

exports.deleteBook = function(req,res,next){
    let bookId = req.body.bookId;
    if(!bookId)
        return res.status(422).json({error: "Invalid book id!"});
    User.findById(req.user.id, function(err, userDoc){
        if(err) return next(err);

        let indexOfBookInUser = userDoc.books.indexOf(bookId);
        if(indexOfBookInUser === -1)
            return res.status(422).json({error: "Unauthorized"});

        userDoc.books.splice(indexOfBookInUser,1);

        userDoc.save(function(err){
            if(err) return next(err);

            return next();
        });

    });
}

exports.fetchBooks = function(req, res, next){ 
    const pageSize = 12;
    let lastBook = req.body.lastBook;
    let books;
    let queryFindParams = {};
    if(lastBook){
        let oid = mongoose.Types.ObjectId(lastBook);
        queryFindParams = {_id: {$gt: oid}};
    }

    User.findById(req.user.id).populate({
        path: "books",
        match: queryFindParams,
        options: { limit: 12 }
        }).exec(function(err, results){
            if(err) { return next(err) }
            res.status(200).json({books: results.books});
    });
}