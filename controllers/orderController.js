const OrderModel = require("../models/orderModel");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

exports.getOrder = catchAsync(async (req, res, next) => {
  const { bookID } = req.params;
  if (!bookID) {
    return next(new AppError("Request is not providing the book ID!", 400));
  }

  const order = await OrderModel.find({ bookID: bookID });
  if (!order) {
    return next(new AppError("No order found!", 404));
  }
  res.status(200).json({
    status: "Success",
    order,
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const { bookID } = req.params;
  if (!bookID) {
    return next(new AppError("Request is not providing the book ID!", 400));
  }
  const newOrder = await OrderModel.create({
    numOfABook: req.body.numOfABook,
    bookID: bookID,
    buyer: req.user._id,
  });

  req.user.addToCart(bookID, req.user);

  res.status(201).json({
    status: "Success",
    newOrder,
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { bookID } = req.params;
  if (!bookID) {
    return next(new AppError("Request is not providing the book ID!", 400));
  }
  const order = await OrderModel.deleteOne({ bookID: bookID });

  if (!order) {
    return next(new AppError("No order of this book found!", 404));
  }

  req.user.removeFromCart(bookID, req.user);

  res.status(200).json({
    status: "Success",
    order,
  });
});

exports.removeAllOrders = catchAsync(async (req, res, next) => {
  const order = await OrderModel.deleteMany();

  if (!order) {
    return next(new AppError("No order found!", 404));
  }

  req.user.clearCart(req.user);

  res.status(200).json({
    status: "Success",
    order,
  });
});
