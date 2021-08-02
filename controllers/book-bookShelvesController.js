const book_bookShelvesModel = require("../models/book-bookShelves");
const bookShelvesModel = require("../models/bookShelvesModel");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

//get all books of a book shelf
exports.getBooksOfBookShelf = catchAsync(async (req, res, next) => {
  const { bookshelfID } = req.params;
  if (!bookshelfID) {
    return next(
      new AppError("Request is not providing the book shelf ID!", 400)
    );
  }

  const bookShelf = await book_bookShelvesModel.find({
    bookShelves: bookshelfID,
  });
  if (!bookShelf) {
    return next(new AppError("No book shelf found!", 404));
  }
  res.status(200).json({
    status: "Success",
    bookShelf,
  });
});

//add list of books to book shelf
exports.addBooksToBookShelf = catchAsync(async (req, res, next) => {
  const { bookshelfID } = req.params;
  if (!bookshelfID) {
    return next(
      new AppError("Request is not providing the book shelf ID!", 400)
    );
  }
  const newBooks = await book_bookShelvesModel.create({
    books: req.body.books,
    bookShelves: bookshelfID,
  });

  const bookShelf = await bookShelvesModel.findById(bookshelfID);
  bookShelf.updateNumOfBooks(bookShelf, req.body.books.length);

  res.status(201).json({
    status: "Success",
    newBooks,
  });
});

//delete a book from a book shelf
exports.deleteBookOfBookShelf = catchAsync(async (req, res, next) => {
  const { bookshelfID } = req.params;
  if (!bookshelfID) {
    return next(
      new AppError("Request is not providing the book shelf ID!", 400)
    );
  }

  const bookShelf = await book_bookShelvesModel.find({
    bookShelves: bookshelfID,
  });
  if (!bookShelf) {
    return next(new AppError("No books found in this book shelf!", 404));
  }

  const bookshelfI = bookShelf.findIndex((bs) =>
    bs.books.find((b) => b.bookISBN === req.body.book.bookISBN)
  );

  if (bookshelfI < 0) {
    return next(new AppError("Book Not found in this book shelf!", 404));
  }

  const bookI = bookShelf[bookshelfI].books.findIndex(
    (b) => b.bookISBN === req.body.book.bookISBN
  );

  bookShelf[bookshelfI].books = bookShelf[bookshelfI].books.slice(
    bookI + 1,
    bookI + 2
  );

  bookShelf[bookshelfI].save();

  const updateBookshelf = await bookShelvesModel.findById(bookshelfID);
  updateBookshelf.updateNumOfBooks(updateBookshelf, -1);

  res.status(200).json({
    status: "Success",
    bookShelf,
  });
});
