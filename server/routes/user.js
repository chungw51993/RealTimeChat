const express = require('express');
const router = express.Router();
const helper = require('../helper');
const pusher = require('../pusher');

const User = require('../db/controller/user');

const allUsers = [];

module.exports = (passport) => {
  router.get('/', helper.isAuth, (req, res) => {
    res.send(req.user);
  });

  router.post('/login', passport.authenticate('login'), (req, res) => {
    allUsers.push(req.user.username);
    pusher.trigger('Lobby', 'new_user', {
      user: allUsers
    });
    res.status(201);
    res.send(req.user.username);
  });

  router.post('/signup', passport.authenticate('signup'), (req, res) => {
    allUsers.push(req.user.username);
    pusher.trigger('Lobby', 'new_user', {
      user: allUsers
    });
    res.status(201);
    res.send(req.user.username);
  });

  router.post('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
  });

  return router;
};