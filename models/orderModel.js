const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    numOfABook: {
      type: Number,
    },
    bookID: {
      type: Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const order = mongoose.model(
  "order",
  orderSchema
);
module.exports = order;
