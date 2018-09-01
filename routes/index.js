const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const User = require('../models/User');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/Feed', ensureLoggedIn('/auth/login'), (req, res, next) => {
  User.find().then(userFromDb => {
    res.render('feed', { userFromDb: userFromDb });
  });
});

router.get('/Selfie', ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render('selfie');
});

router.get('/:id', ensureLoggedIn('/auth/login'), (req, res, next) => {
  User.findById(req.params.id).then(userFromDb => {
    res.render('profile', userFromDb);
  });
});

module.exports = router;
