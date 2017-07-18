const mongoose = require("mongoose");

// User schema
const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  authors: {
    type: Array,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  }
});

const Book = module.exports = mongoose.model("Book", BookSchema);

module.exports.addBook = function(book, callback){
  book.save(callback);
}

module.exports.getAllBooks = function(callback){
  Book.find(callback);
}