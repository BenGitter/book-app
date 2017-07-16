const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

    bcrypt.genSalt(10, (err, salt) => {
      if(err) throw err;

      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err) throw err;

        user.password = hash;
        user.save(callback);
      });
    })
  });
}

module.exports.comparePassword = function(password, hash, callback){
  bcrypt.compare(password, hash, (err, isMatch) => {
    if(err) throw err;

    callback(null, isMatch);
  });
}