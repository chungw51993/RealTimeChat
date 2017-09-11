const model = require('../index');

module.exports = {

  newMessage: (text, user, room) => {
    return model.user.find({ where: { username: user }})
      .then((user) => {
        return model.room.findOrCreate({ where: { name: room }})
          .then((room) => {
            return model.message.create({ text: text, user_id: user.id, room_id: room[0].id });
          });
      });
  },

  getMessage: (room) => {
    return model.room.find({
      where: {
        name: room
      },
      order: [
        [model.message, 'createdAt', 'ASC']
      ],
      include: {
        model: model.message,
        include: {
          model: model.user
        }
      }
    });
  }

};