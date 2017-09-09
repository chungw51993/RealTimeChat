const bcrypt = require('bcrypt-as-promised');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  }, {
    hooks: {
      beforeCreate: (user, option, done) => {
        bcrypt.hash(user.password, 10)
          .then((hash) => {
            user.password = hash;
            return done(null, user);
          })
          .catch((err) => {
            console.error(error);
          });
      }
    },
    instanceMethods: {
      comparePassword: (password) => {
        return bcrypt.compare(password, this.password);
      }
    }
  });

  return User;
};