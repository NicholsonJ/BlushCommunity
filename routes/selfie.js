const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const User = require('../models/User');
const Selfie = require('../models/Selfie');
const Likes = require('../models/Likes');
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
      // _products: req.body.products,
      _user: req.user._id
    };
    console.log(selfieInfo);
    Selfie.create(selfieInfo).then(selfieFromDb => {
      console.log('like was created');
    });
    res.redirect('/feed');
  }
);

router.post('/likes/new', (req, res) => {
  const selfieData = req.body.selfie_data;

  console.log('selfieData: ' + selfieData);
  const userData = req.user._id;
  const likeToCreate = {
    _user: userData,
    _selfie: selfieData
  };
  Likes.create(likeToCreate).then(likeFromDb => {
    console.log(likeFromDb.length + ' likes were created');
  });
  res.send('New like created!!');
});

module.exports = router;
