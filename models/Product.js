const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    brand: String,
    name: String,
    productType: {
      type: String,
      enum: [
        'foundation',
        'blush',
        'lipstick',
        'lip_liner',
        'eyeshadow',
        'eyeliner',
        'nail_polish',
        'mascara',
        'eyebrow',
        'bronzer'
      ]
    },
    productColor: [{ hex_value: String, colour_name: String }],
    image: String,
    website: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
