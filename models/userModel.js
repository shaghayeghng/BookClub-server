const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const order = require("./orderModel");

const Schema = mongoose.Schema;

const userRoles = {
  BOOKCLUBBER: "book clubber",
  STAFF: "staff",
  ADMIN: "admin",
};

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please Enter Your Last Name"],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Please Provide Your Email"],
      validate: [validator.isEmail, "Please Provide a Valid Email"],
      unique: [true, "This Email Has Already been Registerd."],
      index: true,
    },
    username: {
      type: String,
      lowercase: true,
      required: [true, "Please Enter Your Username"],
      unique: [true, "This username is not available"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide a Password"],
      minlength: [8, "Your Password Must Be At Least 8 Characters"],
      select: false,
    },
    role: {
      type: String,
      required: [true, "User Roles Must have a value."],
      enum: userRoles,
      default: userRoles.BOOKCLUBBER,
    },
    cart: {
      items: [
        {
          orderId: {
            type: Schema.Types.ObjectId,
            ref: "order",
            required: true,
          },
          quantity: { type: Number, required: true },
        },
      ],
    },
    gender: {
      type: String,
      enum: ["Female", "Male", "Prefer not to say"],
    },
    birthDate: {
      type: Date,
    },
    city: {
      type: String,
    },
    interests: {
      type: [String],
    },
    bio: {
      type: String,
    },
    portofolioURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.addToCart = (orderId, user) => {
  const cartOrderIndex = user.cart.items.findIndex((cp) => {
    return cp.orderId.toString() === orderId.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...user.cart.items];

  if (cartOrderIndex >= 0) {
    newQuantity = user.cart.items[cartOrderIndex].quantity + 1;
    updatedCartItems[cartOrderIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      orderId: orderId,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  user.cart = updatedCart;
  return user.save();
};

userSchema.methods.removeFromCart = (orderId, user) => {
  const updatedCartItems = user.cart.items.filter((item) => {
    return item.orderId.toString() !== orderId.toString();
  });
  user.cart.items = updatedCartItems;
  return user.save();
};

userSchema.methods.clearCart = (user) => {
  user.cart = { items: [] };
  return user.save();
};

const user = mongoose.model("user", userSchema);
module.exports = user;

module.exports.userRoles = userRoles;
