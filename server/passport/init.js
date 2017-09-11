const login = require('./login');
const signup = require('./signup');

const user = require('../db/controller/user');

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    user.findUserById(id)

    .then((user) => {
      done(null, user);
    })

    .catch((err) => {
      done(err, null);
    });
  });

  login(passport);
  signup(passport);

};