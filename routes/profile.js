const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const User = require('../models/User');
const Selfie = require('../models/Selfie');
const Like = require('../models/Like');
const Product = require('../models/Product');
const ProductUser = require('../models/ProductUser');
const uploadCloud = require('../config/cloudinary.js');

router.get('/profile/:id/edit', ensureLoggedIn('/auth/login'), (req, res, next) => {
  User.findById(req.user._id)
    .then(userFromDb => {
      res.render('profile/editProfile', userFromDb);
      console.log('user: ', req.user._id);
    })
    .catch(err => {
      throw err;
    });
});

router.post(
  '/profile/:id/edit',
  uploadCloud.single('newProfilePic'),
  ensureLoggedIn('/auth/login'),
  (req, res, next) => {
    console.log('UPDATE CLOUD', uploadCloud.single);
    console.log('req.file', req.file);
    const updateProfile = {
      image: req.file.url
    };
    User.findByIdAndUpdate(req.user._id, updateProfile)
      .then(profileFromDb => {
        console.log(profileFromDb.title + ' was updated');
        res.redirect(`/feed`);
      })
      .catch(err => {
        throw err;
      });
  }
);

router.get('/profile/:id', ensureLoggedIn('/auth/login'), (req, res, next) => {
  User.findById(req.params.id).then(userFromDb => {
    Selfie.find({ _user: req.params.id })
      .sort({ created_at: -1 })
      .populate('_user')
      .then(selfieFromDb => {
        let selfies = selfieFromDb.map(selfie => {
          selfie.isOwner = true;
          return selfie;
        });
        Like.find({ _user: req.params.id })
          .sort({ created_at: -1 })
          .populate('_selfie')
          .populate('_user')
          .then(likesFromDb => {
            let likes = likesFromDb.map(like => {
              like.isOwner = like._selfie._user._id === req.user._id;
              return like;
            });
            ProductUser.find({ _user: req.params.id })
              .sort({ created_at: -1 })
              .populate('_product')
              .populate('_user')
              .then(productUserFromDb => {
                res.render('profile/show', {
                  selfieFromDb: selfies,
                  products: productUserFromDb,
                  user: userFromDb,
                  likes
                });
              });
          });
      });
  });
});

module.exports = router;
