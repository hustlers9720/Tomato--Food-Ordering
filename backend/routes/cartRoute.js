import express from 'express'
import { addTOCart, getUserCartData, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middlewares/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware, addTOCart)
cartRouter.post('/remove', authMiddleware, removeFromCart)
cartRouter.get('/get', authMiddleware, getUserCartData)

export default cartRouter