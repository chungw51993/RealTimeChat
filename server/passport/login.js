var LocalStrategy = require('passport-local');
var User = require('../db/controller/user');

module.exports = function(passport) {
  passport.use('login', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    console.log(req.body);
    User.findUser(username)
      .then((user) => {
        if (!user) {
          return done(null, false);
        }

        return user.comparePassword(password)
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
