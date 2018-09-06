const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const User = require('../models/User');
const Product = require('../models/Product');
const ProductUser = require('../models/ProductUser');
const Selfie = require('../models/Selfie');
const uploadCloud = require('../config/cloudinary.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/feed', ensureLoggedIn('/auth/login'), (req, res, next) => {
  let filter = {};
  if (req.query.brand && req.query.products) {
    Promise.all([
      Selfie.find()
        .sort({ created_at: -1 })
        .populate('_user'),
      Product.find({
        $and: [{ brand: { $eq: req.query.brand } }, { productType: { $eq: req.query.products } }]
      })
    ]).then(([selfieFromDb, productsFromDb]) => {
      console.log(productsFromDb);
      res.render('feed', { selfieFromDb: selfieFromDb, productsFromDb: productsFromDb });
    });
  } else {
    Selfie.find()
      .sort({ created_at: -1 })
      .populate('_user')
      .then(selfieFromDb => {
        res.render('feed', { selfieFromDb: selfieFromDb });
      });
  }
});

router.get('/newproduct', ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render('newProduct');
});

router.post(
  '/newproduct',
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

router.post('/collection/new', (req, res) => {
  const addProduct = req.body.addProduct;

  console.log('addProduct: ' + addProduct);
  const userData = req.user._id;
  const productUserToCreate = {
    _user: userData,
    _product: addProduct
  };
  ProductUser.create(productUserToCreate).then(productUserFromDb => {
    console.log(productUserFromDb.length + ' products were created');
  });
  res.send('New user created!!');
});

//to render more details of a product

// router.get('/:productId', (req, res, next) => { 
//   let productId = req.params.productId;
//   Product.findById(productId)
//   .then (moreInfo => {
//     // console.log(lostObject)
//   res.render('product-detail', moreInfo);
//   })  
// });

module.exports = router;
