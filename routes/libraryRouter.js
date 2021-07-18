const express = require("express");

const { isLoggedIn, restrictedTo } = require("./../controllers/authController");
const { userRoles } = require("./../models/userModel");
const libraryController = require("./../controllers/libraryController");
const book_libraryController = require("./../controllers/book-libraryController");

const router = express.Router();

router.route("/:libraryID").get(isLoggedIn, libraryController.getLibrary);

router.use(isLoggedIn);
router
  .route("/")
  .post(
    restrictedTo(userRoles.STAFF, userRoles.ADMIN),
    libraryController.createLibrary
  );

router
  .route("/:libraryID/books-of-library")
  .get(isLoggedIn, book_libraryController.getBooksOfLibrary);

router
  .route("/add-to-library")
  .post(
    isLoggedIn,
    restrictedTo(userRoles.STAFF, userRoles.ADMIN),
    book_libraryController.addBooksToLibrary
  );

module.exports = router;
