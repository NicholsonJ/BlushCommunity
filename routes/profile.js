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
  User.findById(req.params.id).then(userFromDb => {
    console.log('user: ', userFromDb);
    Selfie.find({ _user: req.params.id })
      .populate('_user')
      .then(selfieFromDb => {
        console.log('selfies: ', selfieFromDb);
        Like.find({ _user: req.params.id })
          .populate('_selfie')
          .populate('_user')
          .then(likesFromDb => {
            console.log('likes: ', likesFromDb);
            ProductUser.find({ _user: req.params.id })
              .populate('_product')
              .populate('_user')
              .then(productUserFromDb => {
                console.log('productUserFromDb: ', productUserFromDb);
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
