const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt_secret = require("../config/jwt");
const User = require("../models/user");

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: jwt_secret.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function(){
  const strategy = new Strategy(params, (payload, done) => {
    const email = payload.email || 0;

    User.getUserByEmail(email, (err, user) => {
      if(user){
        return done(null, user);
      }else{
        return done(err);
      }
    });

  });

  passport.use(strategy);

  return {
    initialize: function(){
      return passport.initialize();
    },
    authenticate: function(){
      return passport.authenticate("jwt", jwt_secret.jwtSession)
    }
  }
}