const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const bcrypt = require("bcryptjs");

const User = require("./../models/userModel");
const catchAsync = require("./../util/catchAsync");
const AppError = require("./../util/appError");

const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Remove the password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: "Success",
    token,
    user
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createSendToken(newUser, 201, res);
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  //Check if email and password exist
  if (!username || !password) {
    return next(new AppError("Please enter your username and password", 400));
  }

  //Check if the user exists && if the password is correct
  const user = await User.find({ username: username }).select("+password");

  if((user.length !== 1) || !(await bcrypt.compare(password, user[0].password))) {
    return next(new AppError("Wrong username or password", 401));
  }
  
  //If everyhing ok, send token to client
  createSendToken(user[0], 200, res);
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  //Getting token and check if it's there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Please log in first!", 401));
  }
  //Validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("User with this token does not exist!", 401)
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.restrictedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission!", 403)
      );
    }
    next();
  };
};
