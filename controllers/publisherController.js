const publisherModel = require("../models/publisherModel");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

exports.getPublisher = catchAsync(async (req, res, next) => {
  const { publisherID } = req.params;
  if (!publisherID) {
    return next(new AppError("Request is not providing the publisher ID!", 400));
  }
  const publisher = await publisherModel.findById(publisherID);
  if (!publisher) {
    return next(new AppError("No publisher found!", 404));
  }
  res.status(200).json({
    status: "Success",
    publisher,
  });
});

exports.createPublisher = catchAsync(async (req, res, next) => {
  const newPublisher = await publisherModel.create({
    name: req.body.name,
    address: req.body.address,
    URL: req.body.URL,

  });

  res.status(201).json({
    status: "Success",
    newPublisher,
  });
});
