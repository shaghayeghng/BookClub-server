const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publisherSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

const publisher = mongoose.model("publisher", publisherSchema);
module.exports = publisher;
