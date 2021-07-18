const LibraryModel = require("../models/libraryModel");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

exports.getLibrary = catchAsync(async (req, res, next) => {
  const { libraryID } = req.params;
  if (!libraryID) {
    return next(new AppError("Request is not providing the library ID!", 400));
  }
  const library = await LibraryModel.findById(libraryID);
  if (!library) {
    return next(new AppError("No library found!", 404));
  }
  res.status(200).json({
    status: "Success",
    library,
  });
});

exports.createLibrary = catchAsync(async (req, res, next) => {
  const newLibrary = await LibraryModel.create({
    name: req.body.name,
    address: req.body.address,
    URL: req.body.URL,
    phoneNumber: req.body.phoneNumber,
  });

  res.status(201).json({
    status: "Success",
    newLibrary,
  });
});
