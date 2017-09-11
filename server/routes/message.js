const express = require('express');
const router = express.Router();
const helper = require('../helper');
const pusher = require('../pusher');

const Message = require('../db/controller/message');

router.get('/:room', helper.isAuth, (req, res) => {
  const room = req.params.room;

  Message.getMessage(room)
    .then((data) => {
      res.status(200);
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post('/:room', helper.isAuth, (req, res) => {
  const user = req.user.username;
  const room = req.params.room;
  const message = req.body.text;

  Message.newMessage(message, user, room)
    .then((data) => {
      pusher.trigger(room, 'new_message', {
        message: req.body.text
      });
      res.status(200);
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;