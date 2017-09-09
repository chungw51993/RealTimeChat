const express = require('express');
const router = express.Router();

const Room = require('../db/controller/room');

router.get('/', (req, res) => {
  Room.getRooms()
    .then((data) => {
      res.status(200);
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post('/', (req, res) => {
  const roomName = req.body.name;

  Room.newRoom(roomName)
    .then((data) => {
      res.status(201);
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;