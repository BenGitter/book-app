const mongoose = require("mongoose");

// User schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model("User", UserSchema);

module.exports.getUserByEmail = function(email, callback){
  User.findOne({ email: email }, callback);
}

module.exports.addUser = function(user, callback){
  User.findOne({ email: user.email }, (err, match) => {
    if(err) return callback(err);
    if(match) return callback("Email already used");

    user.save(callback);
  });
}