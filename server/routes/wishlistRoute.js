import express from 'express';
import { requireSignIn } from '../../server/middleware/authMiddleware.js';
import {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
} from '../../server/controller/wishlistController.js';

const router = express.Router();

router.post('/add', requireSignIn, addToWishlist);
router.get('/user', requireSignIn, getUserWishlist);
router.delete('/remove/:id', requireSignIn, removeFromWishlist);

export default router;
