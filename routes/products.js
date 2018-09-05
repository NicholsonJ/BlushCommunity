const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const User = require('../models/User');
const Selfie = require('../models/Selfie');
const Likes = require('../models/Likes');
const uploadCloud = require('../config/cloudinary.js');

router.get('/addproduct', ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render('addProduct');
});
