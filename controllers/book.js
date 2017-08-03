const axios = require("axios");
const API_KEY = require("../config").API_KEY;
const Book = require("../models/book");
const mongoose = require("mongoose");


exports.searchForBooks = function(req,res,next){
    axios.get("https://www.googleapis.com/books/v1/volumes", {
        params: {
            q: req.body.search,
            key: API_KEY,
            fields: "items(volumeInfo/title,volumeInfo/description,volumeInfo/authors,volumeInfo/imageLinks/thumbnail)",
            printType:"books",
            maxResults: 6,
            langRestrict: "en"
        }
    })
    .then(function (response) {
        res.status(200).json(response.data);
    })
    .catch(function (error) {
        res.status(422).json(error);
    });
}

exports.addBook = function(req,res,next){
    let reqBook = req.body.book;
    let newBook = new Book({
        image: reqBook.image,
        authors: reqBook.authors,
        title: reqBook.title,
        description: reqBook.description,
        _owner: req.user.id
    });
    newBook.save(function(err, book){
        if(err) next(err);
        req.book = book;
        next();
    });
}

exports.fetchBooks = function(req, res, next){
    const pageSize = 20;
    let lastBook = req.body.lastBook;
    let books;
    let queryFindParams = {};
    if(lastBook){
        let oid = mongoose.Types.ObjectId(lastBook);
        queryFindParams = {_id: {$gt: oid}};
    }

    Book.find(queryFindParams).limit(pageSize).exec(function(err, results){
        if(err){ return next(err) }
        res.status(200).json({books: results});
    });
}