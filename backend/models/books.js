const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
  name: String,
  author: String,
  desc: String,
  price: String,
  img: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now
  // }
});

module.exports = mongoose.model("Book", booksSchema);


