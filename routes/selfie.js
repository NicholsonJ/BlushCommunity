const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const User = require('../models/User');
const Selfie = require('../models/Selfie');
const uploadCloud = require('../config/cloudinary.js');

router.get('/selfie', ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render('selfie');
});

router.post(
  '/selfie',
  uploadCloud.single('selfPic'),
  ensureLoggedIn('/auth/login'),
  (req, res, next) => {
    console.log('req.file', req.file);

    const selfieInfo = {
      title: req.body.title,
      image: req.file.url,
      comment: req.body.comment,
      products: req.body.products,
      _user: req.user._id
    };
    console.log(selfieInfo);
    Selfie.create(selfieInfo).then(selfieFromDb => {
      console.log(selfieFromDb.title + ' was added');
    });
    res.redirect('/feed');
  }
);

module.exports = router;
