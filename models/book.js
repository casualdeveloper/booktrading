const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: {type: String, required: true},
    authors: [],
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;