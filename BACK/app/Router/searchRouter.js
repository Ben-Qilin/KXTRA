import express from 'express';
import { jwtGuard } from '../middlewares/jwtGuard.js';
import roleGuard from '../middlewares/roleGuard.js';
import userController from '../controllers/userController.js';

const searchRouter = express.Router();
searchRouter.get('/search', userController.search);

export default searchRouter;