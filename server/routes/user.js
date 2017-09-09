const express = require('express');
const router = express.Router();
const helper = require('../helper');

const User = require('../db/controller/user');

module.exports = (passport) => {
  router.get('/', helper.isAuth, (req, res) => {
    res.send(req.user);
  });

  router.post('/login', passport.authenticate('login'), (req, res) => {
    res.send(201);
  });

  router.post('/signup', passport.authenticate('signup'), (req, res) => {
    res.send(201);
  });

  router.post('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
  });

  return router;
};