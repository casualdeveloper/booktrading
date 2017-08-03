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

exports.changeTradeState = function(req, res, next){
    let tradeId = req.body.tradeId;
    let status = req.body.status;
    if(!status || typeof status !== "string"){
        return res.status(422).json({error: "Invalid trade status"});
    }
    if(!tradeId || typeof tradeId !== "string"){
        return res.status(422).json({error: "Invalid trade id"});
    }

    Trade.findById(tradeId, function(err,tradeDoc){
        if(err) return next(err);
        if(!tradeDoc){
            return res.status(422).json({error: "Trade request not found!"});
        }
        if(!tradeDoc.receiver.equals(req.user._id)){
            return res.status(422).json({error: "Unauthorized"});
        }
        tradeDoc.status = status;
        tradeDoc.save(function(err, newTradeDoc){
            if(err) return next(err);

            res.status(200).json({trade: newTradeDoc});
        });

    });
}


exports.deleteTrade = function(req, res, next){
    let tradeId = req.body.tradeId;
    if(!tradeId)
        return res.status(422).json({error: "Invalid trade id"});

    Trade.findByIdAndRemove(tradeId, function(err){
        if(err) return next(err);
        return res.status(200).json({tradeId});
    });
    
}

exports.fetchUserTrades = function(req, res, next){
    let userId = req.user._id;

    Trade.find({ $or: [ { sender: userId }, { receiver: userId } ] })
    .populate({ path: "book", select: "title" })
    .populate({ path: "receiver", select: "username" })
    .populate({ path: "sender", select: "username" })
    .exec(function(err, tradeDoc){
        if(err) return next(err);

        res.status(200).json({trades: tradeDoc});

    });

}

