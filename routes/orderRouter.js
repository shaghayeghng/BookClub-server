const express = require("express");

const { isLoggedIn } = require("./../controllers/authController");
const orderController = require("./../controllers/orderController");

const router = express.Router();

router.route("/:bookID")
  .get(isLoggedIn, orderController.getOrder)
  .post(isLoggedIn, orderController.createOrder)
  .delete(isLoggedIn, orderController.deleteOrder);

module.exports = router;

