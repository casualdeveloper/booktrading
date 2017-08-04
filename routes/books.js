const express = require("express");
const router = express.Router();
const authController = require("../controllers/authentication");
const bookController = require("../controllers/book");
const userController = require("../controllers/user");

router.post("/search", authController.JWTLogin, bookController.searchForBooks);
router.post("/addBook", authController.JWTLogin, bookController.addBook, userController.addBook);
router.post("/deleteBook", authController.JWTLogin, userController.deleteBook, bookController.deleteBook, function(req, res){
    res.status(200).json({ bookId: req.body.bookId })
});
router.post("/fetch", bookController.fetchBooks);


module.exports = router;