const book_libraryModel = require("../models/book-library");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

exports.getBooksOfLibrary = catchAsync(async (req, res, next) => {
  const { libraryID } = req.params;
  if (!libraryID) {
    return next(new AppError("Request is not providing the library ID!", 400));
  }

  const library = await book_libraryModel.find({
    library: libraryID,
  });
  if (!library) {
    return next(new AppError("No books found in the this library!", 404));
  }
  res.status(200).json({
    status: "Success",
    library,
  });
});

exports.addBooksToLibrary = catchAsync(async (req, res, next) => {
  const newBooks = await book_libraryModel.create({
    bookID: req.body.bookID,
    library: req.body.library,
  });

  res.status(201).json({
    status: "Success",
    newBooks,
  });
});
