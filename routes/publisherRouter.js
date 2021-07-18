const express = require("express");

const { isLoggedIn, restrictedTo } = require("./../controllers/authController");
const { userRoles } = require("./../models/userModel");
const publisherController = require("./../controllers/publisherController");

const router = express.Router();

router.route("/:publisherID").get(isLoggedIn, publisherController.getPublisher);

router.use(isLoggedIn);
router.route("/").post(restrictedTo(userRoles.STAFF, userRoles.ADMIN), publisherController.createPublisher);

module.exports = router;