import Wishlist from '../models/wishlistModel.js';

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const exists = await Wishlist.findOne({ user: userId, product: productId });
    if (exists) {
      return res.send({ success: false, message: 'Already in wishlist' });
    }

    const wishlist = new Wishlist({ user: userId, product: productId });
    await wishlist.save();
    res.send({ success: true, message: 'Added to wishlist' });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Error adding' });
  }
};

export const getUserWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user._id }).populate('product');
    res.send({ success: true, wishlist });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Error fetching' });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.send({ success: true, message: 'Removed from wishlist' });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Error removing' });
  }
};
