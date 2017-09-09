module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define('Room', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Room;
};