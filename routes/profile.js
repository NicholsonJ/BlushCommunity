const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const User = require('../models/User');
const Selfie = require('../models/Selfie');
const Likes = require('../models/Likes');
const Product = require('../models/Product');
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
    Selfie.find({ _user: req.user._id })
      .populate('_user')
      .then(selfieFromDb => {
        Product.find()
          .limit(5)
          .then(productFromDb => {
            Likes.find({ _user: req.user._id })
              .populate('_selfie')
              .then(likesFromDb => {
                res.render('profile/show', {
                  selfieFromDb: selfieFromDb,
                  products: productFromDb,
                  user: userFromDb,
                  likes: likesFromDb
                });
              });
          });
      });
  });
});

module.exports = router;
