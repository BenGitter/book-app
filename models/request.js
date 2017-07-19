const mongoose = require("mongoose");

const Book = require("./book");

// Request schema
const RequestSchema = mongoose.Schema({
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
  },
  requestedBy: {
    type: String,
    required: true
  }
});

const Request = module.exports = mongoose.model("Request", RequestSchema);

module.exports.addRequest = function(request, callback){
  request.save(callback);
}

module.exports.getAllRequests = function(callback){
  Request.find(callback);
}

module.exports.removeRequest = function(id, callback){
  Request.findOneAndRemove({_id: new mongoose.mongo.ObjectID(id)}, callback);
}

module.exports.acceptRequest = function(id, callback){
  Request.findById(id, (err, request) => {
    if(err) return callback(err);

    Book.findOneAndUpdate({
      owner: request.owner, 
      title: request.title, 
      authors: request.authors
    }, {
      owner: request.requestedBy,
      title: request.title,
      authors: request.authors,
      thumbnail: request.thumbnail
    }, (err, book) => {
      if(err) return callback(err);
      if(!book) return callback("error");

      Request.removeRequest(id, callback);
    });
  });
}