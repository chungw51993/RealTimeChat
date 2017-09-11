var LocalStrategy = require('passport-local');
var User = require('../db/controller/user');

module.exports = function(passport) {
  passport.use('login', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    User.findUserByUsername(username)
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        return user._modelOptions.instanceMethods.comparePassword(password, user.password)
          .then(match => {
            if (match) {
              done(null, user);
            } else {
              done(null, false);
            }
          });
      })
      .catch(err => {
        console.log('Signup Error: ', err);
        done(err);
      });
  }));

};
