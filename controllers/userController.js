const catchAsync = require("./../util/catchAsync");
const AppError = require("./../util/appError");
const UserModel = require("./../models/userModel");
const { userRoles } = require("../models/userModel");

exports.myProfile = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "Success",
    user: req.user,
  });
});

exports.editUseInfo = catchAsync(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(req.user._id, req.body, {
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("User Info didn't update! Please try again", 400));
  }

  res.status(200).json({
    status: "Success",
    user,
  });
});

exports.otherProfile = catchAsync(async (req, res, next) => {
  const { username } = req.params;

  const user = await UserModel.findOne({
    username,
  });
  if (!user) {
    return next(new AppError("User Doesn't Exist", 400));
  }

  res.status(200).json({
    status: "Success",
    user,
  });
});

exports.updateRole = catchAsync(async (req, res, body) => {
  const { username } = req.body;
  const user = await UserModel.findOne({
    username: username,
  });
  if (user.role === userRoles.BOOKCLUBBER) {
    user.role = userRoles.STAFF;
    user.save();
    return res.status(200).json({
      status: "Success",
      user,
    });
  } else if (user.role === userRoles.STAFF) {
    return res.status(200).json({
      status: "Success",
      message: "You are already a staff!",
    });
  } else {
    return res.status(200).json({
      status: "success",
      message: "You Are an Admin!",
    });
  }
});
