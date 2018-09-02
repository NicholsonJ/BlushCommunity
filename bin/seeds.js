const mongoose = require('mongoose');
const Product = require('../models/Product');
const makeup = require('../data.js');

mongoose
  .connect(
    'mongodb://localhost/makeup',
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

let productsToCreate = makeup.map(product => {
  return {
    brand: product.brand,
    name: product.name,
    productType: product.product_type,
    productColor: product.product_colors.colour_name,
    Image: product.image_link,
    website: product.website_link
  };
});

Product.create(productsToCreate).then(productsFromDb => {
  console.log(productsFromDb.length + ' products were created');
});
