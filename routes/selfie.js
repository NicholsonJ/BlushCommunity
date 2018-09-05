const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const User = require('../models/User');
const Selfie = require('../models/Selfie');
const Like = require('../models/Like');
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

router.post('/like/new', (req, res) => {
  const selfieData = req.body.selfie_data;

  console.log('selfieData: ' + selfieData);
  const userData = req.user._id;
  const likeToCreate = {
    _user: userData,
    _selfie: selfieData
  };
  Like.create(likeToCreate).then(likeFromDb => {
    console.log(likeFromDb.length + ' likes were created');
  });
  res.send('New like created!!');
});

//edit selfie

router.get('/selfie/:selfieId', ensureLoggedIn('/auth/login'), (req, res, next) => {
  let selfieId = req.params.selfieId;
  Selfie.findById(selfieId)
    .then(Selfie => {
      res.render('editSelfie', { Selfie: Selfie });
    })
    .catch(err => {
      throw err;
    });
});

//update selfie

// router.post('/:selfieId',ensureLoggedIn('/auth/login'),(req, res, next) => {
//   let {image, title, _products,comment} = req.body;
//   Selfie.findByIdAndUpdate( req.params.selfieId, { image, title, _products,comment } )
//     .then( Selfie => {
//       console.log("Edit:", Selfie);
//       res.redirect( `/profile`);
//     })
//     .catch( err => { throw err } );
// });

module.exports = router;
