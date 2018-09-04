const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likesSchema = new Schema(
  {
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _selfie: { type: Schema.Types.ObjectId, ref: 'Selfie' }
  },

  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Likes = mongoose.model('ProductUser', likesSchema);
module.exports = Likes;
