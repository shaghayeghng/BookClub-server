const CommentModel = require("../models/commentModel");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

exports.getComments = catchAsync(async (req, res, next) => {
  const { bookID } = req.params;
  if (!bookID) {
    return next(new AppError("Request is not providing the book ID!", 400));
  }
  const comments = await CommentModel.find({
    bookID: bookID,
  });
  if (!comments) {
    return next(new AppError("This book doesn't have any comments!", 404));
  }
  res.status(200).json({
    status: "Success",
    comments,
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const { bookID } = req.params;
  if (!bookID) {
    return next(new AppError("Request is not providing the book ID!", 400));
  }

  const newComment = await CommentModel.create({
    content: req.body.content,
    bookID: bookID,
    writer: req.user._id,
    replyOf: req.body.replyOf,
  });

  res.status(201).json({
    status: "Success",
    newComment,
  });
});
