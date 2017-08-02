const Trade = require("../models/trade");
const Book = require("../models/book");
const passport = require("passport");
const mongoose = require("mongoose");

exports.addTrade = function(req, res, next){
    let bookId = req.body.bookId;
    if(typeof bookId !== "string"){
        return res.status(422).json({error: "Invalid book id"});
    }
    Book.findById(bookId, function(err, results){
        if( err ) return next(err);
        if(!results){
            return res.status(422).json({error: "Book not found!"});
        }
        if(results._owner.equals(req.user._id)){
            return res.status(422).json({error: "Can't trade with youreslf!"});
        }

        let receiver = results._owner;
        let sender = req.user._id;

        Trade.findOne({ $and: [ { sender: sender }, { book: bookId } ] }, function(err, tradeDoc){
            if(err) return next(err);
            if(tradeDoc){
                return res.status(422).json({error: "You have already requested a trade for this book!"});
            }

            let newTrade = new Trade({sender: sender, receiver:receiver, book: bookId});
                newTrade.save(function(err, newDoc){
                if(err) return next(err);
                res.status(200).json({trade:newDoc});
            });

        });

    });
}

exports.approveTrade = function(req, res, next){
    res.status(200).json({});
}

exports.declineTrade = function(req, res, next){
    res.status(200).json({});
}

exports.cancelTrade = function(req, res, next){
    res.status(200).json({});
}

exports.fetchUserTrades = function(req, res, next){
    res.status(200).json({});
}

