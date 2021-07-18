const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellingStatus = {
  AVAILABLE: "Available",
  NOTAVAILLABLE: "not Available",
};

const bookSchema = new Schema(
  {
    bookISBN: {
      type: String,
      required: [true, "Please Enter the ISBN of the Book"],
      unique: [true, "This ISBN has Already been Submitted"],
    },
    title: {
      type: String,
      required: [true, "Please Enter the Title of the Book"],
    },
    edition: {
      type: String,
      required: [true, "Please Enter the Edition of the Book"],
    },
    genre: {
      type: String,
      required: [true, "Please Enter the genre of the Book"],
    },
    rate: {
      type: Number,
    },
    litreraryAwards: {
      type: [String],
    },
    reviews: {
      type: String,
    },
    summary: {
      type: String,
      required: [true, "Please Enter the summary of the Book"],
    },
    cover: {
      type: String,
      required: [true, "Book Must have a Cover"],
    },
    status: {
      type: String,
      required: [true, "Please Enter the Selling Status of the Book"],
      enum: sellingStatus,
      default: sellingStatus.NOTAVAILLABLE,
    },
    price: {
      type: Number,
    },
    publishedYear: {
      type: Number,
      required: [true, "Please Enter the Published Year of the Book"],
    },
    hasE_Book: {
      type: Boolean,
      require: true,
      default: false,
    },
    trivia: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
    publisher: {
      type: Schema.Types.ObjectId,
      ref: "publisher",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const book = mongoose.model("book", bookSchema);
module.exports = book;

module.exports.sellingStatus = sellingStatus;