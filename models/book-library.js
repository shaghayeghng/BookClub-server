const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const book_librarySchema = new Schema(
  {
    bookID: {
      type: Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    library: {
      type: Schema.Types.ObjectId,
      ref: "library",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const book_library = mongoose.model("book_library", book_librarySchema);
module.exports = book_library;
