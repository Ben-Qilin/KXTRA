import express from 'express';

import { jwtGuard } from '../middlewares/jwtGuard.js';
import roleGuard from '../middlewares/roleGuard.js';
import backendController from '../controllers/backendController.js';

const backendRouter = express.Router();

backendRouter.get('/', backendController.home);

export default backendRouter;