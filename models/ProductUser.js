const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productUserSchema = new Schema(
  {
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _product: { type: Schema.Types.ObjectId, ref: 'Product' }
  },
  
  {
  
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const ProductUser = mongoose.model('ProductUser', productUserSchema);
module.exports = ProductUser;
