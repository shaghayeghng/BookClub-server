const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Comment can't be empty."],
    },
    bookID: {
      type: Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    writer: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    replyOf: {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  },
  {
    timestamps: true,
  }
);

const comment = mongoose.model("comment", commentSchema);
module.exports = comment;
