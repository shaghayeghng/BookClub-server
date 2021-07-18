const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const librarySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter the name of Publisher"],
    },
    address: {
      type: String,
    },
    URL: {
      type: String,
      required: [true, "Please Enter the URL of Publisher"],
      unique: [true, "This URL Has Already been submitted"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please Enter the Phone Number of library"],
      unique: [true, "This Phone Number Has Already been submitted"],
    },
  },
  {
    timestamps: true,
  }
);

librarySchema.pre("save", async function (next) {
  if (!this.phoneNumber.startsWith("+98")) {
    this.phoneNumber = `+98${this.phoneNumber.slice(1)}`;
  }

  next();
});

const library = mongoose.model("library", librarySchema);
module.exports = library;
