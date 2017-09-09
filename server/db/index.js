const Sequelize = require('sequelize');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
  connection.query('CREATE DATABASE IF NOT EXISTS ChatLog', (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Database created successfully');
  });
});

const sequelize = new Sequelize('ChatLog', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to database has been established');
  })
  .catch((err) => {
    console.error('There is ERROR in connecting to database');
  });

const User = require('./model/user')(sequelize, Sequelize);
const Room = require('./model/room')(sequelize, Sequelize);
const Message = require('./model/message')(sequelize, Sequelize);

Message.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
User.hasMany(Message, { foreignKey: 'user_id', sourceKey: 'id' });

Message.belongsTo(Room, { foreignKey: 'room_id', targetKey: 'id' });
Room.hasMany(Message, { foreignKey: 'room_id', sourceKey: 'id' });

var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = User;
db.room = Room;
db.message = Message;

module.exports = db;