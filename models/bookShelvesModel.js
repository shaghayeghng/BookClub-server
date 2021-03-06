const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookShelvesSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Book Shelf Must have a title."],
    },
    numOfBooks: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

bookShelvesSchema.methods.updateNumOfBooks = (bookShelf, num) => {
  bookShelf.numOfBooks += num;
  return bookShelf.save();
};

const bookShelves = mongoose.model("bookShelves", bookShelvesSchema);
module.exports = bookShelves;
