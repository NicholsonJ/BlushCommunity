const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const User = require('../models/User');
const Selfie = require('../models/Selfie');

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

router.get('/Selfie', ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render('selfie');
});

router.post('/Selfie', ensureLoggedIn('/auth/login'), (req, res, next) => {
  const selfieInfo = {
    title: req.body.title,
    image: req.body.selfPic,
    comment: req.body.comment,
    products: req.body.products,
    _user: req.user._id
  };
  console.log(selfieInfo);
  Selfie.create(selfieInfo).then(selfieFromDb => {
    console.log(selfieFromDb.title + ' was added');
  });
  res.redirect('/feed');
});

router.get('/:id', ensureLoggedIn('/auth/login'), (req, res, next) => {
  User.findById(req.params.id).then(userFromDb => {
    res.render('profile', userFromDb);
  });
});

module.exports = router;
