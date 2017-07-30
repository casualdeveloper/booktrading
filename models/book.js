const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: {type: String, required: true},
    authors: [],
    _owner: { type: Schema.ObjectId, required: true, ref: "User" },
    date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;