const model = require('../index');

module.exports = {

  newRoom: (name) => {
    return model.room.create({ name: name });
  },

  getRooms: () => {
    return model.room.findAll({});
  }

};