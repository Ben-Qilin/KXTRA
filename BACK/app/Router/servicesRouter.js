import express from 'express';

import { jwtGuard } from '../middlewares/jwtGuard.js';
import roleGuard from '../middlewares/roleGuard.js';
import serviceProviderController from '../controllers/providerController/serviceProviderController.js';


const servicesRouter = express.Router();

//récupérer tous les services
servicesRouter.get('/services', jwtGuard, roleGuard({ roles: ['admin', 'provider'] }), serviceProviderController.getAllServices);

// récupérer un service
servicesRouter.get('/services/:id', jwtGuard, roleGuard({ roles: ['admin', 'provider'] }), serviceProviderController.getOneService);

// créer un service
servicesRouter.post('/services', jwtGuard, roleGuard({ roles: ['provider'] }), serviceProviderController.addService);

// 'modifier un service'
servicesRouter.put('/services/:id', jwtGuard, roleGuard({ roles: ['provider'] }), serviceProviderController.updateService);

// 'supprimer un service'
servicesRouter.delete('/services/:id', jwtGuard, roleGuard({ roles: ['admin', 'provider'] }), serviceProviderController.deleteService);

export default servicesRouter;