const model = require('../index');

module.exports = {

  newMessage: (text, user, room) => {
    return model.user.find({ where: { username: user }})
      .then((user) => {
        return model.room.find({ where: { name: room }})
          .then((room) => {
            return model.message.create({ text: text, user_id: user.id, room_id: room.id });
          });
      });
  },

  getMessage: (room) => {
    return model.room.find({
      where: {
        name: room
      },
      include: {
        model: model.message
      }
    });
  }

};