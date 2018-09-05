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
  console.log(req.query, 'hello');
  let filter = {};
  if (req.query.brand && req.query.products) {
    Promise.all([
      Selfie.find().populate('_user'),
      Product.find({
        $and: [{ brand: { $eq: req.query.brand } }, { productType: { $eq: req.query.products } }]
      })
    ]).then(([selfieFromDb, productsFromDb]) => {
      console.log(productsFromDb);
      res.render('feed', { selfieFromDb: selfieFromDb, productsFromDb: productsFromDb });
    });

    // filter.brand = req.query.brand
    // filter.productType = req.query.productType
    // console.log(productType)
  } else {
    Selfie.find()
      .populate('_user')
      .then(selfieFromDb => {
        res.render('feed', { selfieFromDb: selfieFromDb });
      });
  }
});

router.get('/addproduct', ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render('addProduct');
});

router.post(
  '/addproduct',
  uploadCloud.single('productPic'),
  ensureLoggedIn('/auth/login'),
  (req, res, next) => {
    console.log('req.file', req.file);

    const productInfo = {
      brand: req.body.brand,
      image: req.file.url,
      name: req.body.name,
      productColor: [{ hex_value: '000000', colour_name: req.body.productColor }],
      website: req.body.website,
      _user: req.user._id
    };
    console.log(productInfo);
    Product.create(productInfo).then(productFromDb => {
      console.log('product was created');
    });
    res.redirect('/feed');
  }
);

module.exports = router;
