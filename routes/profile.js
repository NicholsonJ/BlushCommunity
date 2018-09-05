const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const User = require('../models/User');
const Selfie = require('../models/Selfie');
const Like = require('../models/Like');
const Product = require('../models/Product');
const ProductUser = require('../models/ProductUser');
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

router.get('/profile/:id', ensureLoggedIn('/auth/login'), (req, res, next) => {
  User.findById(req.user._id).then(userFromDb => {
    Selfie.find({ _user: req.params._id })
      .populate('_user')
      .then(selfieFromDb => {
        Like.find({ _user: req.params._id })
          .populate('_selfie')
          .then(likesFromDb => {
            ProductUser.find({ _user: req.params._id })
              .populate('_product')
              .then(productUserFromDb => {
                res.render('profile/show', {
                  selfieFromDb: selfieFromDb,
                  products: productUserFromDb,
                  user: userFromDb,
                  likes: likesFromDb
                });
              });
          });
      });
  });
});

module.exports = router;
