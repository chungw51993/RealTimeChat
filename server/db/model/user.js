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
      beforeCreate: (user, option) => {
        bcrypt.hash(user.password, 10)
          .then((hash) => {
            user.password = hash;
            user.save();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    instanceMethods: {
      comparePassword: function(attemptPassword, password) {
        return bcrypt.compare(attemptPassword, password);
      }
    }
  });

  return User;
};