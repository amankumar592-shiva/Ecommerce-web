import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.ObjectId,
    ref: 'Product',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Wishlist', wishlistSchema);
