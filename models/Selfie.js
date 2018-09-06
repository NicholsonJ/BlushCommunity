const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const selfieSchema = new Schema(
  {
    image: String,
    title: String,
    products: String,
    // _products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    comment: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Selfie = mongoose.model('Selfie', selfieSchema);
module.exports = Selfie;
