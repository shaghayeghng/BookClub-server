const AuthorModel = require("../models/authorModel");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

exports.getAuthor = catchAsync(async (req, res, next) => {
  const { authorID } = req.params;
  if (!authorID) {
    return next(new AppError("Request is not providing the author ID!", 400));
  }
  const author = await AuthorModel.findById(authorID);
  if (!author) {
    return next(new AppError("No authors found!", 404));
  }
  res.status(200).json({
    status: "Success",
    author,
  });
});

exports.createAuthor = catchAsync(async (req, res, next) => {
  const newAuthor = await AuthorModel.create({
    name: req.body.name,
    artisticName: req.body.artisticName,
    genre: req.body.genre,
    URL: req.body.URL,
    born: req.body.born,
    died: req.body.died,
  });

  res.status(201).json({
    status: "Success",
    newAuthor,
  });
});
