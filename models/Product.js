const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const productSchema = new Schema({
  brand: String,
  name :String,
  productType: {type:String, enum:["foundation","blush","lipstick","eyeshadow","eyeliner","nail polish","mascara","eyebrows","lipliner"]},
  productColor:String,
  Image:String,
  website:String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
