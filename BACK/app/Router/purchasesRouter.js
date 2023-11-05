import express from 'express';
import userController from '../controllers/userController.js';
import { jwtGuard } from '../middlewares/jwtGuard.js';
import roleGuard from '../middlewares/roleGuard.js';


const purchasesRouter = express.Router();

//récupérer toutes les commandes
purchasesRouter.get('/purchases', jwtGuard, roleGuard({ roles: ['admin', 'provider'] }), userController.getAllPurchases)

//récupérer une commande selon son id
purchasesRouter.get('/purchases/:id', jwtGuard, roleGuard({ roles: ['provider'] }), userController.getOnePurchase)

//créer d'une commande
purchasesRouter.post('/purchases', jwtGuard, roleGuard({ roles: ['user'] }), userController.addPurchase)

//ajouter package a purchase
purchasesRouter.post('/purchase/package', jwtGuard, roleGuard({ roles: ['user'] }), userController.addPackageToPurchase)

//modifier une commande
purchasesRouter.put('/purchases/:id', jwtGuard, roleGuard({ roles: ['user', 'provider'] }), userController.updatePurchase)

//supprimer une commande
purchasesRouter.delete('/purchases/:id', jwtGuard, roleGuard({ roles: ['user', 'provider'] }), userController.deletePurchase);

export default purchasesRouter;