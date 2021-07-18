const express = require("express");

const { isLoggedIn, restrictedTo } = require("./../controllers/authController");
const { userRoles } = require("./../models/userModel");
const bookController = require("./../controllers/bookController");

const router = express.Router();

router.route("/").get(bookController.getAllBooks);
router.route("/:bookID").get(bookController.getBook);

router.use(isLoggedIn);

router.route("/add").post(restrictedTo(userRoles.STAFF, userRoles.ADMIN), bookController.addBook);

router
  .route("/update-status/:bookID")
  .patch(restrictedTo(userRoles.STAFF, userRoles.ADMIN), bookController.updateStatus);

router
  .route("/remove/:bookID")
  .delete(restrictedTo(userRoles.STAFF, userRoles.ADMIN), bookController.deleteBook);

module.exports = router;
