const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const selfieSchema = new Schema({
  Image:String,
  title:String,
  products:[String],
  comment:String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Selfie = mongoose.model('Product', productSchema);
module.exports = Product;