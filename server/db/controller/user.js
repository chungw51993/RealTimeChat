const model = require('../index');

module.exports = {

  newUser: (username, password) => {
    return model.user.create({ username: username, password: password });
  },

  findUserByUsername: (username) => {
    return model.user.find({ where: { username: username }});
  },

  findUserById: (id) => {
    return model.user.find({ where: { id: id }});
  }

};