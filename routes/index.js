const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const User = require('../models/User');
const Product = require('../models/Product');
const Selfie = require('../models/Selfie');
const uploadCloud = require('../config/cloudinary.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/feed', ensureLoggedIn('/auth/login'), (req, res, next) => {
  console.log(req.query,"hello")
  let filter = {}
  if (req.query.brand && req.query.productType) {
  
    filter.brand = req.query.brand
    filter.productType = req.query.productType
    console.log(productType)
  }

  // if (req.query.productType) {
  //   console.log("hello world")
  //   filter.productType = req.query.productType
  // }

  Promise.all([
    Selfie.find().populate('_user'),
    Product.find(filter)
  
    
  ])
    .then(([selfieFromDb, productsFromDb]) => {
      res.render('feed', { selfieFromDb: selfieFromDb, productsFromDb: productsFromDb });
    });
});

module.exports = router;
