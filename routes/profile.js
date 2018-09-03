const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const User = require('../models/User');
const Selfie = require('../models/Selfie');
const uploadCloud = require('../config/cloudinary.js');

router.get('/editProfile', ensureLoggedIn('/auth/login'), (req, res, next) => {
  User.findById(req.user.id).then(userFromDb => {
    res.render('profile/editProfile', userFromDb);
  });
});

router.post('/editProfile', ensureLoggedIn('/auth/login'), (req, res, next) => {
  const updateProfile = {
    image: req.body.image
  };

  User.update(updateProfile).then(selfieFromDb => {
    console.log(selfieFromDb.title + ' was updated');
  });
});

router.get('/profile', ensureLoggedIn('/auth/login'), (req, res, next) => {
  User.findById(req.user._id).then(userFromDb => {
    res.render('profile/show', userFromDb);
  });
});

module.exports = router;
