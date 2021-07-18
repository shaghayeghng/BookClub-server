const mongoose = require("mongoose");

const book = require("./bookModel");
const bookSchema = mongoose.model('book').schema;

const Schema = mongoose.Schema;

const book_bookShelvesSchema = new Schema(
  {
    //nested Object
    books: [bookSchema],

    bookShelves: {
      type: Schema.Types.ObjectId,
      ref: "bookShelves",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const book_bookShelves = mongoose.model(
  "book_bookShelves",
  book_bookShelvesSchema
);
module.exports = book_bookShelves;
