const BookShelvesModel = require("../models/bookShelvesModel");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

exports.getBookShelves = catchAsync(async (req, res, next) => {
  const bookShelves = await BookShelvesModel.find();
  if (!bookShelves) {
    return next(new AppError("No book shelves found!", 404));
  }
  res.status(200).json({
    status: "Success",
    bookShelves,
  });
});

exports.createBookShelves = catchAsync(async (req, res, next) => {
  const newBookShelves = await BookShelvesModel.create({
    title: req.body.title,
    numOfBooks: req.body.numOfBooks,
    user: req.user._id,
  });

  res.status(201).json({
    status: "Success",
    newBookShelves,
  });
});

exports.deleteBookShelves = catchAsync(async (req, res, next) => {
  const { bookshelfID } = req.params;
  if (!bookshelfID) {
    return next(new AppError("Request is not providing the book shelf ID!", 400));
  }
  const bookShelves = await BookShelvesModel.findByIdAndDelete(bookshelfID);

  if (!bookShelves) {
    return next(new AppError("No book shelves found!", 404));
  }

  res.status(200).json({
    status: "Success",
    bookShelves,
  });
});

