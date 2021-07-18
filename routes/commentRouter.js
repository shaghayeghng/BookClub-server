const express = require("express");

const { isLoggedIn } = require("./../controllers/authController");
const commentController = require("./../controllers/commentController");

const router = express.Router();

router.route("/:bookID")
  .get(isLoggedIn, commentController.getComments)
  .post(isLoggedIn, commentController.createComment);

module.exports = router;
