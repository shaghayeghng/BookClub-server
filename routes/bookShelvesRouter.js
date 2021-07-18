const express = require("express");

const { isLoggedIn } = require("./../controllers/authController");
const bookShelvesController = require("./../controllers/bookShelvesController");
const book_bookShelvesController = require("./../controllers/book-bookShelvesController");

const router = express.Router();

router
  .route("/")
  .get(isLoggedIn, bookShelvesController.getBookShelves)
  .post(isLoggedIn, bookShelvesController.createBookShelves);

router
  .route("/:bookshelfID")
  .delete(isLoggedIn, bookShelvesController.deleteBookShelves);

router
  .route("/:bookshelfID/books-of-bookshelf")
  .get(isLoggedIn, book_bookShelvesController.getBooksOfBookShelf);

router
  .route("/add-to-bookshelf") 
  .post(isLoggedIn, book_bookShelvesController.addBooksToBookShelf);
module.exports = router;

