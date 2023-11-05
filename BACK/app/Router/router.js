import express from 'express';

import loginRouter from "./loginRouter.js";
import usersRouter from './usersRouter.js';
import categoriesRouter from './categoriesRouter.js'
import institutionRouter from "./institutionRouter.js";
import purchasesRouter from './purchasesRouter.js';
import packagesRouter from './packagesRouter.js';
import servicesRouter from './servicesRouter.js'
import wishlistRouter from './whislistRouter.js';
import backendRouter from './backendRouter.js';
import searchRouter from './searchRouter.js';

const router = express.Router();

router.use(express.json());

router.use(loginRouter);
router.use(usersRouter);
router.use(categoriesRouter);
router.use(institutionRouter);
router.use(purchasesRouter);
router.use(packagesRouter);
router.use(servicesRouter);
router.use(wishlistRouter);
router.use(backendRouter);
router.use(searchRouter);


export default router;