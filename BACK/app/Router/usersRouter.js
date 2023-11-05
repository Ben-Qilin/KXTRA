import express from 'express';

import { jwtGuard } from '../middlewares/jwtGuard.js';
import roleGuard from '../middlewares/roleGuard.js';
import { userController } from '../controllers/userController.js';
import adminController from '../controllers/adminController.js';
import institutionProviderController from '../controllers/providerController/institutionProviderController.js';
import serviceProviderController from "../controllers/providerController/serviceProviderController.js";

const usersRouter = express.Router();
    

// a rajouter une fois les tests finis , jwtGuard, roleGuard({ role: ['admin'] })
//permet d'aller récupérer tous les users 
usersRouter.get('/users', adminController.getAll)
//permet d'aller récupérer tous les users role provider
usersRouter.get('/users_provider', jwtGuard, roleGuard({ roles: ['admin'] }), adminController.getAllProvider)

//récupérer un utilisateur selon son identifiant 
usersRouter.get('/users/:id', jwtGuard, roleGuard({ roles: ['admin', 'provider'] }), adminController.getOneUser);

//récupérer un utilisateur provider selon son identifiant 
usersRouter.get('/users_provider/:id', jwtGuard, roleGuard({ roles: ['admin'] }), adminController.getOneProvider);

//récupérer un service selon son identifiant par le provider
usersRouter.get('/users_provider/:id/services/:id', jwtGuard, roleGuard({ roles: ['provider'] }), serviceProviderController.getOneServiceByProviderId );

//récupérer toutes institutions selon id utilisateur
usersRouter.get('/users_provider/:id/institutions', jwtGuard, roleGuard({ roles: ['provider'] }), institutionProviderController.getAllInstitutionByProviderId);

// récuperer les pkgs d'un service un institutions d'un prestataire
usersRouter.get('/users_provider/:id/institutions/:id/service/:id/packages', jwtGuard, roleGuard({ roles: ['provider'] }));

// récuperer les services d'une institutions d'un prestataire
usersRouter.get('/users_provider/:id/institutions/:id/services', jwtGuard, roleGuard({ roles: ['provider'] }), serviceProviderController.getAllServicesByInstitutionId);

//récupérer une commande selon id utilisateur
usersRouter.get('/users/:id/purchases', jwtGuard, roleGuard({ roles: ['admin, provider'] }), userController.getAllPurchasesByUserId)

//modifier le profil utilisateur 
usersRouter.put('/users/:id', jwtGuard, roleGuard({ roles: ['admin'] }), adminController.updateUser);

//supprimer le profil utilisateur   
usersRouter.delete('/users/:userId', jwtGuard, roleGuard({ roles: ['admin'] }), adminController.deleteUser);

export default usersRouter;