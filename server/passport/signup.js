var LocalStrategy = require('passport-local').Strategy;
var User = require('../db/controller/user');

module.exports = function(passport) {
  passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    process.nextTick(function() {
      User.findUserByUsername(username)
        .then(user => {
          if (user) {
            return done(null, false);
          }

          return User.newUser(username, password);
        })
        .then(newUser => {
          done(null, newUser);
        })
        .catch(err => {
          console.log('Signup Error: ', err);
          done(err);
        });
    });
  }));

};
