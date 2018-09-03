const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PSchema = new Schema(
  {
    username: String,
    password: String,
    image: {
      type: String,
      default: '../public/images/DefaultProfileImg.jpg'
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
