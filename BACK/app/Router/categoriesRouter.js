import express from 'express';

import { jwtGuard } from '../middlewares/jwtGuard.js';
import roleGuard from '../middlewares/roleGuard.js';
import adminController from '../controllers/adminController.js';
import packageProviderController from '../controllers/providerController/packageProviderController.js';

const categoriesRouter = express.Router();

// récupérer de toutes les catégories
categoriesRouter.get('/categories', packageProviderController.getCategories);

// récupérer une catégorie
categoriesRouter.get('/categories/:id',);

// créer une catégorie
categoriesRouter.post('/categories', jwtGuard, roleGuard({ roles: ['admin'] }), adminController.addCategory);

// modifier une catégorie
categoriesRouter.put('/categories/:id', jwtGuard, roleGuard({ roles: ['admin'] }), adminController.updateCategory);

// supprimer une catégorie
categoriesRouter.delete('/categories/:id', jwtGuard, roleGuard({ roles: ['admin'] }), adminController.deleteCategory);

export default categoriesRouter;