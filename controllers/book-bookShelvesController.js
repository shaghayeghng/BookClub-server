const book_bookShelvesModel = require("../models/book-bookShelves");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

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

exports.addBooksToBookShelf = catchAsync(async (req, res, next) => {

  const newBooks = await book_bookShelvesModel.create({
    books: req.body.books,
    bookShelves: req.body.bookShelves,
  });

  res.status(201).json({
    status: "Success",
    newBooks,
  });
});


//todo: update the number of books in bookshelf

//! delete books of bookshelf
// exports.deleteBooksOfBookShelf = catchAsync(async (req, res, next) => {
//   const { bookShelfID } = req.params;
//   if (!bookShelfID) {
//     return next(
//       new AppError("Request is not providing the book shelf ID!", 400)
//     );
//   }

//   const bookShelf = await book_bookShelvesModel.find({
//     bookShelves: bookShelfID,
//   });
//   if (!bookShelf) {
//     return next(new AppError("No books found in this book shelf!", 404));
//   }

//   if (bookShelf.books.includes(req.body.book)) {
//   }

//   res.status(200).json({
//     status: "Success",
//     bookShelves,
//   });
// });
