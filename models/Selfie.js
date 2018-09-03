const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const selfieSchema = new Schema(
  {
    image: String,
    title: String,
    products: Array,
    comment: String,
    user: Schema.Types.ObjectId
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
