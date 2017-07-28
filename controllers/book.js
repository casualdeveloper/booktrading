const axios = require("axios");
const API_KEY = require("../config").API_KEY;
const Book = require("../models/book");

//https://www.googleapis.com/books/v1/volumes?q=1984&key=AIzaSyDOEQ7jK9lFbTk7sYQ63XFR6ajCaOZBvKA&fields=items(volumeInfo/title,volumeInfo/description,volumeInfo/authors,volumeInfo/imageLinks/thumbnail)&printType=books

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
        owner: req.user.id
    });
    newBook.save(function(err, book){
        if(err) next(err);
        req.book = book;
        next();
    });
}