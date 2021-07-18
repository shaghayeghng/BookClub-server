const express = require("express");

const { isLoggedIn, restrictedTo } = require("./../controllers/authController");
const { userRoles } = require("./../models/userModel");
const authorController = require("./../controllers/authorController");

const router = express.Router();

router.route("/:authorID").get(isLoggedIn, authorController.getAuthor);

router.use(isLoggedIn);
router.route("/").post(restrictedTo(userRoles.STAFF, userRoles.ADMIN), authorController.createAuthor);

module.exports = router;