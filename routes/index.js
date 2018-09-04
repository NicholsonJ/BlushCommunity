const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const User = require('../models/User');
const Selfie = require('../models/Selfie');
const uploadCloud = require('../config/cloudinary.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/feed', ensureLoggedIn('/auth/login'), (req, res, next) => {
  Selfie.find()
    .populate('_user')
    .then(selfieFromDb => {
      res.render('feed', { selfieFromDb: selfieFromDb });
    });
});

module.exports = router;
