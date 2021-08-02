const BookModel = require("../models/bookModel");
const { sellingStatus } = require("../models/bookModel");
const APIFeatures = require("../util/apiFeatures");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

exports.getAllBooks = catchAsync(async (req, res, next) => {

  const features = new APIFeatures(BookModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const books = await features.query;

  res.status(200).json({
    status: "Success",
    results: books.length,
    books,
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const { bookID } = req.params;
  if (!bookID) {
    return next(new AppError("Request is not providing the book ID!", 400));
  }
  const book = await BookModel.findById(bookID);
  if (!book) {
    return next(new AppError("No book found with this ID!", 404));
  }

  res.status(200).json({
    status: "Success",
    book,
  });
});

exports.addBook = catchAsync(async (req, res, next) => {
  let coverName = req.file ? req.file.filename : "default.png";

  const newBook = await BookModel.create({
    bookISBN: req.body.bookISBN,
    title: req.body.title,
    edition: req.body.edition,
    genre: req.body.genre,
    litreraryAwards: req.body.litreraryAwards,
    reviews: req.body.reviews,
    summary: req.body.summary,
    cover: coverName,
    status: req.body.status,
    price: req.body.price,
    publishedYear: req.body.publishedYear,
    hasE_Book: req.body.hasE_Book,
    trivia: req.body.trivia,
    author: req.body.author,
    publisher: req.body.publisher,
  });

  res.status(200).json({
    status: "Success",
    newBook,
  });
});

//update the status of a book (available / not available)
exports.updateStatus = catchAsync(async (req, res, next) => {
  const { bookID } = req.params;
  if (!bookID) {
    return next(new AppError("Request is not providing the book ID!", 400));
  }
  const book = await BookModel.findOneAndUpdate(bookID, {
    status: sellingStatus.AVAILABLE,
  });

  if (!book) {
    return next(new AppError("No book found!", 404));
  }

  res.status(200).json({
    status: "Success",
    book,
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const { bookID } = req.params;
  if (!bookID) {
    return next(new AppError("Request is not providing the book ID!", 400));
  }
  const book = await BookModel.findByIdAndDelete(bookID);

  if (!book) {
    return next(new AppError("No book found!", 404));
  }

  res.status(200).json({
    status: "Success",
    book,
  });
});
