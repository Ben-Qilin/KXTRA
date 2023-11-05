import express from 'express';

import { jwtGuard } from '../middlewares/jwtGuard.js';
import roleGuard from '../middlewares/roleGuard.js';
import packageProviderController from '../controllers/providerController/packageProviderController.js';
import { availableController } from '../controllers/availableController.js';


const packagesRouter = express.Router();

//récupérer les meilleurs packages pour affichage page Home
packagesRouter.get('/packages/:id/favorites', packageProviderController.bestPackageHome);

//récupérer tous les packages
packagesRouter.get('/packages', packageProviderController.getAllPackages);

//récupérer un package selon son id   
packagesRouter.get('/package/:id', jwtGuard, roleGuard({ roles: ['admin', 'provider', 'user'] }), packageProviderController.getOnePackage);

//récupérer l'identifant d'un package pour avoir avoir son prix
packagesRouter.get('/packages/:id/prices', jwtGuard, roleGuard({ roles: ['provider'] }), packageProviderController.getOnePrice);

//création packages
packagesRouter.post('/packages', jwtGuard, roleGuard({ roles: ['admin', 'provider'] }), packageProviderController.addPackage);

//ajout de service dans package
// jwtGuard, roleGuard({ roles: ['admin', 'provider'] }),
packagesRouter.post('/package/service', packageProviderController.addServiceToPackage)

//gestion de la quantité du stock et disponibilité
packagesRouter.put('/purchases/packages/:id', availableController.availabilityManagement);

//modification du forfait 
packagesRouter.put('/packages/:id', jwtGuard, roleGuard({ roles: ['admin', 'provider'] }), packageProviderController.updatePackage);

//supprimer forfait 
packagesRouter.delete('/packages/:id', jwtGuard, roleGuard({ roles: ['admin', 'provider'] }), packageProviderController.deletePackage);


export default packagesRouter;