const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter the Name of Author"],
    },
    artisticName: {
      type: String,
    },
    genre: {
      type: [String],
      required: [true, "Please Enter the genre of Author's Books"],
    },
    URL: {
      type: String,
      required: [true, "Please Enter the URL of Author"],
      unique: [true, "This URL Has Already been submitted"],
    },
    born: {
      type: String,
    },
    died: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const author = mongoose.model("author", authorSchema);
module.exports = author;
