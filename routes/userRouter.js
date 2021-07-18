const express = require("express");

const { isLoggedIn, restrictedTo } = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const { userRoles } = require("./../models/userModel");

const router = express.Router();

router
  .route("/profile")
  .get(isLoggedIn, userController.myProfile)
  .put(isLoggedIn, userController.editUseInfo);
router.route("/profile/:username").get(userController.otherProfile);

router
  .route("/update-role")
  .patch(
    isLoggedIn, 
    restrictedTo(userRoles.ADMIN), 
    userController.updateRole
  );

module.exports = router;
